export namespace IOpenData {
  /**
   * @title 기상청 타입.
   */
  export namespace IKoreaMeteorologicalAdministration {
    export interface IGetVillageForecastInformationInput {
      /**
       * @title 격자 좌표 값의 x 좌표.
       */
      nx: `${number}`;

      /**
       * @title 격자 좌표 값의 y 좌표.
       */
      ny: `${number}`;
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
              category: string;

              /**
               * @title 격자 좌표 값의 x 좌표.
               */
              nx: `${number}`;

              /**
               * @title 격자 좌표 값의 y 좌표.
               */
              ny: `${number}`;

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
