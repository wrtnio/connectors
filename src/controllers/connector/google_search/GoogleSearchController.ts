import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtn/decorators";

import { IGoogleSearch } from "@wrtn/connector-api/lib/structures/connector/google_search/IGoogleSearch";

import { GoogleSearchProvider } from "../../../providers/connector/google_search/GoogleSearchProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/google-search")
export class GoogleSearchController {
  constructor(private readonly googleSearchProvider: GoogleSearchProvider) {}

  /**
   * 입력한 검색어를 구글에서 검색합니다.
   *
   * @summary 구글 검색
   *
   * @param input 구글 검색 조건
   *
   * @returns 구글 검색 결과
   */
  @Standalone()
  @core.TypedRoute.Post("")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google.svg",
  )
  async search(
    @core.TypedBody() input: IGoogleSearch.IRequest,
  ): Promise<IGoogleSearch.IResponse[]> {
    return retry(() => this.googleSearchProvider.search(input))();
  }
}
