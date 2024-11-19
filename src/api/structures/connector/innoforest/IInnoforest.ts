import { Prerequisite } from "@wrtnio/decorators";
import { tags } from "typia";

export namespace IInnoforest {
  export interface ICommonResponse {
    /**
     * @title 조회된 갯수 카운트
     */
    dataCount?: number & tags.Type<"uint64">;

    /**
     * @title 성공여부
     */
    success?: boolean;

    /**
     * @title 에러발생시 에러메시지전달 (에러시에만 전달)
     */
    error?: string;

    /**
     * @title 요청성공시 성공메시지전달 (성공시에만 전달)
     */
    successMsg?: string;
  }

  export interface IUnifyOutput {
    /**
     * @title corp
     */
    corp: IGetcorpOutput;

    /**
     * @title corpfinance
     */
    corpfinance: IGetcorpfinanceOutput;

    /**
     * @title corpinvest
     */
    corpinvest: IGetcorpinvestOutput;

    /**
     * @title corpcommon
     */
    corpcommon: IGetcorpcommonOutput;

    /**
     * @title product
     */
    product: IFindproductOutput;

    /**
     * @title traffic
     */
    traffic: IFindtrafficOutput;

    /**
     * @title sales
     */
    sales: IFindsalesOutput;

    /**
     * @title salesrebuy
     */
    salesrebuy: IFindsalesrebuyOutput;

    /**
     * @title salesavgbuy
     */
    salesavgbuy: IFindsalesavgbuyOutput;

    /**
     * @title salesperson
     */
    salesperson: IFindsalespersonOutput;

    /**
     * @title saleshousehold
     */
    saleshousehold: IFindsaleshouseholdOutput;

    /**
     * @title salesincome
     */
    salesincome: IFindsalesincomeOutput;

    /**
     * @title invest
     */
    invest: IFindinvestOutput;

    /**
     * @title patent
     */
    patent: IFindpatentOutput;

    /**
     * @title patentword
     */
    patentword: IFindpatentwordOutput;

    /**
     * @title finance
     */
    finance: IFindfinanceOutput;

    /**
     * @title employee
     */
    employee: IFindemployeeOutput;

    /**
     * @title press
     */
    press: IFindpressOutput;
  }

  export interface IUnifyInput {
    /**
     * @title 혁신의숲 기업 Key
     */
    corpUniqNum: string &
      Prerequisite<{
        method: "post";
        path: "/connector/innoforest/search";
        jmesPath: "companies[].{label: companyName, value: corpUniqNum}";
      }>;
  }

  export interface ISearchOutput {
    companies: {
      /**
       * @title 혁신의숲 기업 Key
       */
      corpUniqNum: string;

      /**
       * @title 회사 이름
       */
      companyName: string;
    }[];
  }

  export interface ISearchInput {}

  export interface IGetcorpOutput extends IInnoforest.ICommonResponse {
    /**
     * @title 응답 데이터
     */
    data?: {
      /**
       * @title 혁신의숲 기업 Key
       */
      corpId: string & tags.MaxLength<10>;

      /**
       * @title 사업자등록번호
       */
      corpUniqNum: string & tags.MaxLength<10>;

      /**
       * @title 한글기업명
       */
      corpNameKr: (string & tags.MaxLength<250>) | null;

      /**
       * @title 한글기업설명
       */
      corpIntroKr: (string & tags.MaxLength<250>) | null;

      /**
       * @title 기업주소한글
       */
      corpAddrKr: (string & tags.MaxLength<500>) | null;

      /**
       * @title 대표자명
       */
      repName: (string & tags.MaxLength<500>) | null;

      /**
       * @title 운영여부
       */
      corpStatCdKr: (string & tags.MaxLength<50>) | null;

      /**
       * @title 상장여부
       */
      corpStockCdKr: (string & tags.MaxLength<50>) | null;

      /**
       * @title 기업로고이미지
       */
      corpLogoImg: (string & tags.MaxLength<500>) | null;

      /**
       * @title 홈페이지
       */
      homeUrl: (string & tags.MaxLength<200>) | null;

      /**
       * @title 설립일
       */
      foundAt: (string & tags.Format<"date">) | null;

      /**
       * @title 카테고리
       */
      bizNamesKr: (string & tags.MaxLength<500>) | null;

      /**
       * @title 키워드
       */
      tagNamesKr: (string & tags.MaxLength<500>) | null;

      /**
       * @title 수정시간
       */
      modifiedDate: string | null;
    };
  }

