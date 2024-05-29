import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon } from "@wrtn/decorators";

import { INaver } from "@wrtn/connector-api/lib/structures/connector/naver/INaver";

import { NaverProvider } from "../../../providers/connector/naver/NaverProvider";

@Controller("connector/naver")
export class NaverController {
  /**
   * 네이버 카페 컨텐츠를 검색합니다.
   *
   * @summary 네이버 카페 검색
   *
   * @param input 네이버 카페 검색을 위한 조건
   *
   * @tag Naver 네이버 포털 사이트
   */
  @core.TypedRoute.Post("/cafe")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/light/naver_cafe.svg",
  )
  async cafeList(
    @core.TypedBody() input: INaver.INaverKeywordInput,
  ): Promise<INaver.ICafeNaverOutput> {
    return await NaverProvider.getCafe(input);
  }

  /**
   * 네이버 블로그 컨텐츠를 검색합니다.
   *
   * @summary 네이버 블로그 검색
   *
   * @param input 네이버 블로그 검색을 위한 조건
   *
   * @tag Naver 네이버 포털 사이트
   */
  @core.TypedRoute.Post("/blog")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/light/naver_blog.svg",
  )
  async blogList(
    @core.TypedBody() input: INaver.INaverKeywordInput,
  ): Promise<INaver.IBlogNaverOutput> {
    return await NaverProvider.getBlog(input);
  }
}
