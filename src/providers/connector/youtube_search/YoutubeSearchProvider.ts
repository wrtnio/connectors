import { getJson } from "serpapi";

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
  ): Promise<IYoutubeSearch.ISearchOutput[]> {
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
      const output: IYoutubeSearch.ISearchOutput[] = [];

      for (const result of results) {
        const youtubeSearch: IYoutubeSearch.ISearchOutput = {
          title: result.title,
          link: result.link,
          thumbnail: result.thumbnail.static,
          view_count: Number(result.views ?? 0),
          channel_name: result.channel.name,
          channel_link: result.channel.link,
          published_date: result.published_date,
        };
        output.push(youtubeSearch);
      }
      output.sort((a, b) => {
        const viewCountA = a.view_count;
        const viewCountB = b.view_count;
        return viewCountB - viewCountA;
      });
      return output;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async searchVideo(
    input: IYoutubeSearch.IYoutubeSearchVideoRequest,
  ): Promise<IYoutubeSearch.IYoutubeSearchVideoResponse[]> {
    try {
      const query = this.createYoutubeSearchQuery(
        input.and_keywords,
        input.or_keywords ?? [],
        input.not_keywords ?? [],
      );
      const res = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            key: ConnectorGlobal.env.GOOGLE_API_KEY,
            part: "snippet",
            q: query,
            order: "viewCount",
            type: "video",
            videoCaption: "closedCaption",
            videoEmbeddable: "true",
            ...(input.publishedAfter && {
              publishedAfter: input.publishedAfter,
            }),
            ...(input.publishedBefore && {
              publishedBefore: input.publishedBefore,
            }),
            maxResults: Number(
              ConnectorGlobal.env.YOUTUBE_OFFICIAL_SEARCH_MAX_RESULTS,
            ),
          },
        },
      );

      const results: IYoutubeSearch.IYoutubeSearchVideoResponse[] = [];
      for (const item of res.data.items) {
        const video: IYoutubeSearch.IYoutubeSearchVideoResponse = {
          videoId: item.id.videoId,
          title: item.snippet.title,
          link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          channel_name: item.snippet.channelTitle,
          channel_link: `https://www.youtube.com/channel/${item.snippet.channelId}`,
          published_date: item.snippet.publishTime,
          thumbnail: item.snippet.thumbnails.default.url,
        };
        results.push(video);
      }

      return results;
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

      // Filter out auto-generated captions from available languages
      transcript.available_languages = transcript.available_languages.filter(
        (lang) => !lang.name.includes("auto-generated"),
      );

      // If no available languages after filtering, return no captions
      if (transcript.available_languages.length === 0) {
        return {
          id: videoId,
          title,
          channelName,
          uploadedAt,
          viewCount,
          captionLines: [],
          hasCaption: false,
          hasAutoGeneratedCaption: true,
        };
      }

      if (transcript.transcripts) {
        return {
          id: videoId,
          title,
          channelName,
          uploadedAt,
          viewCount,
          captionLines: transcript.transcripts,
          hasCaption: true,
          hasAutoGeneratedCaption: false,
        };
      }

      const secondTranscript = await this.getVideoTranscripts(
        videoId,
        transcript.available_languages[0].lang,
      );

      if (secondTranscript.transcripts) {
        return {
          id: videoId,
          title,
          channelName,
          uploadedAt,
          viewCount,
          captionLines: secondTranscript.transcripts,
          hasCaption: true,
          hasAutoGeneratedCaption: false,
        };
      }

      throw new UnprocessableEntityException(
        `Unsupported Youtube Video. videoId: ${videoId}`,
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
    try {
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
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  private async getVideoTranscripts(
    videoId: string,
    language: string,
  ): Promise<IYoutubeSearch.IYoutubeTranscriptResponse> {
    try {
      const res = await axios.get(
        `${ConnectorGlobal.env.SEARCH_API_HOST}/api/v1/search?engine=youtube_transcripts`,
        {
          params: {
            video_id: videoId,
            lang: language,
            transcript_type: "manual",
            engine: "youtube_transcripts",
            api_key: ConnectorGlobal.env.SEARCH_API_KEY,
            gl: "kr",
            hl: "ko",
          },
        },
      );
      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  private createYoutubeSearchQuery(
    andKeywords: string[],
    orKeywords: string[],
    notKeywords: string[],
  ): string {
    let query = andKeywords.join(" "); // andKeywords는 공백으로 연결

    if (orKeywords.length > 0) {
      query += ` (${orKeywords.join("|")})`;
    }

    if (notKeywords.length > 0) {
      query += ` -${notKeywords.join(" -")}`;
    }

    console.log("QUERY", query);
    return query;
  }
}
