import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { IConnector } from "@wrtn/connector-api/lib/structures/common/IConnector";

import { ArxivSearchProvider } from "../../../providers/connector/arxiv_search/ArxivSearchProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/arxiv-search")
export class ArxivSearchController {
  /**
   * 입력한 검색 조건을 기반으로 아카이브에서 논문을 검색합니다.
   *
   * @summary 아카이브 논문 검색
   * @param input 아카이브 논문 검색 조건
   * @returns 검색 조건을 기반으로 아카이브에서 검색된 논문 목록.
   */
  @Standalone()
  @core.TypedRoute.Post()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Arxiv_full.svg",
  )
  async search(
    @core.TypedBody() input: IConnector.ISearchInput,
  ): Promise<IConnector.ISearchOutput> {
    return retry(() => ArxivSearchProvider.search(input))();
  }
}
