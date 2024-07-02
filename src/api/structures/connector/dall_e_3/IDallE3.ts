import { tags } from "typia";

export namespace IDallE3 {
  /**
   * @title 이미지 생성을 위한 정보
   */
  export interface IRequest {
    /**
     * 이미지를 생성하기 위한 프롬프트
     *
     * @title 프롬프트
     */
    prompt: string;

    /**
     * 생성할 이미지 사이즈 프리셋 입니다.
     *
     * @title 이미지 사이즈
     */
    image_ratio:
      | tags.Constant<"square", { title: "정사각형"; description: "1024x1024" }>
      | tags.Constant<"landscape", { title: "풍경"; description: "1792x1024" }>
      | tags.Constant<"portrait", { title: "인물"; description: "1024x1792" }>;
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
