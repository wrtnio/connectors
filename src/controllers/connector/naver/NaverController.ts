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
   * Search Naver Cafe contents.
   *
   * @summary Naver Cafe search
   *
   * @param input Conditions for Naver Cafe search
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
   * Search Naver blog content.
   *
   * @summary Naver blog search
   *
   * @param input Conditions for Naver blog search
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
   * Search Naver News.
   *
   * @summary Search Naver News
   *
   * @param input Conditions for searching Naver News
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
