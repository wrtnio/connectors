import { JMESPath, Placeholder, Prerequisite } from "@wrtnio/decorators";
import { tags } from "typia";

import { StrictOmit } from "../../../../utils/strictOmit";
import { IOpenData } from "./IOpenData";

/**
 * @title Ministry of Land, Infrastructure and Transport Type
 */
export namespace IMOLIT {
  export interface ICommonPaginationOutput {
    /**
     * @title nextPage
     *
     * Indicates whether the next page exists
     */
    nextPage: boolean;
  }

  export interface ICommonPaginationInput {
    /**
     * @title page
     */
    page: number & tags.Type<"uint64">;

    /**
     * @title limit
     */
    limit: number & tags.Type<"uint64"> & tags.Minimum<1> & tags.Maximum<20>;
  }

  export interface ICommonPaginationOutput {
    /**
     * @title nextPage
     */
    nextPage: boolean;
  }

  export interface IGetRTMSDataSvcAptRentInput extends ICommonPaginationInput {
    /**
     * @title City/county/district code
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
     * @title Contract year and month of actual transaction data (6 digits)
     */
    DEAL_YMD: string & Placeholder<"202201">;
  }

  export interface IGetRTMSDataSvcAptRentOutput
    extends ICommonPaginationOutput {
    data: BuildingLentInfo[];
  }

  export type IgetRTMSDataSvcSHRentInput = IGetRTMSDataSvcAptRentInput;
  export interface IgetRTMSDataSvcSHRentOutput extends ICommonPaginationOutput {
    data: StrictOmit<
      BuildingLentInfo,
      "apartment" | "exclusiveArea" | "lotNumber" | "floor"
    >[];
  }

  export type IGetRTMSDataSvcOffiRentInput = IGetRTMSDataSvcAptRentInput;

  export interface IGetRTMSDataSvcOffiRentOutput
    extends ICommonPaginationOutput {
    data: StrictOmit<
      BuildingLentInfo,
      "depositAmount" | "monthlyRentAmount" | "apartment" | "yearOfConstruction"
    >[];
  }

