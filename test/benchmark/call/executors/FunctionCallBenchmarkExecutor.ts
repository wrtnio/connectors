import { IConnection } from "@nestia/fetcher";
import {
  IChatGptService,
  INestiaChatFunctionSelection,
  INestiaChatPrompt,
  INestiaChatTokenUsage,
  NestiaChatAgent,
} from "@nestia/agent";
import { IHttpLlmApplication, IHttpLlmFunction } from "@samchon/openapi";
import { IFunctionCallBenchmarkResult } from "../structures/IFunctionCallBenchmarkResult";
import { IFunctionCallBenchmarkScenario } from "../structures/IFunctionCallBenchmarkScenario";

export namespace FunctionCallBenchmarkExecutor {
  export interface IProps {
    service: IChatGptService;
    application: IHttpLlmApplication<"chatgpt">;
    connection: IConnection;
    scenario: IFunctionCallBenchmarkScenario;
  }

  export const execute = async (
    props: IProps,
  ): Promise<IFunctionCallBenchmarkResult> => {
    const agent: NestiaChatAgent = new NestiaChatAgent({
      application: props.application,
      service: props.service,
      connection: props.connection,
      config: {
        capacity: 100,
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
        scenario: props.scenario,
        histories,
        usage,
        select: predicateSelect({
          application: props.application,
          scenario: props.scenario,
          selections: histories
            .filter((h) => h.kind === "select")
            .map((h) => h.functions)
            .flat(),
        }),
        execute: predicateExecute({
          application: props.application,
          scenario: props.scenario,
          histories: histories.filter((h) => h.kind === "execute"),
        }),
        error: null,
        started_at,
        completed_at: new Date(),
      };
    } catch (error) {
      return {
        scenario: props.scenario,
        histories: [],
        usage: agent.getTokenUsage(),
        select: false,
        execute: false,
        error: error as Error,
        started_at,
        completed_at: new Date(),
      } satisfies IFunctionCallBenchmarkResult;
    }
  };

  const predicateSelect = (props: {
    application: IHttpLlmApplication<"chatgpt">;
    scenario: IFunctionCallBenchmarkScenario;
    selections: INestiaChatFunctionSelection[];
  }): boolean => {
    if (props.scenario.expected.type === "standalone") {
      // you can find function schema like below
      const target: IHttpLlmFunction<"chatgpt"> | undefined = getFunction({
        application: props.application,
        function: props.scenario.expected.function,
      });
      return props.selections.some((s) => s.function === target);
    }
    return true;
  };

  const predicateExecute = (props: {
    application: IHttpLlmApplication<"chatgpt">;
    scenario: IFunctionCallBenchmarkScenario;
    histories: INestiaChatPrompt.IExecute[];
  }): boolean => {
    if (props.scenario.expected.type === "standalone") {
      // you can find function schema like below
      const target: IHttpLlmFunction<"chatgpt"> | undefined = getFunction({
        application: props.application,
        function: props.scenario.expected.function,
      });
      return props.histories.some((h) => h.function === target);
    }
    return true;
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
