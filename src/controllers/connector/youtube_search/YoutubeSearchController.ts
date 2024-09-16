import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { IConnector } from "@wrtn/connector-api/lib/structures/common/IConnector";
import { IYoutubeSearch } from "@wrtn/connector-api/lib/structures/connector/youtube_search/IYoutubeSearch";

import { YoutubeSearchProvider } from "../../../providers/connector/youtube_search/YoutubeSearchProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/youtube-search")
export class YoutubeSearchController {
  /**
   * 유튜브 영상 검색 결과를 가져옵니다.
   *
   * 검색 결과는 영상의 제목과 링크가 있습니다.
   * 대부분의 사용자들이 이 기능을 사용한다면, 아마도 영상을 보기를 원할 것이기 때문에 URL을 제공해주는 편이 좋습니다.
   *
   * @summary 유튜브 영상 검색
   *
   * @param input 유튜브 영상 검색을 위한 조건
   *
   * @returns 유튜브 영상 검색 결과 목록.
   */
  @Standalone()
  @core.TypedRoute.Post()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Youtube_full.svg",
  )
  async search(
    @core.TypedBody() input: IYoutubeSearch.ISearchInput,
  ): Promise<IConnector.ISearchOutput> {
    return retry(YoutubeSearchProvider.search)(input);
  }
}
