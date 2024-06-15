import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtn/decorators";

import { IConnector } from "@wrtn/connector-api/lib/structures/common/IConnector";
import { IYoutubeSearch } from "@wrtn/connector-api/lib/structures/connector/youtube_search/IYoutubeSearch";

import { YoutubeSearchProvider } from "../../../providers/connector/youtube_search/YoutubeSearchProvider";

@Controller("connector/youtube-search")
export class YoutubeSearchController {
  /**
   * 유튜브 영상 검색 결과를 가져옵니다.
   *
   * @summary 유튜브 영상 검색
   *
   * @param input 유튜브 영상 검색을 위한 조건
   *
   * @returns 유튜브 영상 검색 결과 목록.
   *
   * @tag Youtube 유튜브
   */
  @Standalone()
  @core.TypedRoute.Post()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/light/youtube.svg",
  )
  async search(
    @core.TypedBody() input: IYoutubeSearch.ISearchInput,
  ): Promise<IConnector.ISearchOutput> {
    return YoutubeSearchProvider.search(input);
  }
}
