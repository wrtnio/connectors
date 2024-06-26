import { Placeholder } from "@wrtn/decorators";
import { tags } from "typia";

export namespace IIconAndLogo {
  /**
   * @title 이미지 생성기 설정
   */
  export interface IRequest {
    /**
     * 생성하고자 하는 이미지에 포함하고 싶은 요소, 스타일, 주제 등을 구체적으로 적어주세요. 이 프롬프트는 모델이 이미지를 생성할 때 원하는 특징과 디테일을 반영하도록 지시합니다.
     *
     * @title 프롬프트
     */
    prompt: string &
      Placeholder<"아름다운 해변에서 노을이 지는 모습을 그려줘. 하늘에는 붉은 빛이 퍼지고 모래사장에는 발자국이 남겨져 있어.">;

    /**
     * 생성할 이미지 사이즈 프리셋 입니다.
     *
     * @title 이미지 사이즈
     */
    image_ratio:
      | tags.Constant<"square", { title: "정사각형"; description: "512x512" }>
      | tags.Constant<"landscape", { title: "풍경"; description: "896x512" }>
      | tags.Constant<"portrait", { title: "인물"; description: "512x896" }>;

    /**
     * 이미지를 특정한 스타일로 생성합니다.
     *
     * @title 스타일 프리셋
     */
    style_preset?:
      | tags.Constant<"3d-model", { title: "3D 모델" }>
      | tags.Constant<"analog-film", { title: "아날로그 필름" }>
      | tags.Constant<"anime", { title: "에니메이션" }>
      | tags.Constant<"cinematic", { title: "영화" }>
      | tags.Constant<"comic-book", { title: "만화" }>
      | tags.Constant<"digital-art", { title: "디지털 아트" }>
      | tags.Constant<"enhance", { title: "보정" }>
      | tags.Constant<"fantasy-art", { title: "판타지 아트" }>
      | tags.Constant<"isometric", { title: "등각뷰" }>
      | tags.Constant<"line-art", { title: "라인 아트" }>
      | tags.Constant<"low-poly", { title: "로우 폴리곤" }>
      | tags.Constant<"modeling-compound", { title: "클레이 아트" }>
      | tags.Constant<"neon-punk", { title: "네온 펑크" }>
      | tags.Constant<"origami", { title: "종이 접기" }>
      | tags.Constant<"photographic", { title: "사진" }>
      | tags.Constant<"pixel-art", { title: "픽셀 아트" }>
      | tags.Constant<"tile-texture", { title: "타일 텍스쳐" }>;
  }

  export interface IResponse {
    /**
     * 생성된 이미지 url
     *
     * @title 생성된 이미지 Url
     */
    imgUrl: string & tags.Format<"uri">;
  }

  /**
   * @internal
   */
  export interface ISDXLBetaPromptRequest {
    text: string;
    weight: number;
  }

  /**
   * @internal
   */
  export interface ISDXLBetaPromptResponse {
    base64: string;
    seed: number;
    finishReason: string;
  }
}
