import type { tags } from "typia";
import { ICommon } from "../common/ISecretValue";
import type { Prerequisite } from "@wrtn/decorators";

export namespace IGoogleAds {
  export interface IGenerateKeywordIdeaInput {
    /**
     * @title 광고 키워드 아이디어 생성에 참조할 URL.
     */
    url: string;

    /**
     * @title 한 페이지 당 결과의 수
     */
    pageSize?: number &
      tags.Type<"int32"> &
      tags.Minimum<1> &
      tags.Maximum<10000>;

    /**
     * @title 다음 페이지 토큰
     * @description 이전 요청으로부터 받을 수 있는 페이지 토큰을 사용한다.
     */
    pageToken?: string &
      Prerequisite<{
        method: "post";
        path: "connector/google-ads/generateKeywordIdeas/url";
        array: "response.keywordIdeas";
        label: "elem.text";
        value: "elem.text";
      }>;
  }

  export interface IGenerateKeywordIdeaOutput {
    /**
     * @title 결과 목록
     */
    results: GeneratedKeyword[];

    /**
     * @title 전체 결과 수
     */
    totalSize: `${number}`;

    /**
     * @title 다음 페이지를 조회할 때 사용할 수 있는 토큰
     * @description 다음 페이지가 없을 경우에는 조회 불가능
     */
    nextPageToken?: string | null;
  }

  export interface GeneratedKeyword {
    /**
     * @title 키워드에 대한 지표
     */
    keywordIdeaMetrics: KeywordIdeaMetrics;

    /**
     * @title 키워드
     */
    text: string;
  }

  export interface KeywordIdeaMetrics {
    /**
     * @title 검색어에 대한 경쟁 수준
     */
    competition:
      | tags.Constant<
          "LOW",
          { title: "낮은 경쟁률 경쟁 지수 범위는 [0, 33]입니다." }
        >
      | tags.Constant<
          "MEDIUM",
          {
            title: "경쟁이 보통입니다. 이에 대한 경쟁 지수의 범위는 [34, 66]입니다.";
          }
        >
      | tags.Constant<
          "HIGH",
          { title: "경쟁이 치열합니다. 경쟁 지수 범위는 [67, 100]입니다." }
        >;

    /**
     * @title 지난 12개월 동안 이 검색어가 실행된 대략적인 검색 횟수
     */
    monthlySearchVolumes: MonthlySearchVolumes[];

    /**
     * @title 지난 12개월 간의 이 검색어에 대한 대략적인 월별 검색 수
     */
    avgMonthlySearches: `${number & tags.Type<"int64"> & tags.Minimum<0>}`;

    /**
     * @title 경쟁 지수
     */
    competitionIndex: `${number &
      tags.Type<"int64"> &
      tags.Minimum<0> &
      tags.Maximum<100>}`;

    /**
     * @title 키워드의 마이크로 단위 페이지 상단 입찰가 하위 범위 (20번째 백분위수)
     */
    lowTopOfPageBidMicros?: `${number & tags.Type<"int64"> & tags.Minimum<0>}`;

    /**
     * @title 키워드의 상세 페이지 상단 입찰가 (80번째 백분위수)
     */
    highTopOfPageBidMicros?: `${number & tags.Type<"int64"> & tags.Minimum<0>}`;
  }

  export interface MonthlySearchVolumes {
    /**
     * @title 검색량이 발생한 달
     */
    month: Month;

    /**
     * @title 검색량이 발생한 연도
     */
    year: string;

    /**
     * @title 해당 달의 대략적인 검색 수
     * @description null 값은 해당 월에 대한 검색량을 확인할 수 없음을 나타냅니다.
     */
    monthlySearches: `${number & tags.Type<"int64"> & tags.Minimum<0>}` | null;
  }

  export type Month =
    | tags.Constant<"JANUARY", { title: "January" }>
    | tags.Constant<"FEBRUARY", { title: "February" }>
    | tags.Constant<"MARCH", { title: "March" }>
    | tags.Constant<"APRIL", { title: "April" }>
    | tags.Constant<"MAY", { title: "May" }>
    | tags.Constant<"JUNE", { title: "June" }>
    | tags.Constant<"JULY", { title: "July" }>
    | tags.Constant<"AUGUST", { title: "August" }>
    | tags.Constant<"SEPTEMBER", { title: "September" }>
    | tags.Constant<"OCTOBER", { title: "October" }>
    | tags.Constant<"NOVEMBER", { title: "November" }>
    | tags.Constant<"DECEMBER", { title: "December" }>;
}
