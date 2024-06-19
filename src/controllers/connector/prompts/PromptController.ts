import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IPrompt } from "@wrtn/connector-api/lib/structures/connector/prompt/IPrompt";

import { PromptProvider } from "../../../providers/connector/prompt/PromptProvider";

@Controller("connector/prompt")
export class PromptController {
  constructor(private readonly promptProvider: PromptProvider) {}
  /**
   * 프롬프트 입력을 받아 답변을 생성합니다.
   *
   * @summary 프롬프트 노드
   * @param input 유저의 프롬프트 입력
   * @returns 프롬프트를 통한 답변
   *
   * @tag Prompt
   */
  @core.TypedRoute.Post("/generate")
  async generate(
    @core.TypedBody() input: IPrompt.IRequest,
  ): Promise<IPrompt.IResponse> {
    return await this.promptProvider.generate(input);
  }
}