  export interface IGetcorpInput {
    /**
     * @title 혁신의숲 기업 Key
     */
    corpUniqNum: string &
      Prerequisite<{
        method: "post";
        path: "/connector/innoforest/search";
        jmesPath: "companies[].{label: companyName, value: corpUniqNum}";
      }>;
  }

  export interface IGetcorpfinanceOutput extends IInnoforest.ICommonResponse {
    /**
     * @title 응답 데이터
     */
    data?: {
      /**
       * @title 혁신의숲 기업 Key
       */
      corpId: string & tags.MaxLength<10>;

      /**
       * @title 사업자등록번호
       */
      corpUniqNum: string & tags.MaxLength<10>;

      /**
       * @title 자본금
       */
      capStockVal: (number & tags.Type<"int64">) | null;

      /**
       * @title 매출
       */
      revenueVal: (number & tags.Type<"int64">) | null;

      /**
       * @title 수정시간
       */
      modifiedDate: string | null;
    };
  }

  export interface IGetcorpfinanceInput {
    /**
     * @title 혁신의숲 기업 Key
     */
    corpUniqNum: string &
      Prerequisite<{
        method: "post";
        path: "/connector/innoforest/search";
        jmesPath: "companies[].{label: companyName, value: corpUniqNum}";
      }>;
  }

  export interface IGetcorpinvestOutput extends IInnoforest.ICommonResponse {
    /**
     * @title 응답 데이터
     */
    data?: {
      /**
       * @title 혁신의숲 기업 Key
       */
      corpId: string & tags.MaxLength<10>;

      /**
       * @title 사업자등록번호
       */
      corpUniqNum: string & tags.MaxLength<10>;

      /**
       * @title 투자건수
       */
      invstCnt: (number & tags.Type<"int64">) | null;

      /**
       * @title 누적투자금액
       */
      invstSumVal: (number & tags.Type<"int64">) | null;

      /**
       * 투자금액이 '0' 인 투자이력이 확인될 경우
       *
       * @title 부가설명
       */
      invstSumValDes: (string & tags.MaxLength<100>) | null;

      /**
       * @title 수정시간
       */
      modifiedDate: string | null;
    };
  }

  export interface IGetcorpinvestInput {
    /**
     * @title 혁신의숲 기업 Key
     */
    corpUniqNum: string &
      Prerequisite<{
        method: "post";
        path: "/connector/innoforest/search";
        jmesPath: "companies[].{label: companyName, value: corpUniqNum}";
      }>;
  }

  export interface IGetcorpcommonOutput extends IInnoforest.ICommonResponse {
    /**
     * @title 응답 데이터
     */
    data?: {
      /**
       * @title 혁신의숲 기업 Key
       */
      corpId: string & tags.MaxLength<10>;

      /**
       * @title 사업자등록번호
       */
      corpUniqNum: string & tags.MaxLength<10>;

      /**
       * @title 특허점수 평균
       */
      patntLvlVal: number | null;

      /**
       * @title 고용인원
       */
      empWholeVal: (number & tags.Type<"int64">) | null;

      /**
       * @title 수정시간
       */
      modifiedDate: string | null;
    };
  }

  export interface IGetcorpcommonInput {
    /**
     * @title 혁신의숲 기업 Key
     */
    corpUniqNum: string &
      Prerequisite<{
        method: "post";
        path: "/connector/innoforest/search";
        jmesPath: "companies[].{label: companyName, value: corpUniqNum}";
      }>;
  }

