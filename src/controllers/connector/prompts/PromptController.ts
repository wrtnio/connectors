import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon } from "@wrtnio/decorators";

import { IPrompt } from "@wrtn/connector-api/lib/structures/connector/prompt/IPrompt";

import { PromptProvider } from "../../../providers/connector/prompt/PromptProvider";

@Controller("connector/prompt")
export class PromptController {
  constructor(private readonly promptProvider: PromptProvider) {}
  /**
   * Enter the request you want to give to LLM
   *
   * @summary prompt node
   * @param input user's prompt
   * @returns response via prompt
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Prompt_prompt_full.svg",
  )
  @core.TypedRoute.Post("/generate")
  async generate(
    @core.TypedBody() input: IPrompt.IRequest,
  ): Promise<IPrompt.IResponse> {
    return await this.promptProvider.generate(input);
  }
}
