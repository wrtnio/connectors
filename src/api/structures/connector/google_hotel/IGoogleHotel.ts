import { long } from "aws-sdk/clients/cloudfront";
import { tags } from "typia";

export namespace IGoogleHotel {
  /**
   * @title 숙소 검색 조건
   */
  export interface IRequest {
    /**
     * 검색할 키워드를 입력하세요.
     *
     * @title 검색어
     */
    keyword: string;

    /**
     * 체크인 날짜를 설정하세요.
     *
     * @title 체크인 날짜
     */
    check_in_date: string & tags.Format<"date">;

    /**
     * 체크아웃 날짜를 설정하세요.
     *
     * @title 체크아웃 날짜
     */
    check_out_date: string & tags.Format<"date">;

    /**
     * 투숙하는 성인 인원수를 설정하세요. 기본값은 2입니다.
     *
     * @title 성인 인원
     */
    adults?: number & tags.Type<"int32"> & tags.Default<2>;

    /**
     * 투숙하는 아동 인원수를 설정하세요. 기본값은 0입니다.
     *
     * @title 아동 인원
     */
    children?: number & tags.Type<"int32"> & tags.Default<0>;

    /**
     * 원하는 정렬 기준을 선택해주세요.
     *
     * @title 정렬 기준
     */
    sort_by?:
      | tags.Constant<"3", { title: "낮은 가격 순" }>
      | tags.Constant<"8", { title: "평점 높은 순" }>
      | tags.Constant<"13", { title: "리뷰 많은 순" }>;

    /**
     * 가격 범위의 최소 가격을 설정해주세요.
     *
     * @title 최소 가격
     */
    min_price?: number & tags.Type<"int32">;

    /**
     * 가격 범위의 최대 가격을 설정해주세요.
     *
     * @title 최대 가격
     */
    max_price?: number & tags.Type<"int32">;

    /**
     * 선택한 평점 이상의 숙소만 검색합니다.
     *
     * @title 평점
     */
    rating?:
      | tags.Constant<"7", { title: "평점 3.5 이상" }>
      | tags.Constant<"8", { title: "평점 4.0 이상" }>
      | tags.Constant<"9", { title: "평점 4.5 이상" }>;

    type?: Array<
      string &
        (
          | tags.Constant<"12", { title: "비치 호텔" }>
          | tags.Constant<"13", { title: "부티크 호텔" }>
          | tags.Constant<"14", { title: "호스텔" }>
          | tags.Constant<"15", { title: "여관" }>
          | tags.Constant<"16", { title: "모텔" }>
          | tags.Constant<"17", { title: "리조트" }>
          | tags.Constant<"18", { title: "스파 호텔" }>
          | tags.Constant<"19", { title: "아침 식사를 제공하는 숙소(B&B)" }>
          | tags.Constant<"20", { title: "기타" }>
          | tags.Constant<"21", { title: "아파트 호텔" }>
          | tags.Constant<"22", { title: "민박" }>
          | tags.Constant<"23", { title: "일본식 비즈니스 호텔" }>
          | tags.Constant<"24", { title: "료칸" }>
        )
    >;

    /**
     * 호텔 등급을 선택해주세요.
     *
     * @title 호텔 등급
     */
    hotel_class?: Array<
      string &
        (
          | tags.Constant<"1", { title: "1성급" }>
          | tags.Constant<"2", { title: "2성급" }>
          | tags.Constant<"3", { title: "3성급" }>
          | tags.Constant<"4", { title: "4성급" }>
          | tags.Constant<"5", { title: "5성급" }>
        )
    >;

    /**
     * 무료 취소 가능한 숙소만 검색합니다.
     *
     * @title 무료취소 가능 여부
     */
    free_cancellation?: boolean & tags.Default<false>;

    /**
     * 검색 결과의 개수를 설정합니다.
     *
     * @title 검색 결과 개수
     */
    max_results: number & tags.Type<"int32">;
  }

  /**
   * @title 숙소 검색 결과
   */
  export interface IResponse {
    name: string;
    description: string;
    check_in_time: string;
    check_out_time: string;
    price: string;
    nearby_place: INearbyPlace[];
    hotel_class: `${number}성급`;
    thumbnails: Array<
      string & tags.Format<"uri"> & tags.ContentMediaType<"image/*">
    >;
    rating: `${number}점`;
    review_count: `${number}개`;
    amenities: string[];
  }

  interface INearbyPlace {
    name: string;
    transportation: {
      type: string;
      duration: string;
    };
  }
}
