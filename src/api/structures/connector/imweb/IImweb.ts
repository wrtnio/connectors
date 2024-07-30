import { tags } from "typia";

export namespace IImweb {
  export interface ResponseForm {
    /**
     * 응답에 대한 요약 메시지.
     */
    msg: tags.Constant<"SUCCESS", { title: "성공" }>;

    /**
     * @title status code.
     */
    code: 200;

    /**
     * @title 해당 키에서 사용된 요청 횟수.
     */
    request_count: number;

    /**
     * @title 현재 사용 중인 API의 버전.
     */
    version: `${number}`;
  }

  /**
   * @title 상품 조회 요청 DTO.
   */
  export interface IGetProductInput extends IImweb.Credential {
    /**
     * @title 특정 상태.
     *
     * 특정 상태의 상품만 조회하고자 할 때 사용한다.
     */
    prod_status?: IImweb.ProductStatus;

    /**
     * @title 상품 카테고리 코드.
     */
    category?: string;
  }

  /**
   * @title 상품 조회 응답 DTO.
   */
  export interface IGetProductOutput extends ResponseForm {
    /**
     * @title 상품 정보.
     */
    data: {
      /**
       * @title 상품의 배열.
       */
      list: IImweb.Product[];
    };
  }

  export interface Product {
    /**
     * @title 상품번호.
     */
    no: number;

    /**
     * @title 상품 상태.
     */
    prod_status: IImweb.ProductStatus;

    /**
     * @title 카테고리 코드 목록.
     */
    categories: string[];

    /**
     * @title 자체 상품코드.
     */
    custom_prod_code: string;

    /**
     * @title 상품명.
     */
    name: string;

    /**
     * @title 이미지 파일 코드.
     */
    images: string[];

    /**
     * @title 이미지 파일 URL.
     */
    image_url: (string & tags.Format<"url">)[];

    /**
     * @title 상세설명.
     */
    content: string;

    /**
     * @title 요약 설명.
     */
    simple_content: string;

    /**
     * @title 모바일 상세설명 사용 유무.
     */
    use_mobile_prod_content: boolean;

    /**
     * @title 모바일 상세 설명.
     */
    mobile_content: string;

    /**
     * @title 판매 방식 설정.
     */
    prod_type:
      | tags.Constant<"normal", { title: "일반 상품" }>
      | tags.Constant<"digital", { title: "디지털 상품" }>
      | tags.Constant<"subscribe", { title: "회원그룹 이용권" }>;

    /**
     * @title 판매 방식 데이터.
     */
    prod_type_data: (
      | IImweb.ProdTypeData.DigitalData
      | IImweb.ProdTypeData.SubscribeData
    )[];

    /**
     * @title 판매기간 설정 여부.
     */
    use_pre_sale: boolean;

    /**
     * @title 판매기간 시작일(Timestamp).
     */
    pre_sale_start_date: number;

    /**
     * @title 판매기간 종료일(Timestamp).
     */
    pre_sale_end_date: number;

    /**
     * @title 상품가격.
     */
    price: number;

    /**
     * @title 할인 이전 가격.
     */
    price_org: number;

    /**
     * @title 세금 포함 여부.
     */
    price_tax: boolean;

    /**
     * @title 가격 없음 여부.
     */
    price_none: boolean;

    /**
     * @title 적립금 설정.
     */
    point: IImweb.PointConfigData[];

    /**
     * @title 할인 사용 설정.
     */
    product_discount_options: (
      | tags.Constant<"coupon", { title: "쿠폰" }>
      | tags.Constant<"point", { title: "적립금" }>
      | tags.Constant<"shopping_group_dc", { title: "쇼핑등급 할인" }>
    )[];

    /**
     * @title 상품 무게.
     */
    weight: number & tags.Type<"float">;

    /**
     * @title 상품 재고 정보.
     */
    stock: IImweb.ProdStockConfigData[];

    /**
     * @title 원산지.
     */
    origin: string;

    /**
     * @title 제조사.
     */
    maker: string;

    /**
     * @title 브랜드.
     */
    brand: string;

