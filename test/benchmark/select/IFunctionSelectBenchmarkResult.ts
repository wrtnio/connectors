import { IHttpLlmFunction } from "@samchon/openapi";

export interface IFunctionSelectBenchmarkResult {
  function: IHttpLlmFunction<"chatgpt">;
  keyword: string;
  count: number;
  success: number;
  events: IFunctionSelectBenchmarkResult.IEvent[];
}
export namespace IFunctionSelectBenchmarkResult {
  export type IEvent = ISuccessEvent | IFailureEvent | IErrorEvent;

  export interface ISuccessEvent extends IEventBase<true> {}
  export interface IFailureEvent extends IEventBase<false> {
    kind: "failure";
    found: null | IHttpLlmFunction<"chatgpt">;
  }
  export interface IErrorEvent extends IEventBase<false> {
    kind: "error";
    error: unknown;
  }

  interface IEventBase<Success extends boolean> {
    success: Success;
    started_at: Date;
    completed_at: Date;
  }
}
