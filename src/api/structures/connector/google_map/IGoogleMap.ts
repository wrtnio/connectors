import { JMESPath, Placeholder, Prerequisite } from "@wrtnio/decorators";
import { tags } from "typia";
import { ContentMediaType } from "typia/lib/tags";

export namespace IGoogleMap {
  /**
   * @title 구글 맵 맛집 검색을 위한 정보
   */
  export interface IRequest {
    /**
     * 검색어를 입력해주세요
     *
     * @title 검색어
     */
    keyword: string & Placeholder<"강남역 맛집">;
  }

  /**
   * @title 구글 맵 맛집 검색 결과
   */
  export interface IResponse {
    /**
     * 맛집 이름입니다.
     *
     * @title 이름
     */
    title: string;

    /**
     * 맛집 고유 id입니다.
     *
     * 리뷰를 검색하기 위해 필요한 정보입니다.
     *
     * @title 고유 id
     */
    place_id: string;

    /**
     * 맛집 좌표입니다.
     *
     * @title 좌표
     */
    gps_coordinate: {
      /**
       * 맛집 좌표상 위도입니다.
       *
       * @title 위도
       */
      latitude: number;

      /**
       * 맛집 좌표상 경도입니다.
       *
       * @title 경도
       */
      longitude: number;
    };

    /**
     * 맛집 평점입니다.
     *
     * @title 평점
     */
    rating?: number;

    /**
     * 맛집 리뷰 수 입니다.
     *
     * @title 리뷰 수
     */
    reviews?: number;

    /**
     * 맛집 주소 입니다.
     *
     * @title 주소
     */
    address: string;

    /**
     * 맛집이 현재 운영중인지에 대한 정보입니다.
     *
     * @title 운영 정보
     */
    open_state?: string;

    /**
     * 맛집 운영 시간 정보입니다.
     *
     * @title 운영 시간 정보
     */
    operating_hours?: { [key: string]: string };

    /**
     * 맛집 전화번호입니다.
     *
     * @title 전화번호
     */
    phone_number?: string;

    /**
     * 맛집에서 제공하는 서비스 옵션입니다.
     *
     * @title 서비스 옵션
     */
    service_options?: { [key: string]: boolean };

    /**
     * 맛집 유저 리뷰 입니다.
     *
     * @title 유저 리뷰
     */
    user_review?: string;

    /**
     * 맛집 썸네일 이미지 입니다.
     *
     * @title 이미지
     */
    thumbnail: string & tags.Format<"uri"> & ContentMediaType<"image/*">;
  }

  export interface IReviewRequest {
    place_id: string &
      Prerequisite<{
        method: "post";
        path: "/connector/google-map/search";
        jmesPath: JMESPath<IResponse, "[].{value:place_id, label:place_id}">;
      }>;
  }

  /**
   * @title 리뷰 조회 결과
   */
  export interface IReviewResponse {
    /**
     * 리뷰 작성자 이름입니다.
     *
     * @title 작성자 이름
     */
    username: string;

    /**
     * 리뷰 평점입니다.
     *
     * @title 리뷰 평점
     */
    rating: number;

    /**
     * 리뷰 내용입니다.
     *
     * @title 리뷰 내용
     */
    description: string;

    /**
     * 리뷰 링크입니다.
     *
     * @title 리뷰 링크
     */
    link: string & tags.Format<"uri">;

    /**
     * 리뷰에 등록된 이미지입니다.
     *
     * @title 리뷰 이미지
     */
    images: Array<string & tags.Format<"uri"> & ContentMediaType<"image/*">>;

    /**
     * 리뷰가 작성된 날짜입니다.
     *
     * @title 리뷰 날짜
     */
    date: string;
  }
}
