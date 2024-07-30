import { tags } from "typia";
import { JMESPath, Prerequisite } from "@wrtnio/decorators";
import { IAirportInformation } from "../airport_information/IAirportInformation";

export namespace IGoogleFlight {
  /**
   * @title 항공권 검색에 필요한 정보
   */
  export interface IRequest {
    /**
     * 출발지 공항의 코드를 입력해주세요.
     *
     * @title 출발지
     */
    departure_id: string &
      Prerequisite<{
        method: "post";
        path: "/connector/airport-information/search";
        jmesPath: JMESPath<
          IAirportInformation.IResponse,
          "[].{value:airport_code, label: [country_name, city_name, airport_name, airport_code].join('-', @)}"
        >;
      }>;

    /**
     * 도착지 공항의 코드를 입력해주세요.
     *
     * @title 도착지
     */
    arrival_id: string &
      Prerequisite<{
        method: "post";
        path: "/connector/airport-information/search";
        jmesPath: JMESPath<
          IAirportInformation.IResponse,
          "[].{value:airport_code, label: [country_name, city_name, airport_name, airport_code].join('-', @)}"
        >;
      }>;

    /**
     * 왕복 또는 편도 여부를 선택해주세요.
     *
     * 가능한 값으로 1, 2가 있습니다.
     *
     * @title 왕복 또는 편도 여부
     */
    type:
      | tags.Constant<"1", { title: "왕복" }>
      | tags.Constant<"2", { title: "편도" }>;

    /**
     * 가는 날짜를 입력해주세요.
     *
     * @title 가는 날짜
     */
    outbound_date: string & tags.Format<"date">;

    /**
     * 오는 날짜를 입력해주세요.
     *
     * @title 오는 날짜
     */
    return_date?: string & tags.Format<"date">;

    /**
     * 좌석 등급을 선택해주세요.
     *
     * 가능한 값으로 1, 2, 3, 4가 있습니다.
     *
     * @title 좌석 등급
     */
    travel_class:
      | tags.Constant<"1", { title: "이코노미" }>
      | tags.Constant<"2", { title: "프리미엄 이코노미" }>
      | tags.Constant<"3", { title: "비즈니스" }>
      | tags.Constant<"4", { title: "퍼스트" }>;

    /**
     * 성인 인원수를 입력해주세요.
     *
     * @title 성인 인원
     */
    adults: number & tags.Type<"int32">;

    /**
     * 아동 인원수를 입력해주세요.
     *
     * @title 아동 인원
     */
    children?: number & tags.Type<"int32">;

    /**
     * 직항 여부를 선택해주세요.
     *
     * 가능한 값으로 0, 1, 2, 3이 있습니다.
     *
     * @title 직항 여부
     */
    stop:
      | tags.Constant<"0", { title: "상관 없음" }>
      | tags.Constant<"1", { title: "직항" }>
      | tags.Constant<"2", { title: "1번 경유" }>
      | tags.Constant<"3", { title: "2번 이상 경유" }>;

    /**
     * 항공권의 최대 가격을 입력해주세요.
     *
     * @title 최대 가격
     */
    max_price?: number & tags.Type<"int32">;
  }

  export interface IRequestArrival extends IRequest {
    /**
     * 돌아오는 항공편 검색을 위한 토큰입니다.
     *
     * @title 돌아오는 항공편 검색 토큰
     */
    departure_token: string &
      Prerequisite<{
        method: "post";
        path: "/connector/google-flight/departure";
        jmesPath: JMESPath<
          IGoogleFlight.IResponse,
          "[].{value:departure_token, label:'도착 항공편 검색을 위한 토큰'}"
        >;
      }>;
  }

  export interface IRequestFinal extends IRequest {
    /**
     * 항공편 최종 확인을 위한 토큰입니다.
     *
     * @title 항공편 최종 확인 토큰
     */
    booking_token: string &
      Prerequisite<{
        method: "post";
        path: "/connector/google-flight/arrival";
        jmesPath: JMESPath<
          IGoogleFlight.IResponse,
          "[].{value:booking_token, label:'항공편 최종 확인을 위한 토큰'}"
        >;
      }>;
  }

