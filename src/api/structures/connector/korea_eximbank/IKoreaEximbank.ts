import { Placeholder } from "@wrtnio/decorators";
import { tags } from "typia";

export namespace IKoreaEximbank {
  /**
   * @title 환율 정보
   * @description 한국 수출입 은행에서 오늘 날짜에 해당하는 환율 정보를 제공
   */
  export type IGetExchangeOutput = {
    /**
     * @title 조회 결과에 대한 요약
     */
    result:
      | tags.Constant<1, { title: "성공" }>
      | tags.Constant<2, { title: "데이터 코드 오류" }>
      | tags.Constant<3, { title: "인증코드 오류" }>
      | tags.Constant<4, { title: "일일 제한 횟수 마감" }>;

    /**
     * @title 통화코드
     */
    cur_unit: (string & Placeholder<"KRW">) | null;

    /**
     * @title 전신환(송금) 받을 떄
     */
    ttb: string | null;

    /**
     * @title 전신환(송금) 보낼 때
     */
    tts: string | null;

    /**
     * @title 매매 기준율
     */
    deal_bas_r: string | null;

    /**
     * @title 장부 가격
     */
    bkpr: string | null;

    /**
     * @title 년환가료율
     */
    yy_efee_r: string | null;

    /**
     * @title 10일환가료율
     */
    ten_dd_efee_r: string | null;

    /**
     * @title 서울외국환중개장부가격
     */
    kftc_bkpr: string | null;

    /**
     * @title 서울외국환중개매매기준율
     */
    kftc_deal_bas_r: string | null;

    /**
     * @title 국가/통화명
     */
    cur_nm: (string & Placeholder<"한국 원">) | null;
  }[];
}