  export interface IFindproductOutput extends IInnoforest.ICommonResponse {
    /**
     * @title 응답 데이터
     */
    data?: {
      /**
       * @title 혁신의숲 기업 Key
       */
      corpId: string & tags.MaxLength<10>;

      /**
       * @title 혁신의숲 서비스 Key
       */
      prodId: string & tags.MaxLength<10>;

      /**
       * @title 사업자등록번호
       */
      corpUniqNum: string & tags.MaxLength<10>;

      /**
       * @title 한글서비스명
       */
      prodNameKr: (string & tags.MaxLength<250>) | null;

      /**
       * @title 한글서비스설명
       */
      prodIntroKr: (string & tags.MaxLength<250>) | null;

      /**
       * @title 서비스로고이미지
       */
      prodLogoImg: (string & tags.MaxLength<500>) | null;

      /**
       * @title 수정시간
       */
      modifiedDate: string | null;
    }[];
  }

  export interface IFindproductInput {
    /**
     * @title 혁신의숲 기업 Key
     */
    corpUniqNum: string &
      Prerequisite<{
        method: "post";
        path: "/connector/innoforest/search";
        jmesPath: "companies[].{label: companyName, value: corpUniqNum}";
      }>;
  }

  export interface IFindtrafficOutput extends IInnoforest.ICommonResponse {
    /**
     * @title 응답 데이터
     */
    data?: {
      /**
       * @title 혁신의숲 기업 Key
       */
      corpId: string & tags.MaxLength<10>;

      /**
       * @title 혁신의숲 서비스 Key
       */
      prodId: string & tags.MaxLength<10>;

      /**
       * @title 사업자등록번호
       */
      corpUniqNum: string & tags.MaxLength<10>;

      /**
       * @title 트래픽기준일
       */
      usageFrom: string & tags.Format<"date">;

      /**
       * 0인 경우는 직접제보, 2인 경우에는 외부 제공인 경우를 의미한다.
       *
       * @title 트래픽
       */
      usageVal: (number & tags.Type<"int64">) | null;

      /**
       * @title 트래픽종류
       */
      type: (number & tags.Type<"int64">) | null;

      /**
       * @title 수정시간
       */
      modifiedDate: string | null;
    }[];
  }

  export interface IFindtrafficInput {
    /**
     * @title 혁신의숲 기업 Key
     */
    corpUniqNum: string &
      Prerequisite<{
        method: "post";
        path: "/connector/innoforest/search";
        jmesPath: "companies[].{label: companyName, value: corpUniqNum}";
      }>;
  }

  export interface IFindsalesOutput extends IInnoforest.ICommonResponse {
    /**
     * @title 응답 데이터
     */
    data?: {
      /**
       * @title 혁신의숲 기업 Key
       */
      corpId: string & tags.MaxLength<10>;

      /**
       * @title 사업자등록번호
       */
      corpUniqNum: string & tags.MaxLength<10>;

      /**
       * @title 거래기준일
       */
      salesFrom: string & tags.MaxLength<10>;

      /**
       * @title 거래액
       */
      salesVal: (number & tags.Type<"int64">) | null;

      /**
       * @title 거래건수
       */
      salesCnt: (number & tags.Type<"int64">) | null;

      /**
       * @title 수정시간
       */
      modifiedDate: string | null;
    }[];
  }

  export interface IFindsalesInput {
    /**
     * @title 혁신의숲 기업 Key
     */
    corpUniqNum: string &
      Prerequisite<{
        method: "post";
        path: "/connector/innoforest/search";
        jmesPath: "companies[].{label: companyName, value: corpUniqNum}";
      }>;
  }

  export interface IFindsalesrebuyOutput extends IInnoforest.ICommonResponse {
    /**
     * @title 응답 데이터
     */
    data?: {
      /**
       * @title 혁신의숲 기업 Key
       */
      corpId: string & tags.MaxLength<10>;

      /**
       * @title 사업자등록번호
       */
      corpUniqNum: string & tags.MaxLength<10>;

      /**
       * @title 거래기준일
       */
      salesFrom: string & tags.MaxLength<10>;

      /**
       * - 1: 1개월 내 재구매가 이루어짐을 의미
       * - 3: 3개월 내 재구매가 이루어짐을 의미
       * - 6: 6개월 내 재구매가 이루어짐을 의미
       * - 12: 12개월 내 재구매가 이루어짐을 의미
       *
       * @title 주기
       */
      salesRebuyPerdCd: (number & tags.Type<"int64">) | null;

      /**
       * @title 구매율
       */
      salesRate: number | null;

      /**
       * @title 수정시간
       */
      modifiedDate: string | null;
    }[];
  }

