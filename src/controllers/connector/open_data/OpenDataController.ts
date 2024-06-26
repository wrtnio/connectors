import { TypedBody, TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Standalone } from "@wrtn/decorators";

import { ILH } from "@wrtn/connector-api/lib/structures/connector/open_data/ILH";
import { IMOLIT } from "@wrtn/connector-api/lib/structures/connector/open_data/IMOLIT";
import { INIA } from "@wrtn/connector-api/lib/structures/connector/open_data/INIA";
import { IOpenData } from "@wrtn/connector-api/lib/structures/connector/open_data/IOpenData";

import { OpenDataProvider } from "../../../providers/connector/open_data/OpenDataProvider";

@Controller("connector/open-data")
export class OpenDataController {
  /**
   *
   * @param input 조회 조건
   * @returns 조회한 전세, 월세 정보
   */
  @ApiTags("주거", "아파트", "월세", "전세")
  @TypedRoute.Post("getRTMSDataSvcAptRent")
  async getRTMSDataSvcAptRent(
    @TypedBody() input: IMOLIT.IGetRTMSDataSvcAptRentInput,
  ): Promise<IMOLIT.IGetRTMSDataSvcAptRentOutput> {
    return OpenDataProvider.getRTMSDataSvcAptRent(input);
  }

  /**
   * [한국토지주택공사] LH 임대주택 단지를 조회합니다.
   *
   * @summary LH 임대주택 조회
   * @param input 조회할 임대주택 조건
   * @returns LH 임대주택 정보
   */
  @ApiTags("LH", "주거", "임대주택", "행복주택")
  @TypedRoute.Post("getLHLeaseInfo")
  async getLHLeaseInfo(
    @TypedBody() input: ILH.IGetLHLeaseInfoInput,
  ): Promise<ILH.IGetLHLeaseInfoOutput> {
    return OpenDataProvider.getLHLeaseInfo(input);
  }

  /**
   * [한국지능정보사회진흥원] 주차장 정보를 조회합니다.
   *
   * @summary 주차장 조회
   * @param input 주차장 조회 조건
   * @returns 주차장 정보
   */
  @ApiTags("주차장", "주차")
  @TypedRoute.Post("getParkingLot")
  async getParkingLot(
    @TypedBody() input: INIA.IGetParkingLotInput,
  ): Promise<INIA.IGetParkingLotOutput> {
    return OpenDataProvider.getParkingLot(input);
  }

  /**
   * [국토교통부] 건축물대장정보를 조회합니다.
   *
   * @summary 건축물대장정보 조회
   * @param input 빌딩 정보를 조회하는 조건
   * @returns 빌딩 정보
   */
  @ApiTags("건축물", "빌딩", "내진설계", "건축물대장정보")
  @TypedRoute.Post("getBuildingInfo")
  async getBuildingInfo(
    @TypedBody() input: IMOLIT.GetBuildingInfoInput,
  ): Promise<IMOLIT.GetBuildingInfoOutput> {
    return OpenDataProvider.getBuildingInfo(input);
  }

  /**
   * [행정안전부] 국내 지역의 행정 표준 상 코드를 조회합니다.
   *
   * @summary 행정표준 코드 조회
   * @param input 조회할 지역 조건
   * @returns 지역 코드
   */
  @Standalone()
  @ApiTags("행정구역", "지역구", "읍면동", "시도", "시군구")
  @TypedRoute.Post("getStandardRegionCodeList")
  async getStandardRegionCodeList(
    @TypedBody()
    input: IOpenData.MinistryOfTheInteriorAndSafety.IGetStandardRegionCodeListInput,
  ): Promise<IOpenData.MinistryOfTheInteriorAndSafety.IGetStandardRegionCodeListOutput> {
    return OpenDataProvider.getStandardRegionCodeList(input);
  }

  /**
   * [금융위원회] 시가총액과 주식 정보를 조회합니다.
   *
   * @summary 시가총액 및 주식 정보 조회
   *
   * @param input 시가총액 조회를 위한 조건
   * @returns 시가 총액 및 주식 정보
   */
  @Standalone()
  @ApiTags("주식", "시가총액", "기업", "자본")
  @TypedRoute.Post("getStockPriceInfo")
  async getStockPriceInfo(
    @TypedBody()
    input: IOpenData.FinancialServicesCommission.IGetStockPriceInfoInput,
  ): Promise<IOpenData.FinancialServicesCommission.IGetStockPriceInfoOutput> {
    return OpenDataProvider.getStockPriceInfo(input);
  }

  /**
   * [기상청] 오늘 날씨를 조회합니다.
   *
   * @summary 기상청 오늘 날씨 조회
   *
   * @param input 날씨 조회를 위한 위치 정보 DTO
   * @returns 해당 지역의 기상 정보
   */
  @Standalone()
  @ApiTags("날씨", "기상청", "오늘 날씨", "기후")
  @TypedRoute.Post("getShortTermForecast")
  async getShortTermForecast(
    @TypedBody()
    input: IOpenData.IKoreaMeteorologicalAdministration.IGetVillageForecastInformationInput,
  ): Promise<IOpenData.IKoreaMeteorologicalAdministration.IGetVillageForecastInformationOutput> {
    return OpenDataProvider.getShortTermForecast(input);
  }
}
