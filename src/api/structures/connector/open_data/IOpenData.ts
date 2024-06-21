import { Placeholder } from "@wrtn/decorators";
import { tags } from "typia";

export namespace IOpenData {
  /**
   * @title 금융위원회 타입
   */
  export namespace FinancialServicesCommission {
    /**
     * @title 시가총액 및 주식 정보 조회 조건
     */
    export interface IGetStockPriceInfoInput {
      /**
       * @title 한 페이지 당 결과 수
       */
      numOfRows: number & tags.Type<"int32"> & tags.Default<10>;

      /**
       * @title 페이지 번호
       */
      pageNo: number & tags.Type<"int32"> & tags.Default<1>;

      /**
       * @title 종목명
       */
      likeItmsNm: string & tags.MaxLength<120> & Placeholder<"삼성전자">;
    }

    /**
     * @title 시가총액 및 주식 정보 조회 결과
     */
    export interface IGetStockPriceInfoOutput {
      response: {
        body: {
          /**
           * @title 한 페이지 당 결과 수
           */
          numOfRows: number & tags.Type<"int32"> & tags.Default<10>;

          /**
           * @title 페이지 번호
           */
          pageNo: number & tags.Type<"int32"> & tags.Default<1>;

          /**
           * @title 전체 데이터 수
           */
          totalCount: number;

          /**
           * @title 조회된 기업 정보
           */
          items: {
            /**
             * @title 기준 일자
             */
            basDt: string & Placeholder<"20220919">;

            /**
             * @title 단축 코드
             * @description 종목 코드보다 짧으면서 유일성이 보장되는 6자리 코드
             */
            srtnCd: string;

            /**
             * @title ISIN 코드
             * @description 국제 채권 식별 번호
             */
            isinCd: string;

            /**
             * @title 종목 명칭
             */
            itmsNm: string;

            /**
             * @title 주식의 시장 구분
             */
            mrktCtg:
              | tags.Constant<"KOSPI", { title: "KOSPI" }>
              | tags.Constant<"KOSDAQ", { title: "KOSDAQ" }>
              | tags.Constant<"KONEX", { title: "KONEX" }>;

            /**
             * @title 종가
             * @description 정규시장의 매매시간 종료 시 형성되는 최종 가격
             *
             */
            clpr: string;

            /**
             * @title 대비
             * @description 전일 대비 등락
             */
            vs: string;

            /**
             * @title 등락률
             * @description 전일 대비 등락에 따른 비율
             */
            fltRt: string;

            /**
             * @title 정규 시간의 매매 시간
             * @description 개시 후 형성되는 최초 가격
             */
            mkp: string;

            /**
             * @title 고가
             * @description 하루 중 가격의 최고치
             */

            hipr: string;

            /**
             * @title 저가
             * @description 하루 중 가격의 최저치
             */
            lopr: string;

            /**
             * @title 거래량
             * @description 체결수량의 누적합계
             */
            trqu: string;

            /**
             * @title 거래 대금
             * @description 거래건 별 체결가격 * 체결수량의 누적 합계
             */
            trPrc: string;

            /**
             * @title 상장주식수
             */
            lstgStCnt: string;

            /**
             * @title 시가총액
             * @description 종가 * 상장주식수
             */
            mrktTotAmt: string;
          }[];
        };
      };
    }
  }

  /**
   * @title 기상청 타입
   */
  export namespace IKoreaMeteorologicalAdministration {
    /**
     * @title 단기 예보에서 표현되는 코드 값.
     */
    export type CategoryType =
      | tags.Constant<"POP", { title: "강수확률"; description: "단위는 %" }>
      | tags.Constant<"PTY", { title: "강수형태"; description: "코드 값" }>
      | tags.Constant<
          "PCP",
          { title: "1시간 강수량"; description: "범주(1mm)" }
        >
      | tags.Constant<"REH", { title: "습도"; description: "단위는 %" }>
      | tags.Constant<
          "SNO",
          { title: "1시간 신적설"; description: "범주(1cm)" }
        >
      | tags.Constant<"SKY", { title: "하늘 상태"; description: "코드 값" }>
      | tags.Constant<"TMP", { title: "1시간 기온"; description: "섭씨 온도" }>
      | tags.Constant<"TMN", { title: "일 최저기온"; description: "섭씨 온도" }>
      | tags.Constant<"TMX", { title: "일 최고기온"; description: "섭씨 온도" }>
      | tags.Constant<"UUU", { title: "풍속 (동서성분)"; description: "m/s" }>
      | tags.Constant<"VVV", { title: "풍속 (남북성분)"; description: "m/s" }>
      | tags.Constant<"WAV", { title: "파고 (파도높이)"; description: "M" }>
      | tags.Constant<"VEC", { title: "풍향"; description: "각도 (deg)" }>
      | tags.Constant<"WSD", { title: "풍속"; description: "m/s" }>
      | tags.Constant<"T1H", { title: "기온"; description: "섭씨 온도" }>
      | tags.Constant<"RN1", { title: "1시간 강수량"; description: "mm" }>
      | tags.Constant<"VEC", { title: "풍향"; description: "deg" }>
      | tags.Constant<"T1H", { title: "기온"; description: "섭씨 온도" }>;

    /**
     * @title 날씨 조회를 위한 요청 조건
     */
    export interface IGetVillageForecastInformationInput {
      /**
       * @title 격자 좌표 값의 x 좌표.
       */
      nx: number;

      /**
       * @title 격자 좌표 값의 y 좌표.
       */
      ny: number;
    }

    /**
     * @title 날씨 조회 결과
     */
    export interface IGetVillageForecastInformationOutput {
      response: {
        body: {
          items: {
            item: {
              /**
               * @title `20240619`와 같은 년,월,일자가 합성된 날짜 값.
               */
              baseDate: `${number}`;

              /**
               * @title `1200`와 같이 정각 시간을 나타내는 시간 값.
               */
              baseTime: `${number}`;

              /**
               * @title 카테고리.
               */
              category: IKoreaMeteorologicalAdministration.CategoryType;

              /**
               * @title 격자 좌표 값의 x 좌표.
               */
              nx: number;

              /**
               * @title 격자 좌표 값의 y 좌표.
               */
              ny: number;

              /**
               * @title 카테고리에 해당하는 값.
               */
              obsrValue: `${number}`;
            }[];
          };
        };
      };
    }
  }
}