  export interface IFindsalesrebuyInput {
    /**
     * @title 혁신의숲 기업 Key
     */
    corpUniqNum: string &
      Prerequisite<{
        method: "post";
        path: "/connector/innoforest/search";
        jmesPath: "companies[].{label: companyName, value: corpUniqNum}";
      }>;
  }

  export interface IFindsalesavgbuyOutput extends IInnoforest.ICommonResponse {
    /**
     * @title 응답 데이터
     */
    data?: {
      /**
       * @title 혁신의숲 기업 Key
       */
      corpId: string & tags.MaxLength<10>;

      /**
       * @title 사업자등록번호
       */
      corpUniqNum: string & tags.MaxLength<10>;

      /**
       * @title 거래기준일
       */
      salesFrom: string & tags.MaxLength<10>;

      /**
       * - 1: 1개월 내 재구매가 이루어짐을 의미
       * - 3: 3개월 내 재구매가 이루어짐을 의미
       * - 6: 6개월 내 재구매가 이루어짐을 의미
       * - 12: 12개월 내 재구매가 이루어짐을 의미
       *
       * @title 주기
       */
      salesRebuyPerdCd: (number & tags.Type<"int64">) | null;

      /**
       * @title 구매율
       */
      salesRate: number | null;

      /**
       * @title 수정시간
       */
      modifiedDate: string | null;
    }[];
  }

  export interface IFindsalesavgbuyInput {
    /**
     * @title 혁신의숲 기업 Key
     */
    corpUniqNum: string &
      Prerequisite<{
        method: "post";
        path: "/connector/innoforest/search";
        jmesPath: "companies[].{label: companyName, value: corpUniqNum}";
      }>;
  }

  export interface IFindsalespersonOutput extends IInnoforest.ICommonResponse {
    /**
     * @title 응답 데이터
     */
    data?: {
      /**
       * @title 혁신의숲 기업 Key
       */
      corpId: string & tags.MaxLength<10>;

      /**
       * @title 사업자등록번호
       */
      corpUniqNum: string & tags.MaxLength<10>;

      /**
       * @title 거래기준일
       */
      salesFrom: string & tags.MaxLength<10>;

      /**
       * @title 성별
       */
      gendCd:
        | tags.Constant<"F", { title: "여성" }>
        | tags.Constant<"M", { title: "남성" }>
        | null;

      /**
       * @title 나이대
       */
      ageCd:
        | tags.Constant<"A20", { title: "0-29"; description: "연령 구간" }>
        | tags.Constant<"A30", { title: "30-39"; description: "연령 구간" }>
        | tags.Constant<"A40", { title: "40-49"; description: "연령 구간" }>
        | tags.Constant<"A50", { title: "50-59"; description: "연령 구간" }>
        | tags.Constant<"A60", { title: "60이상"; description: "연령 구간" }>
        | null;

      /**
       * @title 구매율
       */
      salesRate: number | null;

      /**
       * @title 수정시간
       */
      modifiedDate: string | null;
    }[];
  }

  export interface IFindsalespersonInput {
    /**
     * @title 혁신의숲 기업 Key
     */
    corpUniqNum: string &
      Prerequisite<{
        method: "post";
        path: "/connector/innoforest/search";
        jmesPath: "companies[].{label: companyName, value: corpUniqNum}";
      }>;
  }

