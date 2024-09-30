import { Placeholder } from "@wrtnio/decorators";
import { tags } from "typia";

import { IOpenData } from "./IOpenData";

export namespace ILH {
  /**
   * @title LH rental housing search conditions
   */
  export interface IGetLHLeaseInfoInput
    extends IOpenData.ICommon.IPaginationInput {
    /**
     * @title Area Code
     *
     * It can be one of these numbers:
     * - 11: Seoul
     * - 26: Busan
     * - 27: Daegu
     * - 28: Incheon
     * - 29: Gwangju
     * - 30: Daejeon
     * - 31: Ulsan
     * - 36110: Sejong
     * - 41: Gyeonggi
     * - 42: Gangwon
     * - 43: Chungcheongbuk
     * - 44: Chungcheongnam
     * - 45: Jeollabuk
     * - 46: Jeollanam
     * - 47: Gyeongsangbuk
     * - 48: Gyeongsangnam
     * - 50: Jeju
     *
     */
    CNP_CD:
      | tags.Constant<11, { title: "서울특별시" }>
      | tags.Constant<26, { title: "부산광역시" }>
      | tags.Constant<27, { title: "대구광역시" }>
      | tags.Constant<28, { title: "인천광역시" }>
      | tags.Constant<29, { title: "광주광역시" }>
      | tags.Constant<30, { title: "대전광역시" }>
      | tags.Constant<31, { title: "울산광역시" }>
      | tags.Constant<36110, { title: "세종특별자치시" }>
      | tags.Constant<41, { title: "경기도" }>
      | tags.Constant<42, { title: "강원도" }>
      | tags.Constant<43, { title: "충청북도" }>
      | tags.Constant<44, { title: "충청남도" }>
      | tags.Constant<45, { title: "전라북도" }>
      | tags.Constant<46, { title: "전라남도" }>
      | tags.Constant<47, { title: "경상북도" }>
      | tags.Constant<48, { title: "경상남도" }>
      | tags.Constant<50, { title: "제주특별자치도" }>;

    /**
     * @title Supply Type Code
     *
     * It can be one of these numbers:
     * - 07: National Rental
     * - 08: Public Rental
     * - 09: Permanent Rental
     * - 10: Happy Housing
     * - 11: Long-term Lease
     * - 13: Purchase Lease
     * - 17: Lease Lease
     */
    SPL_TP_CD?:
      | tags.Constant<"07", { title: "국민임대" }>
      | tags.Constant<"08", { title: "공공임대" }>
      | tags.Constant<"09", { title: "영구임대" }>
      | tags.Constant<"10", { title: "행복주택" }>
      | tags.Constant<"11", { title: "장기전세" }>
      | tags.Constant<"13", { title: "매입임대" }>
      | tags.Constant<"17", { title: "전세임대" }>;
  }

  /**
   * @title LH rental housing inquiry response
   */
  export interface IGetLHLeaseInfoOutput {
    /**
     * @title Next page availability
     */
    nextPage: boolean;

    data: {
      /**
       * @title Total number of households
       */
      SUM_HSH_CNT: string & Placeholder<"873">;

      /**
       * @title Monthly rent (won)
       */
      RFE: string & Placeholder<"373500">;

      /**
       * @title order
       */
      RNUM: string & Placeholder<"1">;

      /**
       * @title Number of generations
       */
      HSH_CNT: string & Placeholder<"72">;

      /**
       * @title Region name
       */
      ARA_NM: string & Placeholder<"서울특별시 강남구">;

      /**
       * @title Rental Deposit
       */
      LS_GMY: string & Placeholder<"45003000">;

      /**
       * @title Supply type name
       */
      AIS_TP_CD_NM: string & Placeholder<"국민임대">;

      /**
       * @title Name of the unit
       */
      SBD_LGO_NM: string & Placeholder<"서울강남 3블록">;

      /**
       * @title Total number
       */
      ALL_CNT: string & Placeholder<"157">;

      /**
       * @title Exclusive area
       */
      DDO_AR: string & Placeholder<"46.71">;

      /**
       * @title First year of residency
       */
      MVIN_XPC_YM: string & Placeholder<"201311">;
    }[];
  }
}
