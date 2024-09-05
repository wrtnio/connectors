import { Placeholder } from "@wrtnio/decorators";
import { tags } from "typia";

export namespace IOpenData {
  export namespace ICommon {
    export interface IPaginationInput {
      /**
       * @title Number of results per page
       */
      numOfRows?: number & tags.Type<"int32"> & tags.Default<10>;

      /**
       * @title Page number
       */
      pageNo?: number & tags.Type<"int32"> & tags.Default<1>;
    }

    export interface IPaginationOutput extends IPaginationInput {
      /**
       * @title Number of results per page
       */
      numOfRows?: number & tags.Type<"int32"> & tags.Default<10>;

      /**
       * @title Page number
       */
      pageNo?: number & tags.Type<"int32"> & tags.Default<1>;

      /**
       * @title Total number of records
       */
      totalCount: number;
    }
  }
  /**
   * @title Ministry of the Interior and Safety Type
   */
  export namespace MinistryOfTheInteriorAndSafety {
    /**
     * @title Request for Administrative Standard Code Lookup
     */
    export interface IGetStandardRegionCodeListInput
      extends ICommon.IPaginationInput {
      /**
       * @title Region address name
       */
      locatadd_nm: string & Placeholder<"Seoul Special City">;
    }

    /**
     * @title Result of Administrative Standard Code Lookup
     */
    export interface IGetStandardRegionCodeListOutput
      extends ICommon.IPaginationOutput {
      rows: {
        /**
         * @title Region code
         */
        region_cd: string;

        /**
         * @title City code
         */
        sido_cd?: string;

        /**
         * @title District code
         */
        sgg_cd?: string;

        /**
         * @title City and District Code
         * @description Combination of city code and district code
         */
        sigunguCd?: string;

        /**
         * @title District name
         */
        sigunguNm: string;

        /**
         * @title Town/Village code
         */
        umd_cd?: string;

        /**
         * @title Ri code
         */
        ri_cd?: string;

        /**
         * @title Legal Dong code
         * @description Combination of Town/Village code and Ri code
         */
        bjdongCd?: string;

        /**
         * @title Resident region code
         */
        locatjumin_cd?: string;

        /**
         * @title Land region code
         */
        locatjijuk_cd?: string;

        /**
         * @title Region address name
         */
        locatadd_nm?: string;

        /**
         * @title Sequence
         */
        locat_order?: number & tags.Type<"int32">;

        /**
         * @title Remark
         */
        locat_rm?: string;

        /**
         * @title Parent region code
         */
        locathigh_cd?: string;

        /**
         * @title Lowest region name
         */
        locallow_nm?: string;

        /**
         * @title Date of creation
         */
        adpt_de?: string;
      }[];
    }
  }

  /**
   * @title Financial Services Commission Type
   */
  export namespace FinancialServicesCommission {
    /**
     * @title Conditions for querying market capitalization and stock information
     */
    export type IGetStockPriceInfoInput = ICommon.IPaginationInput & {
      /**
       * @title Keyword for stock name search
       *
       * Search is only possible if it matches the exact company name that is listed, which is stored on the Korea Stock Exchange.
       * Since it is a Korean company, most of it will be in Korean.
       * Please give Korean company name.
       */
      likeItmsNm?: string &
        tags.MaxLength<120> &
        Placeholder<"Samsung Electronics">;
    } & (
        | {
            /**
             * @title Base date
             * @description Searches for data matching the search value and base date
             */
            basDt?: string & Placeholder<"20220919">;
          }
        | {
            /**
             * @title Start date (inclusive)
             * @description Searches for data where the base date is greater than or equal to the search value
             */
            beginBasDt?: string & Placeholder<"20220919">;

            /**
             * @title End date (exclusive)
             * @description Searches for data where the base date is less than the search value
             */
            endBasDt?: string & Placeholder<"20220919">;
          }
      );

    /**
     * @title Result of querying market capitalization and stock information
     */
    export interface IGetStockPriceInfoOutput {
      response: {
        body: {
          /**
           * @title Number of results per page
           */
          numOfRows: number & tags.Type<"int32"> & tags.Default<10>;

          /**
           * @title Page number
           */
          pageNo: number & tags.Type<"int32"> & tags.Default<1>;

          /**
           * @title Total number of records
           */
          totalCount: number;

          /**
           * @title Retrieved company information
           */
          items: {
            item: {
              /**
               * @title Base date
               */
              basDt: string & Placeholder<"20220919">;

              /**
               * @title Short code
               * @description 6-digit code shorter than stock code and uniquely guaranteed
               */
              srtnCd: string;

              /**
               * @title ISIN code
               * @description International Securities Identification Number
               */
              isinCd: string;

              /**
               * @title Stock name
               */
              itmsNm: string;

              /**
               * @title Market category
               */
              mrktCtg:
                | tags.Constant<"KOSPI", { title: "KOSPI" }>
                | tags.Constant<"KOSDAQ", { title: "KOSDAQ" }>
                | tags.Constant<"KONEX", { title: "KONEX" }>;

              /**
               * @title Closing price
               * @description Final price formed at the end of regular trading hours
               */
              clpr: string;

              /**
               * @title Change
               * @description Fluctuation compared to the previous day
               */
              vs: string;

              /**
               * @title Rate of change
               * @description Ratio of fluctuation compared to the previous day
               */
              fltRt: string;

              /**
               * @title Opening price
               * @description Initial price formed after opening
               */
              mkp: string;

              /**
               * @title Highest price
               * @description Highest price during the day
               */
              hipr: string;

              /**
               * @title Lowest price
               * @description Lowest price during the day
               */
              lopr: string;

              /**
               * @title Trading volume
               * @description Cumulative total of trade quantities
               */
              trqu: string;

              /**
               * @title Trading amount
               * @description Cumulative total of trade prices * quantities
               */
              trPrc: string;

              /**
               * @title Listed shares
               */
              lstgStCnt: string;

              /**
               * @title Market capitalization
               * @description Closing price * listed shares
               */
              mrktTotAmt: string;
            }[];
          };
        };
      };
    }
  }
}

