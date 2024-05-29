import OpenAI from "openai";

import { Model } from "../../../../../common/enums/model";

export class GenerateToolVO {
  /** 툴 타이틀*/
  name: string;
  /** 모델 */
  model: string;
  /** 프롬프트 난이도 */
  prompt_level: string;
  /** 최대 토큰 */
  max_tokens: string;
  /** 툴 id */
  id: string;
  /** 지시사항 */
  instructions: string;
  /** studio tracing id */
  requestId: string;
  /** 추가 제공 정보 여부 */
  plain_text_embedding: boolean;

  protected handleModelName(model: string) {
    if (model === Model.GPT4) {
      return Model.WRTN_GPT_4;
    }

    return model;
  }
}
