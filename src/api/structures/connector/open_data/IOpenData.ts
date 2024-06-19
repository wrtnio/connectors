import { tags } from "typia";

export namespace IOpenData {
  /**
   * @title 기상청 타입.
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
