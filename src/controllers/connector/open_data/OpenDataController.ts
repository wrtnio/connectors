import { TypedBody, TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { Standalone } from "@wrtn/decorators";

import { IOpenData } from "@wrtn/connector-api/lib/structures/connector/open_data/IOpenData";

import { OpenDataProvider } from "../../../providers/connector/open_data/OpenDataProvider";

@Controller("connector/open-data")
export class OpenDataController {
  @Standalone()
  @TypedRoute.Post("getStockPriceInfo")
  async getStockPriceInfo(
    @TypedBody()
    input: IOpenData.FinancialServicesCommission.IGetStockPriceInfoInput,
  ): Promise<IOpenData.FinancialServicesCommission.IGetStockPriceInfoOutput> {
    return null!;
  }

  /**
   * 오늘 날씨를 조회합니다.
   *
   * @summary 기상청 오늘 날씨 조회.
   *
   * @param input 날씨 조회를 위한 위치 정보 DTO.
   * @returns 해당 지역의 기상 정보.
   */
  @Standalone()
  @TypedRoute.Post("getShortTermForecast")
  async getShortTermForecast(
    @TypedBody()
    input: IOpenData.IKoreaMeteorologicalAdministration.IGetVillageForecastInformationInput,
  ): Promise<IOpenData.IKoreaMeteorologicalAdministration.IGetVillageForecastInformationOutput> {
    return OpenDataProvider.getShortTermForecast(input);
  }
}
