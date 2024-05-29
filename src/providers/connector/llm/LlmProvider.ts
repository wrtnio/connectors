import { Injectable } from "@nestjs/common";
import typia from "typia";

import { ISelectorLlmResponse } from "@wrtn/connector-api/lib/structures/connector/llm/ILlm";

import {
  IChainOfThought,
  OpenAIProvider,
  dump,
} from "../../open_ai/OpenAIProvider";

async function selector(
  openAIProvider: OpenAIProvider,
  candidates: any[],
  numSelection: number,
  context: any,
): Promise<number[]> {
  type Select = IChainOfThought & { selection: number[] };
  const response = await openAIProvider.extractInterface(
    `
You are given a task of selecting one option from a list of candidates.
Choose ${numSelection} options from the list of candidates.
You will also be given a list of previous selections, if any.
Given the context, you are to select the best option from the list of candidates.
Return the selected candiates as a list of indexes of the candidates.
The context is given as following: ${dump(context)}
The candidates are given as following: ${dump(candidates)}
Make sure you select ${numSelection} options.
    `,
    typia.json.application<[Select]>(),
    typia.createIs<Select>(),
    "gpt-4-turbo", // need to use gpt-4 for this.. gpt-3 can't handle following schema
  );
  // TODO: check if response.selection is actually in `candidates`
  return response.selection;
}

@Injectable()
export class LlmProvider {
  constructor(private openAIProvider: OpenAIProvider) {}

  async selectorLlm(
    candidates: any[],
    numSelection: number,
    context: any,
  ): Promise<ISelectorLlmResponse> {
    return {
      selection: await selector(
        this.openAIProvider,
        candidates,
        numSelection,
        context,
      ),
    };
  }
}
