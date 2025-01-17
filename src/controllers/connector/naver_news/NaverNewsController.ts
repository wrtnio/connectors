import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { ApiTags } from "@nestjs/swagger";
import { retry } from "../../../utils/retry";
import { INaverNews } from "@wrtn/connector-api/lib/structures/connector/naver_news/INaverNews";
import { NaverNewsProvider } from "../../../providers/connector/naver_news/NaverNewsProvider";

@Controller("connector/naver-news")
export class NaverNewsController {
  /**
   * Search Naver News
   *
   * @summary Search Naver News
   * @param input Conditions for searching Naver News
   * @returns
   */
  @core.TypedRoute.Patch("")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icons/naver_news.svg",
  )
  @ApiTags("Naver")
  async newsList(
    @core.TypedBody() input: INaverNews.INaverKeywordInput,
  ): Promise<INaverNews.INewsNaverOutput> {
    return retry(() => NaverNewsProvider.getNews(input))();
  }
}
