import { IChatGptService, INestiaChatTokenUsage } from "@nestia/agent";
import { ArrayUtil } from "@nestia/e2e";
import { ChatGptSelectFunctionAgent } from "@nestia/agent/lib/chatgpt/ChatGptSelectFunctionAgent";
import { IHttpLlmApplication, IHttpLlmFunction } from "@samchon/openapi";
import OpenAI from "openai";
import { ranges, Semaphore } from "tstl";

import { IFunctionSelectBenchmarkEvent } from "./IFunctionSelectBenchmarkEvent";
import { IFunctionSelectBenchmarkOptions } from "./IFunctionSelectBenchmarkOptions";
import { IFunctionSelectBenchmarkResult } from "./IFunctionSelectBenchmarkResult";

export class FunctionSelectBenchmarkExecutor {
  private functions_: IHttpLlmFunction<"chatgpt">[][];
  private usage_: INestiaChatTokenUsage;

  public constructor(
    private readonly service: IChatGptService,
    private readonly application: IHttpLlmApplication<"chatgpt">,
    private readonly options: IFunctionSelectBenchmarkOptions,
    private readonly semaphore: Semaphore,
  ) {
    if (application.functions.length <= options.capacity)
      this.functions_ = [application.functions];
    else {
      const size: number = Math.ceil(
        application.functions.length / options.capacity,
      );
      const capacity: number = Math.ceil(application.functions.length / size);
      const entireFunctions: IHttpLlmFunction<"chatgpt">[] =
        application.functions.slice();
      ranges.shuffle(entireFunctions);
      this.functions_ = ArrayUtil.repeat(size)(() =>
        entireFunctions.splice(0, capacity),
      );
    }
    this.usage_ = {
      total: 0,
      prompt: {
        total: 0,
        audio: 0,
        cached: 0,
      },
      completion: {
        total: 0,
        accepted_prediction: 0,
        audio: 0,
        reasoning: 0,
        rejected_prediction: 0,
      },
    };
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
        service: this.service,
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
          eliticism: true,
          locale: "ko-KR",
        },
        usage: this.usage_,
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

  public getUsage(): INestiaChatTokenUsage {
    return this.usage_;
  }
}