    /**
     * @title 뱃지 정보.
     */
    badge: IImweb.ProdBadgeData[];

    /**
     * @title SEO 관련 정보.
     */
    seo: IImweb.ProdSeoData[];

    /**
     * @title 외부 연동용 정보.
     */
    sync: IImweb.ProdSyncData[];

    /**
     * @title 기타설정.
     */
    etc: IImweb.ProdEtcData[];

    /**
     * @title 상품정보제공고시.
     *
     * 타입이 명시되어 있질 않아 `any`의 배열로만 표기.
     */
    prodinfo: any[];

    /**
     * @title 상품의 옵션 유무.
     */
    is_exist_options:
      | tags.Constant<"Y", { title: "옵션이 존재하는 경우" }>
      | tags.Constant<"N", { title: "단일 상품인 경우" }>;

    /**
     * @title 상품의 조합형 옵션 여부.
     */
    is_mix:
      | tags.Constant<"Y", { title: "조합형 옵션" }>
      | tags.Constant<"N", { title: "단일 옵션" }>;

    /**
     * @title 상품 추가시간 Timestamp.
     */
    add_time: number;

    /**
     * @title 상품 최근 수정시간 Timestamp.
     */
    edit_time: number;
  }

  export type ProductStatus =
    | tags.Constant<"sale", { title: "판매중" }>
    | tags.Constant<"soldout", { title: "품절" }>
    | tags.Constant<"nosale", { title: "숨김" }>;

  export namespace ProdTypeData {
    export interface DigitalData {
      /**
       * @title 다운로드 한도 설정.
       */
      use_limit: boolean;

      /**
       * @title 기간 제한.
       */
      period: number & tags.Type<"int64">;

      /**
       * @title 횟수 제한.
       */
      maximum: number & tags.Type<"int64">;
    }

    export interface SubscribeData {
      /**
       * @title 대상 그룹 코드.
       */
      group_code: string;

      /**
       * @title 그룹 유지 기간(일)
       */
      period: number & tags.Type<"int64">;
    }
  }

  /**
   * @title 적립금 설정 데이터 구조 정의.
   */
  export interface PointConfigData {
    /**
     * @title 적립금 설정 타입.
     */
    type:
      | tags.Constant<"common", { title: "기본 설정을 따름." }>
      | tags.Constant<"individual", { title: "개별 적립금 설정" }>;

    /**
     * @title 적립금 적립 단위.
     */
    value_type:
      | tags.Constant<"percent", { title: "퍼센트" }>
      | tags.Constant<"price", { title: "통화 단위" }>;

    /**
     * @title 적립금 값
     *
     * `value_type`이 percent인 경우 백분율로 계산한다.
     */
    value: `${number}`;
  }

  /**
   * @title 상품 재고 정보 데이터 구조 정의
   */
  export interface ProdStockConfigData {
    /**
     * @title 재고 사용 여부.
     */
    stock_use: boolean;

    /**
     * @title 재고 소진 후 주문 가능 여부.
     */
    stock_unlimit: boolean;

    /**
     * @title 상품 재고 수량.
     */
    stock_no_option: number & tags.Type<"int64">;

    /**
     * @title 상품 재고 번호(SKU)
     */
    sku_no_option: number & tags.Type<"int64">;
  }

  /**
   * @title 뱃지 정보 데이터 구조 정의
   */
  export interface ProdBadgeData {
    /**
     * @title 신상품 여부.
     */
    new: boolean;

    /**
     * @title 베스트 여부.
     */
    best: boolean;

    /**
     * @title MD 추천 여부.
     */
    md: boolean;

    /**
     * @title 주문폭주 여부.
     */
    hot: boolean;
  }

  /**
   * @title SEO 관련 정보 데이터 구조 정의
   */
  export interface ProdSeoData {
    /**
     * @title SEO 제목.
     */
    seo_title: string;

    /**
     * @title SEO 설명.
     */
    seo_description: string;

    /**
     * @title SEO 검색엔진 접근 제외 유무.
     */
    seo_access_bot: boolean;
  }

