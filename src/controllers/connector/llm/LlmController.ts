import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import {
  ISelectorLlmRequest,
  ISelectorLlmResponse,
} from "@wrtn/connector-api/lib/structures/connector/llm/ILlm";

import { RouteIcon } from "@wrtnio/decorators";
import { LlmProvider } from "../../../providers/connector/llm/LlmProvider";

@Controller("connector/llm")
export class LlmController {
  constructor(private llmProvider: LlmProvider) {}

  /**
   * Select a candidate that satisfies the conditions from the given candidates
   *
   * @summary Select condition
   * @param body Input for candidate selection
   * @returns Array of selected candidate indices
   * @tag Llm selection Extract selection
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/LLM_full.svg",
  )
  @core.TypedRoute.Post("/selector-llm")
  async selectorLlm(
    @core.TypedBody() body: ISelectorLlmRequest,
  ): Promise<ISelectorLlmResponse> {
    return this.llmProvider.selectorLlm(
      body.candidates,
      body.num_select,
      body.context,
    );
  }
}