  export interface IFindsaleshouseholdOutput
    extends IInnoforest.ICommonResponse {
    /**
     * @title 응답 데이터
     */
    data?: {
      /**
       * @title 혁신의숲 기업 Key
       */
      corpId: string & tags.MaxLength<10>;

      /**
       * @title 사업자등록번호
       */
      corpUniqNum: string & tags.MaxLength<10>;

      /**
       * @title 거래기준일
       */
      salesFrom: string & tags.MaxLength<10>;

      /**
       * @title 가족구성
       */
      householdCd:
        | tags.Constant<"SIGL", { title: "싱글가구" }>
        | tags.Constant<"NEMR", { title: "신혼가구" }>
        | tags.Constant<"BABY", { title: "유아자녀가구" }>
        | tags.Constant<"CHID", { title: "청소년자녀가구" }>
        | tags.Constant<"ADLT", { title: "성인자녀가구" }>
        | tags.Constant<"SILV", { title: "실버가구" }>
        | null;

      /**
       * @title 구매율
       */
      salesRate: number | null;

      /**
       * @title 수정시간
       */
      modifiedDate: string | null;
    }[];
  }

  export interface IFindsaleshouseholdInput {
    /**
     * @title 혁신의숲 기업 Key
     */
    corpUniqNum: string &
      Prerequisite<{
        method: "post";
        path: "/connector/innoforest/search";
        jmesPath: "companies[].{label: companyName, value: corpUniqNum}";
      }>;
  }

  export interface IFindsalesincomeOutput extends IInnoforest.ICommonResponse {
    /**
     * @title 응답 데이터
     */
    data?: {
      /**
       * @title 혁신의숲 기업 Key
       */
      corpId: string & tags.MaxLength<10>;

      /**
       * @title 사업자등록번호
       */
      corpUniqNum: string & tags.MaxLength<10>;

      /**
       * @title 거래기준일
       */
      salesFrom: string & tags.MaxLength<10>;

      /**
       * 소비자 유형 중 가족 구성의 소득 수준을 의미한다
       *
       * @title 가족구성
       */
      householdCd:
        | tags.Constant<"I020", { title: "2000만원이하" }>
        | tags.Constant<"I030", { title: "3000만원이하" }>
        | tags.Constant<"I040", { title: "4000만원이하" }>
        | tags.Constant<"I050", { title: "5000만원이하" }>
        | tags.Constant<"I060", { title: "6000만원이하" }>
        | tags.Constant<"I080", { title: "8000만원이하" }>
        | tags.Constant<"I100", { title: "1억이하" }>
        | tags.Constant<"I101", { title: "1억초과" }>
        | null;

      /**
       * @title 구매율
       */
      salesRate: number | null;

      /**
       * @title 수정시간
       */
      modifiedDate: string | null;
    }[];
  }

  export interface IFindsalesincomeInput {
    /**
     * @title 혁신의숲 기업 Key
     */
    corpUniqNum: string &
      Prerequisite<{
        method: "post";
        path: "/connector/innoforest/search";
        jmesPath: "companies[].{label: companyName, value: corpUniqNum}";
      }>;
  }

