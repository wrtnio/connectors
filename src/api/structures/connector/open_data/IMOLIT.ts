import { JMESPath, Placeholder, Prerequisite } from "@wrtnio/decorators";
import { tags } from "typia";

import { StrictOmit } from "../../../../utils/strictOmit";
import { IOpenData } from "./IOpenData";

/**
 * @title 국토교통부 타입
 */
export namespace IMOLIT {
  export interface IGetRTMSDataSvcAptRentInput {
    /**
     * @title 시군구 코드
     */
    LAWD_CD: string &
      Prerequisite<{
        method: "post";
        path: "/connector/open-data/getStandardRegionCodeList";
        jmesPath: JMESPath<
          IOpenData.MinistryOfTheInteriorAndSafety.IGetStandardRegionCodeListOutput,
          "rows[].{value:sigunguCd, label:sigunguNm}"
        >;
      }>;

    /**
     * @title 실거래 자료의 계약년월(6자리)
     */
    DEAL_YMD: string & Placeholder<"202201">;
  }

  export interface IGetRTMSDataSvcAptRentOutput {
    data: BuildingLentInfo[];
  }

  export type IgetRTMSDataSvcSHRentInput = IGetRTMSDataSvcAptRentInput;
  export interface IgetRTMSDataSvcSHRentOutput {
    data: StrictOmit<
      BuildingLentInfo,
      "apartment" | "exclusiveArea" | "lotNumber" | "floor"
    >[];
  }

  export type IGetRTMSDataSvcOffiRentInput = IGetRTMSDataSvcAptRentInput;

  export interface IGetRTMSDataSvcOffiRentOutput {
    data: StrictOmit<
      BuildingLentInfo,
      "depositAmount" | "monthlyRentAmount" | "apartment" | "yearOfConstruction"
    >[];
  }

  /**
   * @title 빌딩 조회 조건
   */
  export interface GetBuildingInfoInput
    extends IOpenData.ICommon.IPaginationInput {
    /**
     * @title 시군구 코드
     */
    sigunguCd: string &
      Prerequisite<{
        method: "post";
        path: "/connector/open-data/getStandardRegionCodeList";
        jmesPath: JMESPath<
          IOpenData.MinistryOfTheInteriorAndSafety.IGetStandardRegionCodeListOutput,
          "rows[].{value:sigunguCd, label:sigunguNm}"
        >;
      }>;
    /**
     * @title 법정동 코드
     */
    bjdongCd: string &
      Prerequisite<{
        method: "post";
        path: "/connector/open-data/getStandardRegionCodeList";
        jmesPath: JMESPath<
          IOpenData.MinistryOfTheInteriorAndSafety.IGetStandardRegionCodeListOutput,
          "rows[].{value:sigunguCd, label:sigunguNm}"
        >;
      }>;
  }

  /**
   * @title 빌딩 조회 응답
   */
  export interface GetBuildingInfoOutput
    extends IOpenData.ICommon.IPaginationOutput {
    /**
     * @title 빌딩 정보 목록
     */
    bulidings: Building[];
  }

  export interface Building {
    /**
     * @title 주용도코드명
     */
    mainPurpsCdNm?: string;

    /**
     * @title 기타용도
     */
    etcPurps?: string;

    /**
     * @title 지붕코드
     */
    roofCd?: number | `${number}` | string;

    /**
     * @title 지붕코드명
     */
    roofCdNm?: string;

    /**
     * @title 기타지붕
     */
    etcRoof?: string;

    /**
     * @title 세대수(세대)
     */
    hhldCnt?: number;

    /**
     * @title 가구수(가구)
     */
    fmlyCnt?: number;

    /**
     * @title 높이(m)
     */
    heit?: number;

    /**
     * @title 지상층수
     */
    grndFlrCnt?: number;

    /**
     * @title 지하층수
     */
    ugrndFlrCnt?: number;

    /**
     * @title 승용승강기수
     */
    rideUseElvtCnt?: number;

    /**
     * @title 비상용승강기수
     */
    emgenUseElvtCnt?: number;

    /**
     * @title 부속건축물수
     */
    atchBldCnt?: number;

    /**
     * @title 부속건축물면적(㎡)
     */
    atchBldArea?: number;

    /**
     * @title 총동연면적(㎡)
     */
    totDongTotArea?: number;

    /**
     * @title 옥내기계식대수(대)
     */
    indrMechUtcnt?: number;

