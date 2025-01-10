import { ArrayUtil } from "@nestia/e2e";
import { ChatGptSelectFunctionAgent } from "@nestia/agent/lib/chatgpt/ChatGptSelectFunctionAgent";
import { IHttpLlmApplication, IHttpLlmFunction } from "@samchon/openapi";
import OpenAI from "openai";
import { ranges, Semaphore } from "tstl";

import { IFunctionSelectBenchmarkEvent } from "./IFunctionSelectBenchmarkEvent";
import { IFunctionSelectBenchmarkOptions } from "./IFunctionSelectBenchmarkOptions";
import { IFunctionSelectBenchmarkResult } from "./IFunctionSelectBenchmarkResult";
import {
  INestiaAgentPrompt,
  INestiaAgentProvider,
  INestiaAgentTokenUsage,
  NestiaAgent,
} from "@nestia/agent";
import { INestiaAgentOperationCollection } from "@nestia/agent/lib/structures/INestiaAgentOperationCollection";

export class FunctionSelectBenchmarkExecutor {
  private operations_: INestiaAgentOperationCollection;
  private usage_: INestiaAgentTokenUsage;

  public constructor(
    private readonly service: INestiaAgentProvider,
    private readonly application: IHttpLlmApplication<"chatgpt">,
    private readonly options: IFunctionSelectBenchmarkOptions,
    private readonly semaphore: Semaphore,
  ) {
    const agent: NestiaAgent = new NestiaAgent({
      provider: service,
      controllers: [
        {
          protocol: "http",
          name: "connectors",
          application,
          connection: { host: "http://127.0.0.1/fake" },
        },
      ],
      config: {
        capacity: options.capacity,
        eliticism: true,
      },
    });
    this.operations_ = agent["operations_"];
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
          ArrayUtil.repeat(this.operations_.divided!.length)(() =>
            this.semaphore.acquire(),
          ),
        );
        try {
          return await this.step(func, keyword);
        } finally {
          await Promise.all(
            ArrayUtil.repeat(this.operations_.divided!.length)(() =>
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
        operations: this.operations_,
        config: {
          retry: 3,
          eliticism: true,
          locale: "ko-KR",
        },
        histories: [],
        stack: [],
        prompt: {
          type: "text",
          role: "user",
          text: keyword,
        },
        ready: () => true,
        dispatch: async (event) => {
          if (event.type === "select" && event.operation.protocol === "http")
            candidates.push(event.operation.function);
          else if (event.type === "response") completions.push(event.value);
        },
        request: (_, body) =>
          this.service.api.chat.completions.create({
            ...body,
            model: this.service.model,
          }),
        initialize: async () => {},
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

  public getUsage(): INestiaAgentTokenUsage {
    return this.usage_;
  }
}
