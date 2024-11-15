import { getJson } from "serpapi";

import { IConnector } from "@wrtn/connector-api/lib/structures/common/IConnector";
import { IYoutubeSearch } from "@wrtn/connector-api/lib/structures/connector/youtube_search/IYoutubeSearch";

import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { makeQuery } from "../../../utils/generate-search-query.util";
import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from "@nestjs/common";
import axios from "axios";

@Injectable()
export class YoutubeSearchProvider {
  async search(
    input: IYoutubeSearch.ISearchInput,
  ): Promise<IConnector.ISearchOutput> {
    const defaultParams = {
      engine: "youtube",
      api_key: ConnectorGlobal.env.SERP_API_KEY,
    };
    const searchQuery = makeQuery(
      input.and_keywords,
      input.or_keywords ?? [],
      input.not_keywords ?? [],
    );

    const params: IYoutubeSearch.ISerpApiParams = {
      ...defaultParams,
      search_query: searchQuery,
    };

    try {
      const res = await getJson(params);
      const results: IYoutubeSearch.ISerpApiVideoResult[] =
        res["video_results"];
      const output: IConnector.IReferenceContent[] = [];

      for (const result of results) {
        const youtubeSearch: IConnector.IReferenceContent = {
          title: result.title,
          type: "video",
          source: "youtube",
          url: result.link,
          contents: result.description,
          image: result.thumbnail.static,
          statistics: {
            view_count: Number(result.views ?? 0), // 조회 수 데이터 undefined로 결과가 나오는 경우가 있어서 0으로 처리
          },
        };
        output.push(youtubeSearch);
      }
      return {
        references: output,
      };
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async transcript(
    input: IYoutubeSearch.ITranscriptYoutubeRequest,
  ): Promise<IYoutubeSearch.ITranscriptYoutubeResponse> {
    try {
      const videoId = this.parsedVideoId(input.url);
      const videoMetaData = await this.getVideoMetaData(videoId);

      if (!videoMetaData) {
        throw new BadRequestException("invalid_video_id: videoId: " + videoId);
      }

      const channelName = videoMetaData.channel.name;
      const title = videoMetaData.video.title;
      const uploadedAt = videoMetaData.video.published_time;
      const viewCount = Number(videoMetaData.video.views);

      const defaultAudioLanguage = "ko";
      const transcript = await this.getVideoTranscripts(
        videoId,
        defaultAudioLanguage,
      );

      if (transcript.transcripts) {
        return {
          id: videoId,
          title,
          channelName,
          uploadedAt,
          viewCount,
          captionLines: transcript.transcripts,
        };
      }

      if (transcript.available_transcripts_languages.length < 1) {
        throw new UnprocessableEntityException(
          "Unsupported Youtube Video. videoId: " + videoId,
        );
      }

      const secondTranscript = await this.getVideoTranscripts(
        videoId,
        transcript.available_transcripts_languages[0].lang,
      );

      // If the first language is not supported, try the available second language
      if (secondTranscript.transcripts) {
        return {
          id: videoId,
          title,
          channelName,
          uploadedAt,
          viewCount,
          captionLines: secondTranscript.transcripts,
        };
      }
      throw new UnprocessableEntityException(
        "Unsupported Youtube Video. videoId: " + videoId,
      );
    } catch (err) {
      console.error(JSON.stringify(err));
      throw new UnprocessableEntityException("Unsupported Youtube Video");
    }
  }

  private parsedVideoId(url: string): string {
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url);
    } catch (err) {
      throw new BadRequestException(`malformed youtube url: ${url}`);
    }

    let videoId: string | null = null;

    if (
      parsedUrl.hostname.endsWith("youtube.com") &&
      parsedUrl.pathname === "/watch"
    ) {
      videoId = parsedUrl.searchParams.get("v");
    } else if (parsedUrl.host.endsWith("youtu.be")) {
      videoId = parsedUrl.pathname.split("/")[1];
    }

    if (videoId === null) {
      throw new BadRequestException(`malformed youtube url: ${url}`);
    }

    return videoId;
  }

  private async getVideoMetaData(
    videoId: string,
  ): Promise<IYoutubeSearch.IYoutubeVideoMetaData> {
    const res = await axios.get(
      `${ConnectorGlobal.env.SEARCH_API_HOST}/api/v1/search`,
      {
        params: {
          video_id: videoId,
          engine: "youtube_video",
          api_key: ConnectorGlobal.env.SEARCH_API_KEY,
          gl: "kr",
          hl: "ko",
        },
      },
    );
    return res.data;
  }

  private async getVideoTranscripts(
    videoId: string,
    language: string,
  ): Promise<IYoutubeSearch.IYoutubeTrasncriptResponse> {
    const res = await axios.get(
      `${ConnectorGlobal.env.SEARCH_API_HOST}/api/v1/search?engine=youtube_transcripts`,
      {
        params: {
          video_id: videoId,
          lang: language,
          engine: "youtube_transcripts",
          api_key: ConnectorGlobal.env.SEARCH_API_KEY,
          gl: "kr",
          hl: "ko",
        },
      },
    );
    return res.data;
  }
}
