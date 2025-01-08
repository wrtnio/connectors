import { INestiaChatPrompt, INestiaChatTokenUsage } from "@nestia/agent";
import { IFunctionCallBenchmarkScenario } from "./IFunctionCallBenchmarkScenario";

export interface IFunctionCallBenchmarkResult {
  scenario: IFunctionCallBenchmarkScenario;
  histories: INestiaChatPrompt[];
  usage: INestiaChatTokenUsage;
  select: boolean;
  execute: boolean;
  error: null | Error;
  started_at: Date;
  completed_at: Date;
}
