import { Placeholder } from "@wrtnio/decorators";
import { tags } from "typia";

export namespace IKakaoMap {
  /**
   * @title 검색 조건
   */
  export interface SearchByKeywordInput {
    /**
     * @title 검색 키워드
     */
    query: string & Placeholder<"종로구 맛집">;

    /**
     * @title 결과 페이지 번호
     */
    page?: number &
      tags.Type<"int32"> &
      tags.Minimum<1> &
      tags.Maximum<45> &
      tags.Default<1>;

    /**
     * @title 페이지 당 문서 수
     */
    size?: number &
      tags.Type<"int32"> &
      tags.Minimum<1> &
      tags.Maximum<15> &
      tags.Default<15>;
  }

  /**
   * @title 검색 결과
   */
  export interface SearchByKeywordOutput {
    /**
     * @title 검색 결과 목록
     */
    documents: Document[];

    /**
     * @title 메타 정보
     */
    meta: Meta;
  }

  /**
   * @title 검색 결과
   */
  export interface Document {
    /**
     * @title 장소 ID
     */
    id: string;

    /**
     * @title 장소명, 업체명
     */
    place_name: string;

    /**
     * @title 카테고리 이름
     */
    category_name: string;

    /**
     * @title 중요 카테고리만 그룹핑한 카테고리 그룹 코드
     */
    category_group_code: CategoryGroupCode;

    /**
     * @title 중요 카테고리만 그룹핑한 카테고리 그룹명
     */
    category_group_name: CategoryGroupName;

    /**
     * @title 전화번호
     */
    phone: string;

    /**
     * @title 전체 지번 주소
     */
    address_name: string;

    /**
     * @title 전체 도로명 주소
     */
    road_address_name: string;

    /**
     * @title X 좌표값
     * @description 경위도인 경우 longitude (경도)
     */
    x: string;

    /**
     * @title Y 좌표값
     * @description 경위도인 경우 latitude(위도)
     */
    y: string;

    /**
     * @title 장소 상세페이지 URL
     */
    place_url: string & tags.Format<"uri">;

    /**
     * @title 중심좌표까지의 거리
     * @description (단, x,y 파라미터를 준 경우에만 존재) 단위 meter
     */
    distance: string;
  }

  /**
   * @title 메타 정보
   */
  export interface Meta {
    /**
     * @title 검색어에 검색된 문서 수
     */
    total_count: number & tags.Type<"int32">;

    /**
     * @title 한 번에 표시되는 문서 수
     */
    pageable_count: number & tags.Type<"int32"> & tags.Maximum<45>;

    /**
     * @title 현재 페이지가 마지막 페이지인지 여부
     * @description 값이 false면 다음 요청 시 page 값을 증가시켜 다음 페이지 요청 가능
     */
    is_end: boolean;

    same_name?: {
      /**
       * @title 질의어에서 지역 정보를 제외한 키워드
       * @description '중앙로 맛집'을 검색한 경우 '맛집'에 해당하는 부분을 추출한 값
       */
      keyword: string;

      /**
       * @title 질의어에서 인식된 지역의 리스트
       * @description '중앙로 맛집'을 검색한 경우 '중앙로'에 해당하는 부분을 추출한 값
       */
      region: string[];

      /**
       * @title 검색에 활용된 지역 정보
       */
      selected_region: string;
    };
  }

  /**
   * @title 카테고리 그룹 코드
   */
  export type CategoryGroupCode =
    | tags.Constant<"MT1", { title: "대형마트" }>
    | tags.Constant<"CS2", { title: "편의점" }>
    | tags.Constant<"PS3", { title: "어린이집, 유치원" }>
    | tags.Constant<"SC4", { title: "학교" }>
    | tags.Constant<"AC5", { title: "학원" }>
    | tags.Constant<"PK6", { title: "주차장" }>
    | tags.Constant<"OL7", { title: "주유소, 충전소" }>
    | tags.Constant<"SW8", { title: "지하철역" }>
    | tags.Constant<"BK9", { title: "은행" }>
    | tags.Constant<"CT1", { title: "문화시설" }>
    | tags.Constant<"AG2", { title: "중개업소" }>
    | tags.Constant<"PO3", { title: "공공기관" }>
    | tags.Constant<"AT4", { title: "관광명소" }>
    | tags.Constant<"AD5", { title: "숙박" }>
    | tags.Constant<"FD6", { title: "음식점" }>
    | tags.Constant<"CE7", { title: "카페" }>
    | tags.Constant<"HP8", { title: "병원" }>
    | tags.Constant<"PM9", { title: "약국" }>
    | tags.Constant<"", { title: "알수 없음" }>;

  /**
   * @title 카테고리 그룹 이름
   */
  export type CategoryGroupName =
    | tags.Constant<"대형마트", { title: "대형마트" }>
    | tags.Constant<"편의점", { title: "편의점" }>
    | tags.Constant<"어린이집, 유치원", { title: "어린이집, 유치원" }>
    | tags.Constant<"학교", { title: "학교" }>
    | tags.Constant<"학원", { title: "학원" }>
    | tags.Constant<"주차장", { title: "주차장" }>
    | tags.Constant<"주유소, 충전소", { title: "주유소, 충전소" }>
    | tags.Constant<"지하철역", { title: "지하철역" }>
    | tags.Constant<"은행", { title: "은행" }>
    | tags.Constant<"문화시설", { title: "문화시설" }>
    | tags.Constant<"중개업소", { title: "중개업소" }>
    | tags.Constant<"공공기관", { title: "공공기관" }>
    | tags.Constant<"관광명소", { title: "관광명소" }>
    | tags.Constant<"숙박", { title: "숙박" }>
    | tags.Constant<"음식점", { title: "음식점" }>
    | tags.Constant<"카페", { title: "카페" }>
    | tags.Constant<"병원", { title: "병원" }>
    | tags.Constant<"약국", { title: "약국" }>
    | tags.Constant<"", { title: "알수 없음" }>;
}
