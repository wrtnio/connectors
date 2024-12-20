import {
  IHttpLlmApplication,
  IHttpLlmFunction,
  ILlmApplication,
} from "@samchon/openapi";
import { IFunctionSelectBenchmarkResult } from "./IFunctionSelectBenchmarkResult";
import { ArrayUtil } from "@nestia/e2e";
import OpenAI from "openai";
import typia from "typia";
import { IFunctionSelectBenchmarkEvent } from "./IFunctionSelectBenchmarkEvent";
import { ConnectorGlobal } from "../../../src/ConnectorGlobal";
import { IFunctionSelectBenchmarkApplication } from "./IFunctionSelectBenchmarkApplication";
import { IFunctionSelectBenchmarkOptions } from "./IFunctionSelectBenchmarkOptions";
import { ranges, Semaphore } from "tstl";

export class FunctionSelectBenchmarkExecutor {
  private default_prompts_: OpenAI.ChatCompletionMessageParam[];
  private functions_: IHttpLlmFunction<"chatgpt">[][];

  public constructor(
    private readonly application: IHttpLlmApplication<"chatgpt">,
    private readonly options: IFunctionSelectBenchmarkOptions,
    private readonly semaphore: Semaphore,
  ) {
    const count: number = Math.ceil(
      application.functions.length / options.capacity,
    );
    const capacity: number =
      count * options.capacity >= application.functions.length
        ? options.capacity
        : options.capacity + 1;
    const entireFunctions: IHttpLlmFunction<"chatgpt">[] =
      application.functions.slice();
    ranges.shuffle(entireFunctions);
    this.functions_ = ArrayUtil.repeat(count)(() =>
      entireFunctions.splice(0, capacity),
    );
  }

  public async execute(
    func: IHttpLlmFunction<"chatgpt">,
    keyword: string,
  ): Promise<IFunctionSelectBenchmarkResult> {
    const events: IFunctionSelectBenchmarkEvent[] = await Promise.all(
      ArrayUtil.repeat(this.options.repeat)(() => this.step(func, keyword)),
    );
    return {
      function: func,
      keyword,
      count: events.length,
      success: events.filter((event) => event.kind === "success").length,
      events,
    };
  }

  private async step(
    func: IHttpLlmFunction<"chatgpt">,
    keyword: string,
  ): Promise<IFunctionSelectBenchmarkEvent> {
    // DIVIDE AND CONQUER
    await Promise.all(
      ArrayUtil.repeat(this.functions_.length)(() => this.semaphore.acquire()),
    );
    const started_at: Date = new Date();
    const results: Array<OpenAI.ChatCompletion | Error> = await Promise.all(
      this.functions_.map((functions) => this.divide(functions, keyword)),
    );
    const completed_at: Date = new Date();
    await Promise.all(
      ArrayUtil.repeat(this.functions_.length)(() => this.semaphore.release()),
    );

    const completions: OpenAI.ChatCompletion[] = results.filter(
      (r): r is OpenAI.ChatCompletion => !(r instanceof Error),
    );
    if (completions.length === 0)
      return {
        kind: "error",
        error: results[0],
        started_at,
        completed_at,
      };

    // COLLECT ENDPOINTS
    const endpoints: IFunctionSelectBenchmarkApplication.IEndpoint[] =
      completions
        .map((r) => r.choices.map((choice) => choice.message.tool_calls ?? []))
        .flat()
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
        kind: "success",
        completions,
        started_at,
        completed_at,
      };
    else
      return {
        kind: "failure",
        found,
        completions,
        started_at,
        completed_at,
      };
  }

  private async divide(
    functions: IHttpLlmFunction<"chatgpt">[],
    keyword: string,
  ): Promise<OpenAI.ChatCompletion | Error> {
    const start: Date = new Date();
    const client: OpenAI = new OpenAI({
      apiKey: "something",
      baseURL: ConnectorGlobal.env.HAMLET_URL,
    });
    try {
      const completion: OpenAI.ChatCompletion =
        await client.chat.completions.create(
          {
            model: "gpt-4o",
            messages: getMessages({
              functions,
              keyword,
            }),
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
      return completion;
    } catch (error) {
      return error as Error;
    }
  }
}

const getMessages = (props: {
  functions: IHttpLlmFunction<"chatgpt">[];
  keyword: string;
}): OpenAI.ChatCompletionMessageParam[] => [
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
            props.functions.map((f) => ({
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
    role: "tool",
    tool_call_id: "listApiFunctionsOfBackend",
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
  {
    role: "user",
    content: props.keyword,
  },
];

const metaApp: ILlmApplication<"chatgpt"> = typia.llm.application<
  IFunctionSelectBenchmarkApplication,
  "chatgpt"
>();
