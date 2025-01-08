import { IConnection } from "@nestia/fetcher";
import {
  IChatGptService,
  INestiaChatPrompt,
  INestiaChatTokenUsage,
  NestiaChatAgent,
} from "@nestia/agent";
import { IHttpLlmApplication, IHttpLlmFunction } from "@samchon/openapi";
import { IFunctionCallBenchmarkResult } from "../structures/IFunctionCallBenchmarkResult";
import { IFunctionCallBenchmarkScenario } from "../structures/IFunctionCallBenchmarkScenario";
import { IFunctionCallBenchmarkExpected } from "../structures/IFunctionCallBenchmarkExpected";
import { IFunctionCallBenchmarkOptions } from "../structures/IFunctionCallBenchmarkOptions";
import { Semaphore } from "tstl";

export namespace FunctionCallBenchmarkExecutor {
  export interface IProps {
    application: IHttpLlmApplication<"chatgpt">;
    service: IChatGptService;
    connection: IConnection;
    options: IFunctionCallBenchmarkOptions;
    semaphore: Semaphore;
    scenario: IFunctionCallBenchmarkScenario;
    location: string;
  }

  export const execute = async (
    props: IProps,
  ): Promise<IFunctionCallBenchmarkResult> => ({
    location: props.location,
    scenario: props.scenario,
    trials: await Promise.all(
      new Array(props.options.count).fill(0).map(async () => {
        await props.semaphore.acquire();
        const tr: IFunctionCallBenchmarkResult.ITrial = await process(props);
        await props.semaphore.release();
        return tr;
      }),
    ),
  });

  export const process = async (
    props: IProps,
  ): Promise<IFunctionCallBenchmarkResult.ITrial> => {
    const agent: NestiaChatAgent = new NestiaChatAgent({
      application: props.application,
      service: props.service,
      connection: props.connection,
      config: {
        capacity: props.options.capacity,
        eliticism: true,
      },
    });

    const started_at: Date = new Date();
    try {
      const histories: INestiaChatPrompt[] = await agent.conversate(
        props.scenario.prompt,
      );
      const usage: INestiaChatTokenUsage = agent.getTokenUsage();
      return {
        histories,
        usage,
        select: predicateIncludeFunction({
          application: props.application,
          expected: props.scenario.expected,
          functionList: histories
            .filter((h) => h.kind === "select")
            .map((h) => h.functions)
            .flat(),
          strict: false,
        }),
        execute: predicateIncludeFunction({
          application: props.application,
          expected: props.scenario.expected,
          functionList: histories.filter((h) => h.kind === "execute"),
          strict: false,
        }),
        error: null,
        started_at,
        completed_at: new Date(),
      };
    } catch (error) {
      return {
        histories: [],
        usage: agent.getTokenUsage(),
        select: false,
        execute: false,
        error: error as Error,
        started_at,
        completed_at: new Date(),
      };
    }
  };

  const predicateIncludeFunction = (props: {
    application: IHttpLlmApplication<"chatgpt">;
    expected: IFunctionCallBenchmarkExpected;
    functionList: { function: IHttpLlmFunction<"chatgpt"> }[];
    strict: boolean;
  }): boolean => {
    const call = (
      expected: IFunctionCallBenchmarkExpected,
      overrideHistories?: { function: IHttpLlmFunction<"chatgpt"> }[],
    ) =>
      predicateIncludeFunction({
        application: props.application,
        functionList: overrideHistories ?? props.functionList,
        expected,
        strict: props.strict,
      });

    switch (props.expected.type) {
      case "standalone":
        const target: IHttpLlmFunction<"chatgpt"> | undefined = getFunction({
          application: props.application,
          function: props.expected.function,
        });
        return props.functionList.some(({ function: func }) => func === target);
      case "allOf":
        return props.expected.allOf.every((expected) => call(expected));
      case "anyOf":
        return props.expected.anyOf.some((expected) => call(expected));
      case "array":
        const targetIterator = props.expected.items[Symbol.iterator]();
        let targeted = targetIterator.next();

        for (const history of props.functionList) {
          if (targeted.done) {
            return true;
          }

          if (call(targeted.value, [history])) {
            targeted = targetIterator.next();
            continue;
          }

          if (props.strict) {
            return false;
          }
        }
        return true;
    }
  };

  const getFunction = (props: {
    application: IHttpLlmApplication<"chatgpt">;
    function: Function;
  }): IHttpLlmFunction<"chatgpt"> | undefined => {
    return props.application.functions.find(
      (func) =>
        func.operation()["x-samchon-controller"] ===
          props.function.prototype.constructor.name &&
        func.operation()["x-samchon-accessor"]?.at(-1) === props.function.name,
    );
  };
}