  /**
   * @title Building search conditions
   */
  export interface GetBuildingInfoInput
    extends IOpenData.ICommon.IPaginationInput {
    /**
     * @title City/county/district code
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
     * @title Beopjeong-dong Code
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
   * @title Building Inquiry Response
   */
  export interface GetBuildingInfoOutput
    extends IOpenData.ICommon.IPaginationOutput {
    /**
     * @title Building Information List
     */
    bulidings: Building[];
  }

  export interface Building {
    /**
     * @title Primary purpose code name
     */
    mainPurpsCdNm?: string;

    /**
     * @title Other uses
     */
    etcPurps?: string;

    /**
     * @title roof code
     */
    roofCd?: number | `${number}` | string;

    /**
     * @title Roof code name
     */
    roofCdNm?: string;

    /**
     * @title Guitar Roof
     */
    etcRoof?: string;

    /**
     * @title Number of generations (generation)
     */
    hhldCnt?: number;

    /**
     * @title Number of households (households)
     */
    fmlyCnt?: number;

    /**
     * @title Height (m)
     */
    heit?: number;

    /**
     * @title Number of floors above ground
     */
    grndFlrCnt?: number;

    /**
     * @title Basement floor
     */
    ugrndFlrCnt?: number;

    /**
     * @title Elevator driver
     */
    rideUseElvtCnt?: number;

    /**
     * @title Emergency Elevator
     */
    emgenUseElvtCnt?: number;

    /**
     * @title Number of auxiliary buildings
     */
    atchBldCnt?: number;

    /**
     * @title Area of attached building (㎡)
     */
    atchBldArea?: number;

    /**
     * @title Total floor area (㎡)
     */
    totDongTotArea?: number;

    /**
     * @title Indoor machine counter (large)
     */
    indrMechUtcnt?: number;

    /**
     * @title Indoor mechanical area (㎡)
     */
    indrMechArea?: number;

    /**
     * @title Outdoor mechanical counter (large)
     */
    oudrMechUtcnt?: number;

    /**
     * @title Outdoor mechanical area (㎡)
     */
    oudrMechArea?: number;

    /**
     * @title Indoor self-sufficient stock (large)
     */
    indrAutoUtcnt?: number;

    /**
     * @title Indoor self-sufficient area (㎡)
     */
    indrAutoArea?: number;

    /**
     * @title Outdoor self-propelled vehicle (large)
     */
    oudrAutoUtcnt?: number;

    /**
     * @title Outdoor self-contained area (㎡)
     */
    oudrAutoArea?: number;

    /**
     * @title Permission Date
     */
    pmsDay?: string | `${number}` | number;

    /**
     * @title Start date
     */
    stcnsDay?: string | `${number}` | number;

    /**
     * @title Date of approval for use
     */
    useAprDay?: string | `${number}` | number;

    /**
     * @title License number year
     */
    pmsnoYear?: string | `${number}` | number;

    /**
     * @title License Number Agency Code
     */
    pmsnoKikCd?: number | `${number}` | string;

    /**
     * @title License Number Agency Code Name
     */
    pmsnoKikCdNm?: string;

    /**
     * @title Permit number classification code
     */
    pmsnoGbCd?: number | `${number}` | string;

    /**
     * @title Permit number classification code name
     */
    pmsnoGbCdNm?: string;

    /**
     * @title lake
     */
    hoCnt?: number;

    /**
     * @title Energy Efficiency Rating
     */
    engrGrade?: string;

    /**
     * @title Energy saving rate
     */
    engrRat?: number;

    /**
     * @title EPI score
     */
    engrEpi?: number;

    /**
     * @title Eco-friendly building rating
     */
    gnBldGrade?: string | number;

    /**
     * @title Eco-friendly building certification score
     */
    gnBldCert?: number;

    /**
     * @title Intelligent Building Rating
     */
    itgBldGrade?: string;

    /**
     * @title Intelligent Building Certification Score
     */
    itgBldCert?: number;

    /**
     * @title Creation date
     */
    crtnDay: string | `${number}` | number;

    /**
     * @title order
     */
    rnum?: number;

    /**
     * @title Earth location
     */
    platPlc: string;

    /**
     * @title City/county/district code
     */
    sigunguCd: number | `${number}` | string;

    /**
     * @title Beopjeong-dong code
     */
    bjdongCd: number | `${number}` | string;

    /**
     * @title Earth Classification Code
     */
    platGbCd?: number | `${number}` | string;

    /**
     * @title number
     * @description One of the Korean address names
     */
    bun?: string;

    /**
     * @title Ji
     * @description One of the Korean address names
     */
    ji?: string;

    /**
     * @title Management Building Register PK
     */
    mgmBldrgstPk: string;

    /**
     * @title Colon Distinction Code
     */
    regstrGbCd?: number | `${number}` | string;

    /**
     * @title Colon division code name
     */
    regstrGbCdNm?: string;

    /**
     * @title Colon type code
     */
    regstrKindCd?: number | `${number}` | string;

    /**
     * @title Colon type code name
     */
    regstrKindCdNm?: string;

    /**
     * @title Road name site location
     */
    newPlatPlc?: string;

    /**
     * @title Building name
     */
    bldNm?: string;

    /**
     * @title Special place name
     */
    splotNm?: string;

    /**
     * @title block
     */
    block?: string;

    /**
     * @title lot
     */
    lot?: string;

    /**
     * @title External index
     */
    bylotCnt?: number;

    /**
     * @title New address road code
     */
    naRoadCd?: number | `${number}` | string;

    /**
     * @title New address law code
     */
    naBjdongCd?: number | `${number}` | string;

    /**
     * @title New address ground and underground code
     */
    naUgrndCd?: number | `${number}` | string;

    /**
     * @title New address number
     */
    naMainBun?: number;

    /**
     * @title New address number
     */
    naSubBun?: number;

    /**
     * @title Same name
     */
    dongNm?: string | number;

    /**
     * @title Main/Subordinate Classification Code
     */
    mainAtchGbCd?: number | `${number}` | string;

    /**
     * @title Main/Subordinate Code Name
     */
    mainAtchGbCdNm?: string;

    /**
     * @title Land area (㎡)
     */
    platArea?: number;

    /**
     * @title Building area (㎡)
     */
    archArea?: number;

    /**
     * @title Building coverage ratio (%)
     */
    bcRat?: number;

    /**
     * @title Total floor area (㎡)
     */
    totArea?: number;

    /**
     * @title Floor area ratio calculation area (㎡)
     */
    vlRatEstmTotArea?: number;

    /**
     * @title Volume ratio (%)
     */
    vlRat?: number;

    /**
     * @title Structure Code
     */
    strctCd?: number | `${number}` | string;

    /**
     * @title Structure code name
     */
    strctCdNm?: string;

    /**
     * @title Other Structures
     */
    etcStrct?: string;

    /**
     * @title Primary Purpose Code
     */
    mainPurpsCd?: number | `${number}` | string;

    /**
     * @title Whether earthquake-resistant design is applied
     */
    rserthqkDsgnApplyYn?:
      | tags.Constant<1, { title: "적용" }>
      | tags.Constant<0, { title: "미적용" }>
      | tags.Constant<" ", { title: "알 수 없음" }>;

    /**
     * @title seismic capacity
     */
    rserthqkAblty?: string;
  }

  export interface OriginalBuildingLentInfo {
    /**
     * @title Use of renewal request right
     */
    갱신요구권사용: string;

    /**
     * @title Year of construction
     */
    건축년도?: string | `${number}` | number;

    /**
     * @title Contract type
     */
    계약구분: string;

    /**
     * @title Contract period
     */
    계약기간: string;

    /**
     * @title year
     */
    년: string | `${number}` | number;

    /**
     * @title Beopjeong-dong
     */
    법정동: string;

    /**
     * @title Deposit amount
     */
    보증금액: string | number;

    /**
     * @title Apartment
     */
    아파트: string;

    /**
     * @title month
     */
    월:
      | string
      | (number & tags.Type<"int32"> & tags.Minimum<1> & tags.Maximum<12>);

    /**
     * @title Monthly rent amount
     */
    월세금액: string | (number & tags.Type<"int32">);

    /**
     * @title day
     */
    일:
      | string
      | (number & tags.Type<"int32"> & tags.Minimum<1> & tags.Maximum<31>);

    /**
     * @title Exclusive area
     */
    전용면적: string | number;

    /**
     * @title Previous contract deposit
     */
    종전계약보증금: string | number;

    /**
     * @title Previous contract monthly rent
     */
    종전계약월세: string | number;

    /**
     * @title Address
     */
    지번: string | (number & tags.Type<"int32">);

    /**
     * @title area code
     */
    지역코드: string | number;

    /**
     * @title floor
     */
    층: string | (number & tags.Type<"int32">);
  }

  export interface BuildingLentInfo {
    /**
     * @title Use of renewal request right
     */
    useOfRenewalRight: string;

    /**
     * @title Year of construction
     */
    yearOfConstruction?: string | `${number}` | number;

    /**
     * @title Contract type
     */
    typeOfContract: string;

    /**
     * @title Contract period
     */
    contractPeriod: string;

    /**
     * @title year
     */
    year: string | `${number}` | number;

    /**
     * @title Beopjeong-dong
     */
    legalDistrict: string;

    /**
     * @title Deposit amount
     *
     * Since it is based on Korean currency, it will be in ten thousand won in most cases.
     */
    depositAmount: string | number;

    /**
     * @title Apartment
     */
    apartment: string;

    /**
     * @title month
     */
    month:
      | string
      | (number & tags.Type<"int32"> & tags.Minimum<1> & tags.Maximum<12>);

    /**
     * @title Monthly rent
     *
     * Since it is based on Korean currency, it will be in ten thousand won in most cases.
     */
    monthlyRentAmount: string | (number & tags.Type<"int32">);

    /**
     * @title day
     */
    day:
      | string
      | (number & tags.Type<"int32"> & tags.Minimum<1> & tags.Maximum<31>);

    /**
     * @title Exclusive area
     */
    exclusiveArea: string | number;

    /**
     * @title Previous contract deposit
     */
    previousContractDeposit: string | number;

    /**
     * @title Previous contract monthly rent
     */
    previousContractMonthlyRent: string | number;

    /**
     * @title Address
     */
    lotNumber: string | (number & tags.Type<"int32">);

    /**
     * @title area code
     */
    areaCode: string | number;

    /**
     * @title floor
     */
    floor: string | (number & tags.Type<"int32">);
  }
}