    /**
     * @title 옥내기계식면적(㎡)
     */
    indrMechArea?: number;

    /**
     * @title 옥외기계식대수(대)
     */
    oudrMechUtcnt?: number;

    /**
     * @title 옥외기계식면적(㎡)
     */
    oudrMechArea?: number;

    /**
     * @title 옥내자주식대수(대)
     */
    indrAutoUtcnt?: number;

    /**
     * @title 옥내자주식면적(㎡)
     */
    indrAutoArea?: number;

    /**
     * @title 옥외자주식대수(대)
     */
    oudrAutoUtcnt?: number;

    /**
     * @title 옥외자주식면적(㎡)
     */
    oudrAutoArea?: number;

    /**
     * @title 허가일
     */
    pmsDay?: string | `${number}` | number;

    /**
     * @title 착공일
     */
    stcnsDay?: string | `${number}` | number;

    /**
     * @title 사용승인일
     */
    useAprDay?: string | `${number}` | number;

    /**
     * @title 허가번호년
     */
    pmsnoYear?: string | `${number}` | number;

    /**
     * @title 허가번호기관코드
     */
    pmsnoKikCd?: number | `${number}` | string;

    /**
     * @title 허가번호기관코드명
     */
    pmsnoKikCdNm?: string;

    /**
     * @title 허가번호구분코드
     */
    pmsnoGbCd?: number | `${number}` | string;

    /**
     * @title 허가번호구분코드명
     */
    pmsnoGbCdNm?: string;

    /**
     * @title 호수(호)
     */
    hoCnt?: number;

    /**
     * @title 에너지효율등급
     */
    engrGrade?: string;

    /**
     * @title 에너지절감율
     */
    engrRat?: number;

    /**
     * @title EPI점수
     */
    engrEpi?: number;

    /**
     * @title 친환경건축물등급
     */
    gnBldGrade?: string;

    /**
     * @title 친환경건축물인증점수
     */
    gnBldCert?: number;

    /**
     * @title 지능형건축물등급
     */
    itgBldGrade?: string;

    /**
     * @title 지능형건축물인증점수
     */
    itgBldCert?: number;

    /**
     * @title 생성일자
     */
    crtnDay: string | `${number}` | number;

    /**
     * @title 순번
     */
    rnum?: number;

    /**
     * @title 대지위치
     */
    platPlc: string;

    /**
     * @title 시군구코드
     */
    sigunguCd: number | `${number}` | string;

    /**
     * @title 법정동코드
     */
    bjdongCd: number | `${number}` | string;

    /**
     * @title 대지구분코드
     */
    platGbCd?: number | `${number}` | string;

    /**
     * @title 번
     * @description 한국 주소 명칭 중 하나
     */
    bun?: string;

    /**
     * @title 지
     * @description 한국 주소 명칭 중 하나
     */
    ji?: string;

    /**
     * @title 관리건축물대장PK
     */
    mgmBldrgstPk: string;

    /**
     * @title 대장구분코드
     */
    regstrGbCd?: number | `${number}` | string;

    /**
     * @title 대장구분코드명
     */
    regstrGbCdNm?: string;

    /**
     * @title 대장종류코드
     */
    regstrKindCd?: number | `${number}` | string;

    /**
     * @title 대장종류코드명
     */
    regstrKindCdNm?: string;

    /**
     * @title 도로명대지위치
     */
    newPlatPlc?: string;

    /**
     * @title 건물명
     */
    bldNm?: string;

    /**
     * @title 특수지명
     */
    splotNm?: string;

    /**
     * @title 블록
     */
    block?: string;

    /**
     * @title 로트
     */
    lot?: string;

    /**
     * @title 외필지수
     */
    bylotCnt?: number;

    /**
     * @title 새주소도로코드
     */
    naRoadCd?: number | `${number}` | string;

    /**
     * @title 새주소법정동코드
     */
    naBjdongCd?: number | `${number}` | string;

    /**
     * @title 새주소지상지하코드
     */
    naUgrndCd?: number | `${number}` | string;

    /**
     * @title 새주소본번
     */
    naMainBun?: number;

    /**
     * @title 새주소부번
     */
    naSubBun?: number;

    /**
     * @title 동명칭
     */
    dongNm?: string | number;

    /**
     * @title 주부속구분코드
     */
    mainAtchGbCd?: number | `${number}` | string;

