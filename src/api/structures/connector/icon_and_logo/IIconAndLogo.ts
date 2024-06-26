import { Placeholder } from "@wrtn/decorators";
import { tags } from "typia";

export namespace IIconAndLogo {
  export interface IRequest {
    /**
     * 아이콘/로고 이미지를 생성하기 위한 프롬프트
     *
     * @title 프롬프트
     */
    prompt: string &
      Placeholder<"아름다운 해변에서 노을이 지는 모습을 그려줘. 하늘에는 붉은 빛이 퍼지고 모래사장에는 발자국이 남겨져 있어.">;
    /**
     * 이미지 스타일을 설정할 수 있습니다.
     *
     * @title 스타일 프리셋
     */
    style_preset:
      | tags.Constant<"3d-model", { title: "3D 모델" }>
      | tags.Constant<"analog-film", { title: "아날로그 필름" }>
      | tags.Constant<"anime", { title: "에니메" }>
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
