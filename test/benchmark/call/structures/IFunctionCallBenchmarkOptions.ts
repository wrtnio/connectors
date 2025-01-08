import OpenAI from "openai";

export interface IFunctionCallBenchmarkOptions {
  swagger: boolean;
  model: OpenAI.ChatModel;
  count: number;
  retry: number;
  timeout: number;
  capacity: number;
  include?: string[];
  exclude?: string[];
}
