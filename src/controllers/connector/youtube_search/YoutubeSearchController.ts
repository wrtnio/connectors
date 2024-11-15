import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { IConnector } from "@wrtn/connector-api/lib/structures/common/IConnector";
import { IYoutubeSearch } from "@wrtn/connector-api/lib/structures/connector/youtube_search/IYoutubeSearch";

import { ApiTags } from "@nestjs/swagger";
import { YoutubeSearchProvider } from "../../../providers/connector/youtube_search/YoutubeSearchProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/youtube-search")
export class YoutubeSearchController {
  constructor(private readonly youtubeSearchProvider: YoutubeSearchProvider) {}
  /**
   * Get YouTube video search results
   *
   * The search results have the video title and link.
   * If most users are going to use this feature, they probably want to watch the video, so it's better to provide a URL.
   *
   * @summary YouTube video search
   * @param input Conditions for YouTube video search
   * @returns List of YouTube video search results
   */
  @Standalone()
  @core.TypedRoute.Post()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Youtube_full.svg",
  )
  @ApiTags("Youtube")
  async search(
    @core.TypedBody() input: IYoutubeSearch.ISearchInput,
  ): Promise<IConnector.ISearchOutput> {
    return retry(this.youtubeSearchProvider.search)(input);
  }

  /**
   * Get Transcripts of Youtube video
   *
   * @summary Get Youtube video transcripts
   * @param input video url
   * @returns transcripts of video
   */
  @core.TypedRoute.Post("/transcript")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Youtube_full.svg",
  )
  @ApiTags("Youtube")
  async transcript(
    @core.TypedBody() input: IYoutubeSearch.ITranscriptYoutubeRequest,
  ): Promise<IYoutubeSearch.ITranscriptYoutubeResponse> {
    return this.youtubeSearchProvider.transcript(input);
  }
}
