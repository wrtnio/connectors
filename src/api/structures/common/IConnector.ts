import { Placeholder } from "@wrtnio/decorators";
import { tags } from "typia";

export namespace IConnector {
  /**
   * @title 검색 결과
   */
  export interface ISearchOutput {
    /**
     * 검색 결과에 대한 산출물 정보를 담고 있습니다.
     *
     * @title 산출물 정보
     */
    references: IReferenceContent[];
  }

  export interface IReferenceContent {
    /**
     * 산출물의 제목입니다.
     *
     * @title 제목
     */
    title: string;

    /**
     * 비디오, 이미지, 뉴스기사, 논문..
     *
     * @title 산출물 타입
     */
    type: ReferenceType;

    /**
     * 유튜브, 페이스북, 인스타그램, 구글 검색, arxiv, 구글 뉴스
     *
     * @title 산출물의 출처
     */
    source: ContentProvider;

    /**
     * 산출물의 URL 주소입니다.
     *
     * @title URL 주소
     */
    url: string & tags.Format<"uri">;

    /**
     * 산출물의 내용입니다.
     *
     * @title 산출물 내용
     */
    contents?: string;

    /**
     * 산출물의 이미지 URL 주소입니다.
     *
     * @title 산출물 이미지 url
     */
    image?: string & tags.Format<"uri">;

    /**
     * 산출물의 통계 자료 정보입니다.
     *
     * @title 산출물 통계 자료 정보
     */
    statistics?: Partial<Record<MetricType, number & tags.Type<"int32">>>;
  }

  /**
   * 비디오, 이미지, 뉴스기사, 논문..
   *
   * @title Connector 산출물 타입
   */
  export type ReferenceType =
    | "video"
    | "image"
    | "news_article"
    | "research_paper";

  /**
   * 산출물의 출처입니다.
   *
   * @title Connector 산출물 출처
   */
  export type ContentProvider =
    | "youtube"
    | "facebook"
    | "instagram"
    | "google_search"
    | "arxiv"
    | "google_news";

  /**
   * 조회수, 좋아요 수, 랭킹
   *
   * @title 통계 자료 타입
   */
  export type MetricType = "view_count" | "like_count" | "rank";

  /**
   * 검색 조건을 입력합니다.
   *
   * @title 검색 조건
   */
  export interface ISearchInput {
    /**
     * 몇 개의 검색 결과를 가져올지 설정합니다.
     *
     * @title 검색 결과 개수
     */
    num_results?: number & tags.Type<"uint32"> & Placeholder<"10">;

    /**
     * 검색 결과 시작 날짜를 설정합니다.
     *
     * @title 검색 결과 시작 날짜
     */
    from_date?: string & tags.Format<"date">;

    /**
     * 검색 결과 종료 날짜를 설정합니다.
     *
     * @title 검색 결과 종료 날짜
     */
    to_date?: string & tags.Format<"date">;

    /**
     * 검색 결과에 포함되어야 하는 키워드입니다.
     *
     * @title 반드시 포함되어야 하는 키워드
     */
    and_keywords: Array<string & Placeholder<"biology">>;

    /**
     * 검색 결과에 포함되면 좋겠는 키워드입니다.
     *
     * @title 포함되면 좋겠는 키워드
     */
    or_keywords?: Array<string & Placeholder<"ecosystem">>;

    /**
     * 검색 결과에 포함되면 안되는 키워드입니다.
     *
     * @title 포함되면 안되는 키워드
     */
    not_keywords?: Array<string & Placeholder<"pollution">>;
  }
}