/**
 * @title Korea Meteorological Administration Type
 */
export namespace IKoreaMeteorologicalAdministration {
  /**
   * @title Code values expressed in short-term forecasts.
   */
  export type CategoryType =
    | tags.Constant<
        "POP",
        { title: "Precipitation Probability"; description: "Unit is %" }
      >
    | tags.Constant<
        "PTY",
        { title: "Precipitation Type"; description: "Code value" }
      >
    | tags.Constant<
        "PCP",
        { title: "Hourly Precipitation"; description: "Category (1mm)" }
      >
    | tags.Constant<"REH", { title: "Humidity"; description: "Unit is %" }>
    | tags.Constant<
        "SNO",
        { title: "Hourly Snowfall"; description: "Category (1cm)" }
      >
    | tags.Constant<
        "SKY",
        { title: "Sky Condition"; description: "Code value" }
      >
    | tags.Constant<
        "TMP",
        { title: "Hourly Temperature"; description: "Celsius temperature" }
      >
    | tags.Constant<
        "TMN",
        {
          title: "Daily Minimum Temperature";
          description: "Celsius temperature";
        }
      >
    | tags.Constant<
        "TMX",
        {
          title: "Daily Maximum Temperature";
          description: "Celsius temperature";
        }
      >
    | tags.Constant<
        "UUU",
        { title: "Wind Speed (East-West Component)"; description: "m/s" }
      >
    | tags.Constant<
        "VVV",
        { title: "Wind Speed (North-South Component)"; description: "m/s" }
      >
    | tags.Constant<
        "WAV",
        { title: "Wave Height (Wave Height)"; description: "M" }
      >
    | tags.Constant<
        "VEC",
        { title: "Wind Direction"; description: "Angle (deg)" }
      >
    | tags.Constant<"WSD", { title: "Wind Speed"; description: "m/s" }>
    | tags.Constant<
        "T1H",
        { title: "Temperature"; description: "Celsius temperature" }
      >
    | tags.Constant<"RN1", { title: "Hourly Precipitation"; description: "mm" }>
    | tags.Constant<"VEC", { title: "Wind Direction"; description: "deg" }>
    | tags.Constant<
        "T1H",
        { title: "Temperature"; description: "Celsius temperature" }
      >;

  /**
   * @title Weather query request conditions
   */
  export interface IGetVillageForecastInformationInput {
    /**
     * @title Definition of nx, ny
     *
     * use 'latitude_and_longitude' or 'grid_coordinates'.
     * This property can never be used except for these two strings.
     */
    type:
      | tags.Constant<
          "latitude_and_longitude",
          { title: "latitude and longitude" }
        >
      | tags.Constant<
          "grid_coordinates",
          { title: "Grid Coordinates of Korean" }
        >;

    /**
     * @title Longitude or x_position
     *
     * If the type property in this object is 'latitude_and_longitude', this value means longitude.
     * If not, use x position value of grid coordinates in Korea.
     */
    nx: number;

    /**
     * @title Latitude or y_position
     *
     * If the type property in this object is 'latitude_and_longitude', this value means latitude.
     * If not, use y position value of grid coordinates in Korea.
     */
    ny: number;
  }

  /**
   * Original values provided by the Korea Meteorological Administration
   *
   * @title Weather query result
   */
  export interface IGetVillageForecastInformationOutput {
    response: {
      body: {
        items: {
          item: {
            /**
             * @title Date value composed of year, month, and day, e.g., `20240619`.
             */
            baseDate: `${number}`;

            /**
             * @title Time value indicating the exact hour, e.g., `1200`.
             */
            baseTime: `${number}`;

            /**
             * @title Category.
             */
            category: IKoreaMeteorologicalAdministration.CategoryType;

            /**
             * @title Longitude
             */
            nx: number;

            /**
             * @title Y-coordinate of the grid point value.
             */
            ny: number;

            /**
             * @title Value corresponding to the category.
             */
            obsrValue: `${number}`;
          }[];
        };
      };
    };
  }

  /**
   * Processed results
   *
   * @title Weather query result
   */
  export interface IGetForecastOutput {
    /**
     * @title Date value composed of year, month, and day, e.g., `20240619`.
     */
    baseDate: `${number}`;

    /**
     * @title Time value indicating the exact hour, e.g., `1200`.
     */
    baseTime: `${number}`;

    /**
     * Classification of what each value represents
     *
     * @title Category
     */
    category: IKoreaMeteorologicalAdministration.CategoryType;

    /**
     * @title Longitude
     */
    nx: number;

    /**
     * @title Latitude
     */
    ny: number;

    /**
     * @title Value corresponding to the category
     */
    obsrValue: `${number}`;
  }
}
