import { IHttpLlmFunction } from "@samchon/openapi";
import { IFunctionSelectBenchmarkEvent } from "./IFunctionSelectBenchmarkEvent";

export interface IFunctionSelectBenchmarkResult {
  function: IHttpLlmFunction<"chatgpt">;
  keyword: string;
  count: number;
  success: number;
  events: IFunctionSelectBenchmarkEvent[];
}
