import { IHttpLlmFunction } from "@samchon/openapi";
import OpenAI from "openai";

export type IFunctionSelectBenchmarkEvent =
  | IFunctionSelectBenchmarkEvent.ISuccess
  | IFunctionSelectBenchmarkEvent.IFailure
  | IFunctionSelectBenchmarkEvent.IError;
export namespace IFunctionSelectBenchmarkEvent {
  export interface ISuccess extends IEventBase<"success"> {
    completions: OpenAI.ChatCompletion[];
  }
  export interface IFailure extends IEventBase<"failure"> {
    found: null | IHttpLlmFunction<"chatgpt">;
    completions: OpenAI.ChatCompletion[];
  }
  export interface IError extends IEventBase<"error"> {
    error: unknown;
  }

  interface IEventBase<Kind extends string> {
    kind: Kind;
    started_at: Date;
    completed_at: Date;
  }
}
