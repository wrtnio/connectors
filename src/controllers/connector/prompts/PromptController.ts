import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RouteIcon } from "@wrtn/decorators";

import { IPrompt } from "@wrtn/connector-api/lib/structures/connector/prompt/IPrompt";

import { PromptProvider } from "../../../providers/connector/prompt/PromptProvider";
import { Try, createResponseForm } from "../../../utils/createResponseForm";

@Controller("connector/prompt")
export class PromptController {
  constructor(private readonly promptProvider: PromptProvider) {}
  /**
   * LLM에게 지시할 요청사항을 입력합니다.
   *
   * @summary 프롬프트 노드
   * @param input 유저의 프롬프트 입력
   * @returns 프롬프트를 통한 답변
   */
  @ApiTags("프롬프트 노드")
  @RouteIcon("https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/prompt_node.svg")
  @core.TypedRoute.Post("/generate")
  async generate(@core.TypedBody() input: IPrompt.IRequest): Promise<Try<IPrompt.IResponse>> {
    const data = await this.promptProvider.generate(input);
    return createResponseForm(data);
  }
}