  export interface IFindinvestOutput extends IInnoforest.ICommonResponse {
    /**
     * @title 응답 데이터
     */
    data?: {
      /**
       * @title 혁신의숲 기업 Key
       */
      corpId: string & tags.MaxLength<10>;

      /**
       * @title 사업자등록번호
       */
      corpUniqNum: string & tags.MaxLength<10>;

      /**
       * @title 혁신의숲 투자이력 key
       */
      id: number & tags.Type<"int64">;

      /**
       * @title 투자일
       */
      invstAt: string & tags.Format<"date">;

      /**
       * @title 투자단계코드
       */
      invstCd:
        | tags.Constant<"10", { title: "seed" }>
        | tags.Constant<"11", { title: "seed (추정)" }>
        | tags.Constant<"15", { title: "pre-A" }>
        | tags.Constant<"16", { title: "pre-A (추정)" }>
        | tags.Constant<"20", { title: "pre-B" }>
        | tags.Constant<"21", { title: "pre-B (추정)" }>
        | tags.Constant<"30", { title: "series A" }>
        | tags.Constant<"31", { title: "series A (추정)" }>
        | tags.Constant<"32", { title: "series B" }>
        | tags.Constant<"33", { title: "series B (추정)" }>
        | tags.Constant<"34", { title: "series C" }>
        | tags.Constant<"35", { title: "series C (추정)" }>
        | tags.Constant<"36", { title: "series D" }>
        | tags.Constant<"37", { title: "series D (추정)" }>
        | tags.Constant<"38", { title: "series E" }>
        | tags.Constant<"39", { title: "series E (추정)" }>
        | tags.Constant<"40", { title: "series F" }>
        | tags.Constant<"41", { title: "series F (추정)" }>
        | tags.Constant<"42", { title: "series G" }>
        | tags.Constant<"43", { title: "series G (추정)" }>
        | tags.Constant<"50", { title: "pre-IPO" }>
        | tags.Constant<"51", { title: "pre-IPO (추정)" }>
        | tags.Constant<"55", { title: "IPO" }>
        | tags.Constant<"56", { title: "IPO (추정)" }>
        | tags.Constant<"60", { title: "지원금" }>
        | tags.Constant<"61", { title: "지원금 (추정)" }>
        | tags.Constant<"65", { title: "주식양수도" }>
        | tags.Constant<"66", { title: "주식양수도 (추정)" }>
        | tags.Constant<"70", { title: "M&A" }>
        | tags.Constant<"71", { title: "M&A (추정)" }>
        | tags.Constant<"99", { title: "비공개" }>;

      /**
       * @title 투자금액
       */
      invstVal: (number & tags.Type<"int64">) | `${number}` | null;

      /**
       * @title 투자단계한글
       */
      invstCdKr: (string & tags.MaxLength<50>) | null;

      /**
       * @title 투자자한글
       */
      invstFromKr: (string & tags.MaxLength<2000>) | null;
    }[];
  }

  export interface IFindinvestInput {
    /**
     * @title 혁신의숲 기업 Key
     */
    corpUniqNum: string &
      Prerequisite<{
        method: "post";
        path: "/connector/innoforest/search";
        jmesPath: "companies[].{label: companyName, value: corpUniqNum}";
      }>;
  }

  export interface IFindpatentOutput extends IInnoforest.ICommonResponse {
    /**
     * @title 응답 데이터
     */
    data?: {
      /**
       * @title 혁신의숲 기업 Key
       */
      corpId: string & tags.MaxLength<10>;

      /**
       * @title 사업자등록번호
       */
      corpUniqNum: string & tags.MaxLength<10>;

      /**
       * @title 혁신의숲 특허 이력 Key
       */
      id: number & tags.Type<"int64">;

      /**
       * @title 특허출원일
       */
      patntAt: string & tags.MaxLength<10>;

      /**
       * @title 특허출원번호
       */
      patntOrgId: string & tags.MaxLength<100>;

      /**
       * @title 출원인
       */
      patntName: (string & tags.MaxLength<500>) | null;

      /**
       * @title 출원대표자명
       */
      patntRepName: (string & tags.MaxLength<500>) | null;

      /**
       * @title 현재소유자명
       */
      patntOwnName: (string & tags.MaxLength<500>) | null;

      /**
       * @title 특허제목
       */
      patntTitle: string | null;

      /**
       * @title 특허요약
       */
      patntSummr: string | null;

      /**
       * @title 수정시간
       */
      modifiedDate: string | null;
    }[];
  }

  export interface IFindpatentInput {
    /**
     * @title 혁신의숲 기업 Key
     */
    corpUniqNum: string &
      Prerequisite<{
        method: "post";
        path: "/connector/innoforest/search";
        jmesPath: "companies[].{label: companyName, value: corpUniqNum}";
      }>;
  }

  export interface IFindpatentwordOutput extends IInnoforest.ICommonResponse {
    /**
     * @title 응답 데이터
     */
    data?: {
      /**
       * @title 혁신의숲 기업 Key
       */
      corpId: string & tags.MaxLength<10>;

      /**
       * @title 사업자등록번호
       */
      corpUniqNum: string & tags.MaxLength<10>;

      /**
       * @title 특허키워드
       */
      patntWord: (string & tags.MaxLength<500>) | null;

      /**
       * @title 언급량
       */
      patntWordVal: (number & tags.Type<"int64">) | null;

      /**
       * @title 수정시간
       */
      modifiedDate: string | null;
    }[];
  }

