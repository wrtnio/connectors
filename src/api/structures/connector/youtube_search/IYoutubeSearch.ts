import { Placeholder } from "@wrtn/decorators";
import { tags } from "typia";

export namespace IYoutubeSearch {
  export interface ISearchInput {
    /**
     * 검색 결과에 포함되어야 하는 키워드입니다.
     *
     * @title 반드시 포함되어야 하는 키워드
     */
    and_keywords: Array<string & Placeholder<"뤼튼">>;

    /**
     * 검색 결과에 포함되면 좋겠는 키워드입니다.
     *
     * @title 포함되면 좋겠는 키워드
     */
    or_keywords?: Array<string & Placeholder<"스튜디오">>;

    /**
     * 검색 결과에 포함되면 안되는 키워드입니다.
     *
     * @title 포함되면 안되는 키워드
     */
    not_keywords?: Array<string & Placeholder<"폭력">>;
  }
  /**
   * @title SerpAPI Params 정보
   */
  export interface ISerpApiParams {
    /**
     * SerpAPi에서 사용할 검색 엔진을 설정합니다.
     *
     * @title 검색 엔진
     */
    engine: string;

    /**
     * SerpAPI에서 사용할 API 키.
     *
     * @title API 키
     */
    api_key: string;

    /**
     * SerpAPI에서 사용할 검색어 쿼리.
     *
     * @title 검색어 쿼리
     */
    search_query: string & tags.MinLength<1>;
  }

  /**
   * @title serpapi를 통해 받아온 youtube video 검색 결과
   */
  export interface ISerpApiVideoResult {
    /**
     * 검색 결과 페이지 내에서의 위치.
     *
     * @title 페이지 내 위치
     */
    position_on_page: number & tags.Type<"uint32">;

    /**
     * 검색 결과로 나온 유튜브 영상의 제목.
     *
     * @title 유튜브 영상 제목
     */
    title: string;

    /**
     * 검색 결과로 나온 유튜브 영상의 링크.
     *
     * @title 유튜브 영상 링크
     */
    link: string & tags.Format<"uri">;

    /**
     * 검색 결과로 나온 유튜브 영상의 채널 정보.
     *
     * @title 유튜브 영상 채널 정보
     */
    channel: ISerpApiYoutubeSearchChannelResult;

    /**
     * 유튜브 영상이 발행된 날짜.
     * ex) 1 year ago
     *
     * @title 유튜브 영상 발행 날짜
     */
    published_date: string;

    /**
     * 유튜브 영상의 조회 수.
     *
     * @title 유튜브 영상 조회 수
     */
    views?: number & tags.Type<"uint32">;

    /**
     * 유튜브 영상의 길이.
     * ex) 6:30
     *
     * @title 유튜브 영상 길이
     */
    length: string;

    /**
     * 유튜브 영상의 설명.
     *
     * @title 유튜브 영상 설명
     */
    description?: string;

    /**
     * 유튜브 영상의 추가 정보.
     * ex) 4K, CC
     *
     * @title 비디오 결과에 대한 추가 정보
     */
    extensions?: string[];

    /**
     * 유튜브 영상의 썸네일 이미지 정보.
     *
     * @title 유튜브 영상 썸네일 이미지 정보
     */
    thumbnail: ISerpApiYoutubeSearchThumbnailResult;
  }

  /**
   * @title serpapi를 통해 받아온 youtube video 검색 결과 중 channel 정보
   */
  export interface ISerpApiYoutubeSearchChannelResult {
    /**
     * 검색 결과로 나온 유튜브 채널의 이름.
     *
     * @title 유튜브 채널 명
     */
    name: string;

    /**
     * 검색 결과로 나온 유튜브 채널의 링크.
     *
     * @title 유튜브 채널 링크
     */
    link: string & tags.Format<"uri">;

    /**
     * 검색 결과로 나온 유튜브 채널의 썸네일 이미지.
     *
     * @title 유튜브 채널 썸네일 이미지
     */
    thumbnail: string & tags.Format<"uri">;
  }

  /**
   * @title serpapi를 통해 받아온 youtube video 검색 결과 중 thumbnail 정보
   */
  export interface ISerpApiYoutubeSearchThumbnailResult {
    /**
     * 유튜브 영상 썸네일 정적 이미지.
     *
     * @title 유튜브 영상 썸네일 이미지 (정적)
     */
    static: string & tags.Format<"uri">;

    /**
     * 비디오 재생 시간에 따라 변화하는 애니메이션 형태의 이미지.
     *
     * @title 유튜브 영상 썸네일 이미지 (동적)
     */
    rich: string & tags.Format<"uri">;
  }
}