  /**
   * @title 외부 연동용 정보 데이터 구조 정의
   */
  export interface ProdSyncData {
    /**
     * @title 네이버, 카카오 쇼핑 노출용 상품명.
     */
    pay_product_name: string;

    /**
     * @title 네이버 쇼핑 이벤트 문구.
     */
    event_words: string;

    /**
     * @title 네이버 쇼핑 카테고리 ID.
     */
    naver_category: string;

    /**
     * @title 네이버 쇼핑 판매 방식.
     */
    product_flag:
      | tags.Constant<"소매", { title: "소매" }>
      | tags.Constant<"도매", { title: "도매" }>
      | tags.Constant<"렌탈", { title: "렌탈" }>
      | tags.Constant<"대여", { title: "대여" }>
      | tags.Constant<"할부", { title: "할부" }>
      | tags.Constant<"예약판매", { title: "예약판매" }>
      | tags.Constant<"구매대행", { title: "구매대행" }>;

    /**
     * @title 네이버 쇼핑 상품상태.
     */
    product_condition:
      | tags.Constant<"신상품", { title: "신상품" }>
      | tags.Constant<"중고", { title: "중고" }>
      | tags.Constant<"리퍼", { title: "리퍼" }>
      | tags.Constant<"전시", { title: "전시" }>
      | tags.Constant<"반품", { title: "반품" }>
      | tags.Constant<"스크래치", { title: "스크래치" }>;

    /**
     * @title 해외구매대행 여부.
     */
    import_flag: boolean;

    /**
     * @title 병행 수입 여부.
     */
    parallel_import: boolean;

    /**
     * @title 도서공연비 소득공제.
     */
    is_culture_benefit: boolean;

    /**
     * @title 주문제작 여부.
     */
    order_made: boolean;
  }

  /**
   * @title 기타 설정 데이터 구조 정의
   */
  export interface ProdEtcData {
    /**
     * @title 최소 구매 수량.
     */
    minimum_purchase_quantity: number & tags.Type<"int64">;

    /**
     * @title 1회 구매 시 최대 수량.
     */
    maximum_purchase_quantity: number & tags.Type<"int64">;

    /**
     * @title 1인 구매 시 최대 수량.
     */
    member_maximum_purchase_quantity: number & tags.Type<"int64">;

    /**
     * @title 0원 선택옵션 구매 시 최대 구매수량 제한 타입.
     */
    optional_limit_type:
      | tags.Constant<"relative", { title: "본상품 구매 수량만큼 구매 가능" }>
      | tags.Constant<"limit", { title: "최대 구매 수량 제한" }>
      | tags.Constant<"unique", { title: "1개만 구매 가능" }>;

    /**
     * @title 0원 선택옵션 구매 시 최대 구매수량.
     *
     * 최대 구매 수량 제한.
     */
    optional_limit: number & tags.Type<"int64">;

    use_unipass_number:
      | tags.Constant<
          "default",
          {
            title: "기본 방법을 따름";
            description: "쇼핑 환경 설정마다 다를 수 있다.";
          }
        >
      | tags.Constant<"Y", { title: "사용" }>
      | tags.Constant<"N", { title: "사용안함" }>;

    /**
     * @title 미성년자 구매 제한.
     */
    adult: boolean;
  }

  /**
   * @title Imweb Access Token을 발급 받기 위한 요청 DTO.
   *
   * Rest API를 사용하기 위해 먼저 API Key 와 Secret Key를 발급 받아야 한다.
   *
   * 해당 키는 사이트 단위로 생성된다.
   */
  export interface Credential {
    /**
     * @title api key.
     */
    key: string;

    /**
     * @title api secret.
     */
    secret: string;
  }

  /**
   * @title 아임웹 토큰 발급 요청 응답 DTO.
   */
  export interface IGetAccessTokenOutput {
    /**
     * @title response message.
     */
    msg: "SUCCESS";

    /**
     * @title IMWEB custom code.
     */
    code: tags.Constant<200, { title: "성공을 의미하는 값" }>;

    /**
     * @title HTTP status code.
     */
    http_code: tags.Constant<200, { title: "HTTP STATUS CODE 200" }>;

    /**
     * @title access token.
     */
    access_token: string;
  }
}