  export interface IFindpatentwordInput {
    /**
     * @title 혁신의숲 기업 Key
     */
    corpUniqNum: string &
      Prerequisite<{
        method: "post";
        path: "/connector/innoforest/search";
        jmesPath: "companies[].{label: companyName, value: corpUniqNum}";
      }>;
  }

  export interface IFindfinanceOutput extends IInnoforest.ICommonResponse {
    /**
     * @title 응답 데이터
     */
    data?: {
      /**
       * @title 혁신의숲 기업 Key
       */
      corpId: string & tags.MaxLength<10>;

      /**
       * @title 사업자등록번호
       */
      corpUniqNum: string & tags.MaxLength<10>;

      /**
       * @title 결산기준일
       */
      finacAt: string & tags.Format<"date">;

      /**
       * @title 결산타입
       */
      finacType: string & tags.MaxLength<100>;

      /**
       * @title 결산대상
       */
      finacTgt: string & tags.MaxLength<100>;

      /**
       * @title 금액
       */
      finacVal: number | (string & tags.MaxLength<500>) | `${number}` | null;

      /**
       * @title 수정시간
       */
      modifiedDate: string | null;
    }[];
  }

  export interface IFindfinanceInput {
    /**
     * @title 혁신의숲 기업 Key
     */
    corpUniqNum: string &
      Prerequisite<{
        method: "post";
        path: "/connector/innoforest/search";
        jmesPath: "companies[].{label: companyName, value: corpUniqNum}";
      }>;
  }

  export interface IFindemployeeOutput extends IInnoforest.ICommonResponse {
    /**
     * @title 응답 데이터
     */
    data?: {
      /**
       * @title 혁신의숲 기업 Key
       */
      corpId: string & tags.MaxLength<10>;

      /**
       * @title 사업자등록번호
       */
      corpUniqNum: string & tags.MaxLength<10>;

      /**
       * @title 고용기준일
       */
      empFrom: string & tags.MaxLength<10>;

      /**
       * @title 고용인원수
       */
      empWholeVal: (number & tags.Type<"int64">) | null;

      /**
       * @title 입사자수
       */
      empInVal: (number & tags.Type<"int64">) | null;

      /**
       * @title 퇴사자수
       */
      empOutVal: (number & tags.Type<"int64">) | null;

      /**
       * @title 수정시간
       */
      modifiedDate: string | null;
    }[];
  }

  export interface IFindemployeeInput {
    /**
     * @title 혁신의숲 기업 Key
     */
    corpUniqNum: string &
      Prerequisite<{
        method: "post";
        path: "/connector/innoforest/search";
        jmesPath: "companies[].{label: companyName, value: corpUniqNum}";
      }>;
  }

  export interface IFindpressOutput extends IInnoforest.ICommonResponse {
    /**
     * @title 응답 데이터
     */
    data?: {
      /**
       * @title 혁신의숲 기업 Key
       */
      corpId: string & tags.MaxLength<10>;

      /**
       * @title 사업자등록번호
       */
      corpUniqNum: string & tags.MaxLength<10>;

      /**
       * @title 보도자료데이터key
       */
      id: number & tags.Type<"int64">;

      /**
       * @title 보도일
       */
      pressAt: string & tags.MaxLength<10>;

      /**
       * @title 보도자료유형
       */
      pressTypeCd: (string & tags.MaxLength<1>) | null;

      /**
       * @title 보도자료제목
       */
      pressTitle: (string & tags.MaxLength<500>) | null;

      /**
       * @title 보도자료링크
       */
      pressUrl: (string & tags.MaxLength<500>) | null;

      /**
       * @title 수정시간
       */
      modifiedDate: string | null;
    }[];
  }

  export interface IFindpressInput {
    /**
     * @title 혁신의숲 기업 Key
     */
    corpUniqNum: string &
      Prerequisite<{
        method: "post";
        path: "/connector/innoforest/search";
        jmesPath: "companies[].{label: companyName, value: corpUniqNum}";
      }>;
  }
}
