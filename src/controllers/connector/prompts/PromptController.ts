import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IPrompt } from "@wrtn/connector-api/lib/structures/connector/prompt/IPrompt";

import { PromptProvider } from "../../../providers/connector/prompt/PromptProvider";

@Controller("connector/prompt")
export class PromptController {
  constructor(private readonly promptProvider: PromptProvider) {}
  @core.TypedRoute.Post("/generate")
  async generate(
    @core.TypedBody() input: IPrompt.IRequest,
  ): Promise<IPrompt.IResponse> {
    return await this.promptProvider.generate(input);
  }
}
