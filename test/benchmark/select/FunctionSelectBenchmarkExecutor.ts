import { IHttpLlmApplication, IHttpLlmFunction } from "@samchon/openapi";
import { IFunctionSelectBenchmarkResult } from "./IFunctionSelectBenchmarkResult";
import { ArrayUtil } from "@nestia/e2e";
import OpenAI from "openai";
import { IFunctionSelectBenchmarkEvent } from "./IFunctionSelectBenchmarkEvent";
import { ConnectorGlobal } from "../../../src/ConnectorGlobal";
import { IFunctionSelectBenchmarkOptions } from "./IFunctionSelectBenchmarkOptions";
import { IPointer, ranges, Semaphore } from "tstl";
import { ChatGptFunctionSelector } from "../../agent/chatgpt/ChatGptFunctionSelector";

export class FunctionSelectBenchmarkExecutor {
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
    const events: Array<IFunctionSelectBenchmarkEvent> = await Promise.all(
      ArrayUtil.repeat(this.options.repeat)(() => this.divide(func, keyword)),
    );
    return {
      function: func,
      keyword,
      count: events.length,
      success: events.filter((event) => event.kind === "success").length,
      events,
    };
  }

  private async divide(
    target: IHttpLlmFunction<"chatgpt">,
    keyword: string,
  ): Promise<IFunctionSelectBenchmarkEvent> {
    const events: Array<IFunctionSelectBenchmarkEvent> = await Promise.all(
      this.functions_.map(async (row) => {
        try {
          await this.semaphore.acquire();
          return await this.step(row, target, keyword);
        } finally {
          await this.semaphore.release();
        }
      }),
    );
    const success: IFunctionSelectBenchmarkEvent | undefined = events.filter(
      (event) => event.kind === "success",
    )[0];
    const failure: IFunctionSelectBenchmarkEvent | undefined = events.filter(
      (event) => event.kind === "failure",
    )[0];
    return success ?? failure ?? events[0];
  }

  private async step(
    row: IHttpLlmFunction<"chatgpt">[],
    target: IHttpLlmFunction<"chatgpt">,
    keyword: string,
  ): Promise<IFunctionSelectBenchmarkEvent> {
    const candidates: IHttpLlmFunction<"chatgpt">[] = [];
    const completion: IPointer<OpenAI.ChatCompletion> = { value: null! };
    const started_at: Date = new Date();

    try {
      await ChatGptFunctionSelector.execute({
        application: {
          ...this.application,
          functions: row,
        },
        service: {
          api: new OpenAI({
            apiKey: "something",
            baseURL: ConnectorGlobal.env.HAMLET_URL,
          }),
          model: "gpt-4o",
          options: {
            path: `/v2/openai/deployments/gpt-4o/chat/completions`,
            headers: {
              [ConnectorGlobal.env.HAMLET_HEADER_KEY_NAME]: [
                ConnectorGlobal.env.HAMLET_HEADER_KEY_VALUE,
              ],
            } as any,
          },
        },
        histories: [],
        stack: new Map(),
        content: keyword,
        dispatch: (event) => {
          if (event.type === "select") candidates.push(event.function);
        },
        completion,
      });

      const completed_at: Date = new Date();
      if (candidates.some((c) => c.name === target.name))
        return {
          kind: "success",
          completion: completion.value,
          started_at,
          completed_at,
        };
      else
        return {
          kind: "failure",
          found: candidates,
          completion: completion.value,
          started_at,
          completed_at,
        };
    } catch (error) {
      return {
        kind: "error",
        error,
        started_at,
        completed_at: new Date(),
      };
    }
  }
}

interface IStepResult {
  functions: IHttpLlmFunction<"chatgpt">[];
  completion: OpenAI.ChatCompletion;
}
