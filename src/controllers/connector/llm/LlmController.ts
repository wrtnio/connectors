import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { ISelectorLlmRequest, ISelectorLlmResponse } from "@wrtn/connector-api/lib/structures/connector/llm/ILlm";

import { LlmProvider } from "../../../providers/connector/llm/LlmProvider";
import { Try, createResponseForm } from "../../../utils/createResponseForm";

@Controller("connector/llm")
export class LlmController {
  constructor(private llmProvider: LlmProvider) {}

  /**
   * 주어진 후보 중에서 조건에 맞는 것을 선택합니다.
   *
   * @summary 조건 선택
   *
   * @param body 후보 선택을 위한 입력
   *
   * @returns 선택된 후보 인덱스 배열
   *
   * @tag Llm selection 선택 추출
   */
  @core.TypedRoute.Post("/selector-llm")
  async selectorLlm(@core.TypedBody() body: ISelectorLlmRequest): Promise<Try<ISelectorLlmResponse>> {
    const data = await this.llmProvider.selectorLlm(body.candidates, body.num_select, body.context);
    return createResponseForm(data);
  }
}
