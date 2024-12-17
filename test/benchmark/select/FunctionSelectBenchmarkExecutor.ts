import {
  IHttpLlmApplication,
  IHttpLlmFunction,
  ILlmApplication,
} from "@samchon/openapi";
import { IFunctionSelectBenchmarkResult } from "./IFunctionSelectBenchmarkResult";
import { ArrayUtil } from "@nestia/e2e";
import OpenAI from "openai";
import typia from "typia";
import { ConnectorGlobal } from "../../../src/ConnectorGlobal";

export class FunctionSelectBenchmarkExecutor {
  private default_prompts_: OpenAI.ChatCompletionMessageParam[];

  public constructor(
    public readonly application: IHttpLlmApplication<"chatgpt">,
    public readonly repeat: number,
  ) {
    this.default_prompts_ = getDefaultPrompts(application);
  }

  public async execute(
    func: IHttpLlmFunction<"chatgpt">,
    keyword: string,
  ): Promise<IFunctionSelectBenchmarkResult> {
    const events: IFunctionSelectBenchmarkResult.IEvent[] =
      await ArrayUtil.asyncRepeat(this.repeat)(async () => {
        const started_at: Date = new Date();
        try {
          return await this.step(func, keyword, started_at);
        } catch (error) {
          return {
            success: false,
            started_at,
            completed_at: new Date(),
            kind: "error",
            error,
          } satisfies IFunctionSelectBenchmarkResult.IErrorEvent;
        }
      });
    return {
      function: func,
      keyword,
      count: this.repeat,
      success: events.filter((event) => event.success).length,
      events,
    };
  }

  private async step(
    func: IHttpLlmFunction<"chatgpt">,
    keyword: string,
    started_at: Date,
  ): Promise<IFunctionSelectBenchmarkResult.IEvent> {
    const client: OpenAI = new OpenAI({
      apiKey: "something",
      baseURL: ConnectorGlobal.env.HAMLET_URL,
    });
    const completion: OpenAI.ChatCompletion =
      await client.chat.completions.create(
        {
          model: "gpt-4o",
          messages: [
            ...this.default_prompts_,
            {
              role: "user",
              content: keyword,
            },
          ],
          tools: metaApp.functions.map((f) => ({
            type: "function",
            function: {
              name: f.name,
              description: f.description,
              parameters: f.parameters as Record<string, any>,
            },
          })),
          tool_choice: "required",
          parallel_tool_calls: false,
        },
        {
          path: `/v2/openai/deployments/gpt-4o/chat/completions`,
          headers: {
            [ConnectorGlobal.env.HAMLET_HEADER_KEY_NAME]: [
              ConnectorGlobal.env.HAMLET_HEADER_KEY_VALUE,
            ],
          } as any,
        },
      );

    const endpoints: IOperationEndpoint[] = completion.choices
      .map((choice) => choice.message.tool_calls ?? [])
      .flat()
      .filter((call) => call.function.name === "selectFunction")
      .map((call) => JSON.parse(call.function.arguments));
    const found: IHttpLlmFunction<"chatgpt"> | null = endpoints.find(
      (e) =>
        e.method === func.method &&
        e.path === func.path &&
        e.name === func.name,
    )
      ? func
      : endpoints[0]
        ? (this.application.functions.find(
            (func) =>
              func.method === endpoints[0].method &&
              func.path === endpoints[0].path &&
              func.name === endpoints[0].name,
          ) ?? null)
        : null;
    if (found === func)
      return {
        success: true,
        started_at,
        completed_at: new Date(),
      };
    else
      return {
        success: false,
        started_at,
        completed_at: new Date(),
        kind: "failure",
        found,
      };
  }
}

const getDefaultPrompts = (
  app: IHttpLlmApplication<"chatgpt">,
): OpenAI.ChatCompletionMessageParam[] => [
  {
    role: "system",
    content: [
      "You are a helpful customer support assistant.",
      "Use the supplied tools to assist the user.",
    ].join("\n"),
  },
  {
    role: "user",
    content:
      "Would you list up every API functions that I can call from my backend server?",
  },
  {
    role: "assistant",
    tool_calls: [
      {
        type: "function",
        id: "listApiFunctionsOfBackend",
        function: {
          name: "getApiFunctions",
          arguments: JSON.stringify(
            app.functions.map((f) => ({
              method: f.method,
              path: f.path,
              name: f.name,
              description: f.description,
            })),
          ),
        },
      },
    ],
  },
  {
    role: "assistant",
    content: [
      "Now, user may request something. If you can find some proper API function",
      "to call, please select the API function by utilizing the `selectFunction()`",
      "function provided by tool calling.",
      "\n",
      "Otherwise, nothing to remotely call to the API function from the user's",
      "conversation, just call the `next()` function to just keep going the next",
      "conversation. Also, call `getApiFunctions()` function only when the user",
      "wants to list up every API functions he/she can utilize.",
    ].join("\n"),
  },
];

const metaApp: ILlmApplication<"chatgpt"> = typia.llm.application<
  ISelectApplication,
  "chatgpt"
>();

interface ISelectApplication {
  /**
   * Get list of API functions.
   *
   * If agent or user want to list up every remote API functions that
   * can be called from the backend server, utilize this function.
   */
  getApiFunctions(p: {}): IOperationMetadata[];

  /**
   * Select proper API function to execute.
   *
   * If you can find some proper API function to call by analyzing the user's
   * conversation, please select the API endpoint by utilizing this function.
   *
   * @param props Properties of the function
   */
  selectFunction(props: IOperationEndpoint): void;

  /**
   * Go to the next conversation.
   *
   * If there's nothing to remotely call to the API function from the user's
   * conversation, just call this function to keep going the next conversation.
   */
  next(p: {}): void;
}

type IOperationMetadata = Pick<
  IHttpLlmFunction<"chatgpt">,
  "method" | "path" | "name" | "description"
>;

interface IOperationEndpoint {
  /**
   * Method of the API function.
   */
  method: string;

  /**
   * Path of the API function.
   */
  path: string;

  /**
   * Representative name of the API function.
   */
  name: string;
}
