import { Placeholder } from "@wrtn/decorators";
import { tags } from "typia";

export namespace IImage {
  /**
   * @title 이미지 생성을 위한 정보
   */
  export interface IRequest {
    /**
     * 이미지를 생성하기 위한 프롬프트
     *
     * @title 프롬프트
     */
    prompt: string &
      Placeholder<"아름다운 해변에서 노을이 지는 모습을 그려줘. 하늘에는 붉은 빛이 퍼지고 모래사장에는 발자국이 남겨져 있어.">;
  }

  export interface IResponse {
    /**
     * 생성된 이미지 url
     *
     * @title 생성된 이미지 Url
     */
    imgUrl: string & tags.Format<"uri">;
  }
}
