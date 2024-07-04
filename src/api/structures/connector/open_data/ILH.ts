import { Placeholder } from "@wrtn/decorators";
import { tags } from "typia";

import { IOpenData } from "./IOpenData";

export namespace ILH {
  /**
   * @title LH 임대주택 조회 조건
   */
  export interface IGetLHLeaseInfoInput extends IOpenData.ICommon.IPaginationInput {
    /**
     * @title 지역 코드
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
     * @title 공급유형코드
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
   * @title LH 임대주택 조회 응답
   */
  export interface IGetLHLeaseInfoOutput {
    /**
     * @title 다음 페이지 유무
     */
    nextPage: boolean;

    data: {
      /**
       * @title 총세대수
       */
      SUM_HSH_CNT: string & Placeholder<"873">;

      /**
       * @title 월임대료(원)
       */
      RFE: string & Placeholder<"373500">;

      /**
       * @title 순번
       */
      RNUM: string & Placeholder<"1">;

      /**
       * @title 세대수
       */
      HSH_CNT: string & Placeholder<"72">;

      /**
       * @title 지역명
       */
      ARA_NM: string & Placeholder<"서울특별시 강남구">;

      /**
       * @title 임대보증금
       */
      LS_GMY: string & Placeholder<"45003000">;

      /**
       * @title 공급유형명
       */
      AIS_TP_CD_NM: string & Placeholder<"국민임대">;

      /**
       * @title 단지명
       */
      SBD_LGO_NM: string & Placeholder<"서울강남 3블록">;

      /**
       * @title 전체건수
       */
      ALL_CNT: string & Placeholder<"157">;

      /**
       * @title 전용면적
       */
      DDO_AR: string & Placeholder<"46.71">;

      /**
       * @title 최초입주년월
       */
      MVIN_XPC_YM: string & Placeholder<"201311">;
    }[];
  }
}
