import core, { TypedBody, TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { ILH } from "@wrtn/connector-api/lib/structures/connector/open_data/ILH";
import { IMOLIT } from "@wrtn/connector-api/lib/structures/connector/open_data/IMOLIT";
import { INIA } from "@wrtn/connector-api/lib/structures/connector/open_data/INIA";
import {
  IKoreaMeteorologicalAdministration,
  IOpenData,
} from "@wrtn/connector-api/lib/structures/connector/open_data/IOpenData";
import { KoreaCopyrightCommission } from "@wrtn/connector-api/lib/structures/connector/open_data/KoreaCopyrightCommission";

import { IMSIT } from "@wrtn/connector-api/lib/structures/connector/open_data/MSIT";
import { OpenDataProvider } from "../../../providers/connector/open_data/OpenDataProvider";
import { retry } from "../../../utils/retry";
import { ApiTags } from "@nestjs/swagger";

@Controller("connector/open-data")
export class OpenDataController {
  /**
   * Search for the address system of the Republic of Korea
   *
   * - If you enter a postal address, you can convert it to a street address and a road name address.
   *
   * @summary Search for the address system of the Republic of Korea
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/open_data.svg",
  )
  @ApiTags("Open Data")
  @TypedRoute.Post("getAddress")
  async getAddress(
    @TypedBody() input: IMSIT.IGetAddressInput,
  ): Promise<IMSIT.IGetAddressOutput> {
    return retry(() => OpenDataProvider.getAddress(input))();
  }

  /**
   * [Ministry of Land, Infrastructure and Transport] Retrieves information on single-family homes and multi-family homes for lease or rent.
   *
   * This Connect is based on data obtained from public data portals in Korea.
   * If you talk about a specific organization here, it is an organization in Korea, and information or deducible facts that data or statistics point to can also be limited to Korea.
   *
   * You need to look up the city, county, and district code first. (POST /connector/open-data/getStandardRegionCodeList connector)
   * A connector that looks up the distirct code already exists, so call the preceding connector.
   *
   * Since this is Korean public data, most searches may have to be done in Korean.
   * Please be aware of this.
   *
   * @summary Retrieve multi-family lease and rental information
   * @param input Query conditions
   * @returns Information on leases and rents
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/open_data.svg",
  )
  @ApiTags("Open Data")
  @TypedRoute.Post("getRTMSDataSvcSHRent")
  async getRTMSDataSvcSHRent(
    @TypedBody() input: IMOLIT.IgetRTMSDataSvcSHRentInput,
  ): Promise<IMOLIT.IgetRTMSDataSvcSHRentOutput> {
    return retry(() => OpenDataProvider.getRTMSDataSvcSHRent(input))();
  }

  /**
   * [Ministry of Land, Infrastructure and Transport] Retrieves officetel lease and rent information.
   *
   * This Connect is based on data obtained from public data portals in Korea.
   * If you talk about a specific organization here, it is an organization in Korea, and information or deducible facts that data or statistics point to can also be limited to Korea.
   *
   * You need to look up the city, county, and district code first. (POST /connector/open-data/getStandardRegionCodeList connector)
   * A connector that looks up the distirct code already exists, so call the preceding connector.
   *
   * Since this is Korean public data, most searches may have to be done in Korean.
   * Please be aware of this.
   *
   * @summary Retrieve officetel lease and rental information
   * @param input Query conditions
   * @returns Information on leases and rents
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/open_data.svg",
  )
  @ApiTags("Open Data")
  @TypedRoute.Post("getRTMSDataSvcOffiRent")
  async getRTMSDataSvcOffiRent(
    @TypedBody() input: IMOLIT.IGetRTMSDataSvcOffiRentInput,
  ): Promise<IMOLIT.IGetRTMSDataSvcOffiRentOutput> {
    return retry(() => OpenDataProvider.getRTMSDataSvcOffiRent(input))();
  }

  /**
   * [Ministry of Land, Infrastructure and Transport] Retrieves apartment lease and rent information.
   *
   * This Connect is based on data obtained from public data portals in Korea.
   * If you talk about a specific organization here, it is an organization in Korea, and information or deducible facts that data or statistics point to can also be limited to Korea.
   *
   * You need to look up the city, county, and district code first. (POST /connector/open-data/getStandardRegionCodeList connector)
   * A connector that looks up the distirct code already exists, so call the preceding connector.
   *
   * Since this is Korean public data, most searches may have to be done in Korean.
   * Please be aware of this.
   *
   * @summary Retrieve apartment lease and rental information
   * @param input Query conditions
   * @returns Information on leases and rents
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/open_data.svg",
  )
  @ApiTags("Open Data")
  @Standalone()
  @TypedRoute.Post("getRTMSDataSvcAptRent")
  async getRTMSDataSvcAptRent(
    @TypedBody() input: IMOLIT.IGetRTMSDataSvcAptRentInput,
  ): Promise<IMOLIT.IGetRTMSDataSvcAptRentOutput> {
    return retry(() => OpenDataProvider.getRTMSDataSvcAptRent(input))();
  }

  /**
   * [Korea Land and Housing Corporation] Retrieves information on LH rental housing complexes.
   *
   * This Connect is based on data obtained from public data portals in Korea.
   * If you talk about a specific organization here, it is an organization in Korea, and information or deducible facts that data or statistics point to can also be limited to Korea.
   *
   * Since this is Korean public data, most searches may have to be done in Korean.
   * The types of houses you can choose from here are one of the following: '국민임대','공공임대','영구임대','행복주택','장기전세','매입임대','전세임대'.
   * In addition, you can inquire by city, county, and region(=시도군)
   *
   * In the Korean urban system, inquiries can only be made at the level of '특별시', '광역시', '자치시', '자치도', '도', so if you want to see it in more detail, you should ask the user for pagenation.
   *
   * @summary Retrieve LH rental housing information
   * @param input Conditions for querying rental housing
   * @returns LH rental housing information
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/open_data.svg",
  )
  @ApiTags("Open Data")
  @Standalone()
  @TypedRoute.Post("getLHLeaseInfo")
  async getLHLeaseInfo(
    @TypedBody() input: ILH.IGetLHLeaseInfoInput,
  ): Promise<ILH.IGetLHLeaseInfoOutput> {
    return retry(() => OpenDataProvider.getLHLeaseInfo(input))();
  }

  /**
   * [National Information Society Agency] Retrieves parking lot information.
   *
   * This Connect is based on data obtained from public data portals in Korea.
   * If you talk about a specific organization here, it is an organization in Korea, and information or deducible facts that data or statistics point to can also be limited to Korea.
   * If you don't know the exact road name(도로명주소) or lot number address(지번주소), you can't search it.
   * Look up other public data connectors first or use map connectors to look up the correct address. (ex. kakao-map connector)
   *
   * Since this is Korean public data, most searches may have to be done in Korean.
   * Please be aware of this.
   *
   * @summary Retrieve parking lot information
   * @param input Conditions for querying parking lots
   * @returns Parking lot information
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/open_data.svg",
  )
  @ApiTags("Open Data")
  @Standalone()
  @TypedRoute.Post("getParkingLot")
  async getParkingLot(
    @TypedBody() input: INIA.IGetParkingLotInput,
  ): Promise<INIA.IGetParkingLotOutput> {
    return retry(() => OpenDataProvider.getParkingLot(input))();
  }

  /**
   * [Ministry of Land, Infrastructure and Transport] Retrieves building registration information.
   *
   * This Connect is based on data obtained from public data portals in Korea.
   * If you talk about a specific organization here, it is an organization in Korea, and information or deducible facts that data or statistics point to can also be limited to Korea.
   *
   * You need to look up the city, county, and district code first. (POST /connector/open-data/getStandardRegionCodeList connector)
   * A connector that looks up the distirct code already exists, so call the preceding connector.
   *
   * Since this is Korean public data, most searches may have to be done in Korean.
   * Please be aware of this.
   *
   * @summary Retrieve building registration information
   * @param input Conditions for querying building information
   * @returns Building information
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/open_data.svg",
  )
  @ApiTags("Open Data")
  @TypedRoute.Post("getBuildingInfo")
  async getBuildingInfo(
    @TypedBody() input: IMOLIT.GetBuildingInfoInput,
  ): Promise<IMOLIT.GetBuildingInfoOutput> {
    /**
     * The legal dong code is originally in the form of `${city/county code}${number}`, consisting of a 5-digit city/county code and 5 other digits. Here, you need to know the remaining 5 digits excluding the city/county code to use it, but since there is an intermittent problem of entering a 10-digit number, it is handled at the connector level.
     */

    if (
      input.bjdongCd.length === 10 &&
      input.bjdongCd.startsWith(input.sigunguCd)
    ) {
      input.bjdongCd = input.bjdongCd.replace(input.sigunguCd, "");
    }
    return retry(() => OpenDataProvider.getBuildingInfo(input))();
  }

  /**
   * [Ministry of the Interior and Safety] Retrieves administrative standard codes for domestic regions.
   *
   * This Connect is based on data obtained from public data portals in Korea.
   * If you talk about a specific organization here, it is an organization in Korea, and information or deducible facts that data or statistics point to can also be limited to Korea.
   * Public data operating in a specific area-based class, such as building ledger information or building lease on a deposit basis information,
   * may all need to know the legal building code and the city, county, and district code (법정동 코드, 시군구 코드를 의미한다.).
   * In this case, this connector call must be preceded.
   *
   * Since this is Korean public data, most searches may have to be done in Korean.
   * Please be aware of this.
   *
   * For the search, you should use the exact name that means the administrative district, just like the "서울특별시", not "서울".
   *
   * @summary Retrieve administrative standard codes
   * @param input Conditions for querying regions
   * @returns Region codes
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/open_data.svg",
  )
  @ApiTags("Open Data")
  @Standalone()
  @TypedRoute.Post("getStandardRegionCodeList")
  async getStandardRegionCodeList(
    @TypedBody()
    input: IOpenData.MinistryOfTheInteriorAndSafety.IGetStandardRegionCodeListInput,
  ): Promise<IOpenData.MinistryOfTheInteriorAndSafety.IGetStandardRegionCodeListOutput> {
    return retry(() => OpenDataProvider.getStandardRegionCodeList(input))();
  }

  /**
   * [Financial Services Commission] Retrieves market capitalization and stock information.
   *
   * This Connect is based on data obtained from public data portals in Korea.
   * If you talk about a specific organization here, it is an organization in Korea, and information or deducible facts that data or statistics point to can also be limited to Korea.
   *
   * Since this is Korean public data, most searches may have to be done in Korean. for example "삼성전자".
   * Also, since this is based on the closing of the stock market, you can only look up from about two months ago (9 days ago) to yesterday from today's date.
   *
   * @summary Retrieve market capitalization and stock information
   *
   * @param input Conditions for querying market capitalization
   * @returns Market capitalization and stock information
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/open_data.svg",
  )
  @ApiTags("Open Data")
  @Standalone()
  @TypedRoute.Post("getStockPriceInfo")
  async getStockPriceInfo(
    @TypedBody()
    input: IOpenData.FinancialServicesCommission.IGetStockPriceInfoInput,
  ): Promise<IOpenData.FinancialServicesCommission.IGetStockPriceInfoOutput> {
    return retry(() => OpenDataProvider.getStockPriceInfo(input))();
  }

  /**
   * [Korea Meteorological Administration] Retrieves today's weather information.
   *
   * Latitude and longitude coordinates are required for querying.
   * When provided, the latitude and longitude will be used to get current weather data based on the 00 minute mark of each hour for that region.
   * The output will be converted from grid coordinates to latitude and longitude, and provide weather-related information such as current weather, wind direction, and wind speed for the region.
   * The currently provided information includes:
   *
   * - POP: Probability of Precipitation
   * - PTY: Precipitation Type
   * - PCP: Precipitation Amount in the Last Hour
   * - REH: Humidity
   * - SNO: Snowfall in the Last Hour
   * - SKY: Sky Condition
   * - TMP: Temperature in the Last Hour
   * - TMN: Daily Minimum Temperature
   * - TMX: Daily Maximum Temperature
   * - UUU: Wind Speed (East-West Component)
   * - VVV: Wind Speed (North-South Component)
   * - WAV: Wave Height
   * - VEC: Wind Direction
   * - WSD: Wind Speed
   * - T1H: Temperature
   * - RN1: Precipitation Amount in the Last Hour
   * - VEC: Wind Direction
   * - T1H: Temperature
   *
   * This Connect is based on data obtained from public data portals in Korea.
   * If you talk about a specific organization here, it is an organization in Korea, and information or deducible facts that data or statistics point to can also be limited to Korea.
   *
   * There are two types in request body.
   * One is 'latitude_and_longitude' and the other is 'grid_coordinates'.
   * This function uses grid coordinate values to express Korean geographical conditions inside,
   * so grid coordinates must be entered.
   * However, grid coordinates also allow for latitude values because it is difficult for users to know their local coordinates. In this case,
   * you must deliver the values of nx and ny together with the values of 'latitude_and_longitude'.
   * If the latitude hardness value is delivered,
   * it is converted to grid coordinate value from the inside and used.
   *
   * Since this is Korean public data, most searches may have to be done in Korean.
   * Please be aware of this.
   *
   * @summary Retrieve today's weather from the Korea Meteorological Administration
   *
   * @param input DTO for weather query location
   * @returns Weather information for the specified region
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/open_data.svg",
  )
  @ApiTags("Open Data")
  @Standalone()
  @TypedRoute.Post("getShortTermForecast")
  async getShortTermForecast(
    @TypedBody()
    input: IKoreaMeteorologicalAdministration.IGetVillageForecastInformationInput,
  ): Promise<IKoreaMeteorologicalAdministration.IGetForecastOutput[]> {
    return retry(() => OpenDataProvider.getShortTermForecast(input))();
  }

  /**
   * [Korea Copyright Commission] Searches for copyright information.
   *
   * This Connect is based on data obtained from public data portals in Korea.
   * If you talk about a specific organization here, it is an organization in Korea, and information or deducible facts that data or statistics point to can also be limited to Korea.
   *
   * Since this is Korean public data, most searches may have to be done in Korean.
   * Please be aware of this.
   *
   * - 제호(명칭) : 저작물의 명칭을 의미하는 말로, 사용자가 어려워할 수 있기 때문에 쉽게 풀어 말하는 것이 좋습니다.
   *
   * @summary [Copyright Registration Information Service (New)]
   * @param input Conditions for querying copyright
   * @returns Copyright information
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/open_data.svg",
  )
  @ApiTags("Open Data")
  @Standalone()
  @core.TypedRoute.Post("getCopyRight")
  async getCopyRight(
    @TypedBody() input: KoreaCopyrightCommission.IGetCopyRightInput,
  ): Promise<KoreaCopyrightCommission.IGetCopyRightOutput> {
    return retry(() => OpenDataProvider.getCopyRight(input))();
  }
}
