import { ArrayUtil } from "@nestia/e2e";
import { ChatGptSelectFunctionAgent } from "@nestia/agent/lib/chatgpt/ChatGptSelectFunctionAgent";
import { IHttpLlmApplication, IHttpLlmFunction } from "@samchon/openapi";
import OpenAI from "openai";
import { ranges, Semaphore } from "tstl";

import { IFunctionSelectBenchmarkEvent } from "./IFunctionSelectBenchmarkEvent";
import { IFunctionSelectBenchmarkOptions } from "./IFunctionSelectBenchmarkOptions";
import { IFunctionSelectBenchmarkResult } from "./IFunctionSelectBenchmarkResult";
import { ConnectorGlobal } from "../../../src/ConnectorGlobal";

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
      ArrayUtil.repeat(this.options.repeat)(async () => {
        await Promise.all(
          ArrayUtil.repeat(this.functions_.length)(() =>
            this.semaphore.acquire(),
          ),
        );
        try {
          return await this.step(func, keyword);
        } finally {
          await Promise.all(
            ArrayUtil.repeat(this.functions_.length)(() =>
              this.semaphore.release(),
            ),
          );
        }
      }),
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
    target: IHttpLlmFunction<"chatgpt">,
    keyword: string,
  ): Promise<IFunctionSelectBenchmarkEvent> {
    const candidates: IHttpLlmFunction<"chatgpt">[] = [];
    const completions: OpenAI.ChatCompletion[] = [];
    const started_at: Date = new Date();

    try {
      await ChatGptSelectFunctionAgent.execute({
        application: this.application,
        service: {
          api: new OpenAI({
            apiKey: ConnectorGlobal.env.OPENAI_API_KEY,
          }),
          model: "gpt-4o",
        },
        histories: [],
        stack: [],
        content: keyword,
        dispatch: async (event) => {
          if (event.type === "select") candidates.push(event.function);
        },
        completions,
        divide: this.functions_,
        config: {
          retry: 3,
          eliticism: false,
          locale: "ko-KR",
        },
      });

      const completed_at: Date = new Date();
      if (candidates.some((c) => c.name === target.name))
        return {
          kind: "success",
          completions,
          started_at,
          completed_at,
        };
      else
        return {
          kind: "failure",
          found: candidates,
          completions,
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
