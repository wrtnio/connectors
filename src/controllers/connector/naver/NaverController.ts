import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { INaver } from "@wrtn/connector-api/lib/structures/connector/naver/INaver";

import { ApiTags } from "@nestjs/swagger";
import { NaverProvider } from "../../../providers/connector/naver/NaverProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/naver")
export class NaverController {
  /**
   * Search Naver Cafe contents
   *
   * @summary Naver Cafe search
   * @param input Conditions for Naver Cafe search
   */
  @Standalone()
  @core.TypedRoute.Patch("/cafe")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/NaverCafe_full.svg",
  )
  @ApiTags("Naver")
  async cafeList(
    @core.TypedBody() input: INaver.INaverKeywordInput,
  ): Promise<INaver.ICafeNaverOutput> {
    return retry(() => NaverProvider.getCafe(input))();
  }

  /**
   * Search Naver blog content
   *
   * @summary Naver blog search
   * @param input Conditions for Naver blog search
   */
  @Standalone()
  @core.TypedRoute.Patch("/blog")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/NaverBlog_full.svg",
  )
  @ApiTags("Naver")
  async blogList(
    @core.TypedBody() input: INaver.INaverKeywordInput,
  ): Promise<INaver.IBlogNaverOutput> {
    return retry(() => NaverProvider.getBlog(input))();
  }

  /**
   * Search Naver News
   *
   * @summary Search Naver News
   * @param input Conditions for searching Naver News
   * @returns
   */
  @core.TypedRoute.Patch("/news")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/NaverNews_full.svg",
  )
  @ApiTags("Naver")
  async newsList(
    @core.TypedBody() input: INaver.INaverKeywordInput,
  ): Promise<INaver.INewsNaverOutput> {
    return retry(() => NaverProvider.getNews(input))();
  }
}
