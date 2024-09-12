import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { INaver } from "@wrtn/connector-api/lib/structures/connector/naver/INaver";

import { NaverProvider } from "../../../providers/connector/naver/NaverProvider";
import { retry } from "../../../utils/retry";
import typia from "typia";

@Controller("connector/naver")
export class NaverController {
  /**
   * 네이버 카페 컨텐츠를 검색합니다.
   *
   * @summary 네이버 카페 검색
   *
   * @param input 네이버 카페 검색을 위한 조건
   */
  @Standalone()
  @core.TypedRoute.Post("/cafe")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/NaverCafe_full.svg",
  )
  async cafeList(
    @core.TypedBody() input: INaver.INaverKeywordInput,
  ): Promise<INaver.ICafeNaverOutput> {
    return retry(() => NaverProvider.getCafe(input))();
  }

  /**
   * 네이버 블로그 컨텐츠를 검색합니다.
   *
   * @summary 네이버 블로그 검색
   *
   * @param input 네이버 블로그 검색을 위한 조건
   */
  @Standalone()
  @core.TypedRoute.Post("/blog")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/NaverBlog_full.svg",
  )
  async blogList(
    @core.TypedBody() input: INaver.INaverKeywordInput,
  ): Promise<INaver.IBlogNaverOutput> {
    return retry(() => NaverProvider.getBlog(input))();
  }

  /**
   * 네이버 뉴스를 검색합니다.
   *
   * @summary 네이버 뉴스 검색
   *
   * @param input 네이버 뉴스 검색을 위한 조건
   * @returns
   */
  @core.TypedRoute.Post("/news")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/NaverNews_full.svg",
  )
  async newsList(
    @core.TypedBody() input: INaver.INaverKeywordInput,
  ): Promise<INaver.INewsNaverOutput> {
    return retry(() => NaverProvider.getNews(input))();
  }
}