    /**
     * @title 주부속구분코드명
     */
    mainAtchGbCdNm?: string;

    /**
     * @title 대지면적(㎡)
     */
    platArea?: number;

    /**
     * @title 건축면적(㎡)
     */
    archArea?: number;

    /**
     * @title 건폐율(%)
     */
    bcRat?: number;

    /**
     * @title 연면적(㎡)
     */
    totArea?: number;

    /**
     * @title 용적률산정연면적(㎡)
     */
    vlRatEstmTotArea?: number;

    /**
     * @title 용적률(%)
     */
    vlRat?: number;

    /**
     * @title 구조코드
     */
    strctCd?: number | `${number}` | string;

    /**
     * @title 구조코드명
     */
    strctCdNm?: string;

    /**
     * @title 기타구조
     */
    etcStrct?: string;

    /**
     * @title 주용도코드
     */
    mainPurpsCd?: number | `${number}` | string;

    /**
     * @title 내진설계적용여부
     */
    rserthqkDsgnApplyYn?:
      | tags.Constant<1, { title: "적용" }>
      | tags.Constant<0, { title: "미적용" }>
      | tags.Constant<" ", { title: "알 수 없음" }>;

    /**
     * @title 내진능력
     */
    rserthqkAblty?: string;
  }

  export interface OriginalBuildingLentInfo {
    /**
     * @title 갱신요구권사용
     */
    갱신요구권사용: string;

    /**
     * @title 건축년도
     */
    건축년도?: string | `${number}` | number;

    /**
     * @title 계약구분
     */
    계약구분: string;

    /**
     * @title 계약기간
     */
    계약기간: string;

    /**
     * @title 년
     */
    년: string | `${number}` | number;

    /**
     * @title 법정동
     */
    법정동: string;

    /**
     * @title 보증금액
     */
    보증금액: string | number;

    /**
     * @title 아파트
     */
    아파트: string;

    /**
     * @title 월
     */
    월:
      | string
      | (number & tags.Type<"int32"> & tags.Minimum<1> & tags.Maximum<12>);

    /**
     * @title 월세금액
     */
    월세금액: string | (number & tags.Type<"int32">);

    /**
     * @title 일
     */
    일:
      | string
      | (number & tags.Type<"int32"> & tags.Minimum<1> & tags.Maximum<31>);

    /**
     * @title 전용면적
     */
    전용면적: string | number;

    /**
     * @title 종전계약보증금
     */
    종전계약보증금: string | number;

    /**
     * @title 종전계약월세
     */
    종전계약월세: string | number;

    /**
     * @title 지번
     */
    지번: string | (number & tags.Type<"int32">);

    /**
     * @title 지역코드
     */
    지역코드: string | number;

    /**
     * @title 층
     */
    층: string | (number & tags.Type<"int32">);
  }

  export interface BuildingLentInfo {
    /**
     * @title 갱신요구권사용
     */
    useOfRenewalRight: string;

    /**
     * @title 건축년도
     */
    yearOfConstruction?: string | `${number}` | number;

    /**
     * @title 계약구분
     */
    typeOfContract: string;

    /**
     * @title 계약기간
     */
    contractPeriod: string;

    /**
     * @title 년
     */
    year: string | `${number}` | number;

    /**
     * @title 법정동
     */
    legalDistrict: string;

    /**
     * @title 보증금액
     */
    depositAmount: string | number;

    /**
     * @title 아파트
     */
    apartment: string;

    /**
     * @title 월
     */
    month:
      | string
      | (number & tags.Type<"int32"> & tags.Minimum<1> & tags.Maximum<12>);

    /**
     * @title 월세금액
     */
    monthlyRentAmount: string | (number & tags.Type<"int32">);

    /**
     * @title 일
     */
    day:
      | string
      | (number & tags.Type<"int32"> & tags.Minimum<1> & tags.Maximum<31>);

    /**
     * @title 전용면적
     */
    exclusiveArea: string | number;

    /**
     * @title 종전계약보증금
     */
    previousContractDeposit: string | number;

    /**
     * @title 종전계약월세
     */
    previousContractMonthlyRent: string | number;

    /**
     * @title 지번
     */
    lotNumber: string | (number & tags.Type<"int32">);

    /**
     * @title 지역코드
     */
    areaCode: string | number;

    /**
     * @title 층
     */
    floor: string | (number & tags.Type<"int32">);
  }
}