  /**
   * 항공권 검색 결과입니다.
   *
   * @title 항공권 검색 결과
   */
  export interface IResponse {
    /**
     * 주어진 조건에 맞는 최적의 항공권 검색 결과입니다.
     *
     * @title 최적의 항공권 검색 결과
     */
    best_flights: ISearchOutput[];

    /**
     * 나머지 항공권 검색 결과입니다.
     *
     * @title 나머지 항공권 검색 결과
     */
    other_flights: ISearchOutput[];
  }

  /**
   * 최종 항공권 선택 결과입니다.
   *
   * @title 최종 항공권 선택 결과
   */
  export interface IFinalResponse {
    /**
     * 최종 선택된 항공권 정보입니다.
     *
     * @title 최종 선택된 항공권 정보
     */
    flight: ISearchOutput[];

    /**
     * 선택한 항공편을 예약할 수 있는 정보들입니다.
     *
     * @title 예약 정보
     */
    booking_options: IBookingOption[];
  }

  /**
   * 항공권 검색 결과입니다.
   *
   * @title 항공권 검색 결과
   */
  export interface ISearchOutput {
    /**
     * 항공편 정보입니다.
     *
     * @title 항공편 정보
     */
    flight: IFlight[];

    /**
     * 비행에 걸리는 총 소요시간입니다.
     *
     * @title 비행 총 소요시간
     */
    total_duration: string;

    /**
     * 항공편 가격입니다.
     *
     * @title 항공편 가격
     */
    price: `${number}원` | string;

    /**
     * 항공편 환승 정보입니다.
     *
     * @title 환승 정보
     */
    layover?: ILayover;

    /**
     * 돌아오는 항공편 검색을 위한 토큰
     *
     * @title 돌아오는 항공편 검색 토큰
     */
    departure_token?: string;

    /**
     * 항공편 최종 확인을 위한 토큰
     *
     * @title 항공편 최종 확인 토큰
     */
    booking_token?: string;
  }

  interface IFlight {
    /**
     * 항공편 출발 정보입니다.
     *
     * @title 출발 정보
     */
    departure_airport: IAirport;

    /**
     * 항공편 도착 정보입니다.
     *
     * @title 도착 정보
     */
    arrival_airport: IAirport;

    /**
     * 비행에 걸리는 소요 시간입니다.
     *
     * @title 비행 시간
     */
    duration: string;

    /**
     * 비행기 기종 정보입니다.
     *
     * @title 비행기 기종
     */
    airplane: string;

    /**
     * 항공사 정보입니다.
     *
     * @title 항공사
     */
    airline: string;

    /**
     * 항공사 로고 이미지입니다.
     *
     * @title 항공사 로고
     */
    airline_logo: string &
      tags.Format<"uri"> &
      tags.ContentMediaType<"image/*">;

    /**
     * 좌석 등급 정보입니다.
     *
     * @title 좌석 등급
     */
    travel_class: string;

    /**
     * 항공편 번호입니다.
     *
     * @title 항공편 번호
     */
    flight_number: string;
  }

  /**
   * @title 항공편 정보
   */
  interface IAirport {
    /**
     * 공항 이름입니다.
     *
     * @title 공항 이름
     */
    name: string;

    /**
     * 세자리 공항 코드입니다.
     *
     * @title 공항 코드
     */
    code: string;

    /**
     * 비행기가 출발하는 일자와 시각입니다.
     *
     * @title 비행기 출발 일자 / 시각
     */
    time: string;
  }

  /**
   * @title 환승 정보
   */
  interface ILayover extends Omit<IAirport, "time"> {
    /**
     * 환승 시간입니다.
     *
     * @title 환승 시간
     */
    duration: string;
  }

  /**
   * 예약 옵션입니다.
   *
   * @title 예약 옵션
   */
  export interface IBookingOption {
    /**
     * 선택할 항공편을 예약할 수 있는 사이트 입니다.
     *
     * @title 예약 사이트
     */
    book_with: string;

    /**
     * 선택된 항공편의 가격입니다.
     *
     * @title 가격
     */
    price: string | `${number}원`;

    /**
     * 선택된 항공편을 예약할 수 있는 링크입니다.
     *
     * @title 예약 링크
     */
    book_link: string & tags.Format<"uri">;
  }
}
