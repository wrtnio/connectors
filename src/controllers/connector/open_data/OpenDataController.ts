import core, { TypedBody, TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { ILH } from "@wrtn/connector-api/lib/structures/connector/open_data/ILH";
import { IMOLIT } from "@wrtn/connector-api/lib/structures/connector/open_data/IMOLIT";
import { INIA } from "@wrtn/connector-api/lib/structures/connector/open_data/INIA";
import {
  IKoreaMeteorologicalAdministration,
  IOpenData,
} from "@wrtn/connector-api/lib/structures/connector/open_data/IOpenData";
import { KoreaCopyrightCommission } from "@wrtn/connector-api/lib/structures/connector/open_data/KoreaCopyrightCommission";

import { OpenDataProvider } from "../../../providers/connector/open_data/OpenDataProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/open-data")
export class OpenDataController {
  /**
   * [Ministry of Land, Infrastructure and Transport] Retrieves information on single-family homes and multi-family homes for lease or rent.
   *
   * This Connect is based on data obtained from public data portals in Korea.
   * If you talk about a specific organization here, it is an organization in Korea, and information or deducible facts that data or statistics point to can also be limited to Korea.
   *
   * @summary Retrieve multi-family lease and rental information
   * @param input Query conditions
   * @returns Information on leases and rents
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/open_data.svg",
  )
  @ApiTags(
    "Housing",
    "Single-Family Homes",
    "Multi-Family Homes",
    "Rent",
    "Lease",
  )
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
   * @summary Retrieve officetel lease and rental information
   * @param input Query conditions
   * @returns Information on leases and rents
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/open_data.svg",
  )
  @ApiTags("Housing", "Officetel", "Rent", "Lease")
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
   * @summary Retrieve apartment lease and rental information
   * @param input Query conditions
   * @returns Information on leases and rents
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/open_data.svg",
  )
  @Standalone()
  @ApiTags("Public Data", "Housing", "Apartment", "Rent", "Lease")
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
   * @summary Retrieve LH rental housing information
   * @param input Conditions for querying rental housing
   * @returns LH rental housing information
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/open_data.svg",
  )
  @Standalone()
  @ApiTags("Public Data", "LH", "Housing", "Rental Housing", "Happy Housing")
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
   *
   * @summary Retrieve parking lot information
   * @param input Conditions for querying parking lots
   * @returns Parking lot information
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/open_data.svg",
  )
  @Standalone()
  @ApiTags("Public Data", "Parking Lot", "Parking")
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
   * @summary Retrieve building registration information
   * @param input Conditions for querying building information
   * @returns Building information
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/open_data.svg",
  )
  @ApiTags(
    "Public Data",
    "Building",
    "Building Information",
    "Earthquake Design",
  )
  @TypedRoute.Post("getBuildingInfo")
  async getBuildingInfo(
    @TypedBody() input: IMOLIT.GetBuildingInfoInput,
  ): Promise<IMOLIT.GetBuildingInfoOutput> {
    return retry(() => OpenDataProvider.getBuildingInfo(input), 10, 500)();
  }

  /**
   * [Ministry of the Interior and Safety] Retrieves administrative standard codes for domestic regions.
   *
   * This Connect is based on data obtained from public data portals in Korea.
   * If you talk about a specific organization here, it is an organization in Korea, and information or deducible facts that data or statistics point to can also be limited to Korea.
   *
   * @summary Retrieve administrative standard codes
   * @param input Conditions for querying regions
   * @returns Region codes
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/open_data.svg",
  )
  @Standalone()
  @ApiTags(
    "Public Data",
    "Administrative District",
    "Region Code",
    "Township",
    "City",
    "County",
  )
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
   * @summary Retrieve market capitalization and stock information
   *
   * @param input Conditions for querying market capitalization
   * @returns Market capitalization and stock information
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/open_data.svg",
  )
  @Standalone()
  @ApiTags(
    "Public Data",
    "Stock",
    "Market Capitalization",
    "Company",
    "Capital",
  )
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
   * There are two types here.
   * One is 'latitude_and_longitude' and the other is 'grid_coordinates'.
   * This function uses grid coordinate values to express Korean geographical conditions inside,
   * so grid coordinates must be entered.
   * However, grid coordinates also allow for latitude values because it is difficult for users to know their local coordinates. In this case,
   * you must deliver the values of nx and ny together with the values of 'latitude_and_longitude'.
   * If the latitude hardness value is delivered,
   * it is converted to grid coordinate value from the inside and used.
   *
   * @summary Retrieve today's weather from the Korea Meteorological Administration
   *
   * @param input DTO for weather query location
   * @returns Weather information for the specified region
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/open_data.svg",
  )
  @Standalone()
  @ApiTags("Public Data", "Weather", "KMA", "Today’s Weather", "Climate")
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
   * @summary [Copyright Registration Information Service (New)]
   * @param input Conditions for querying copyright
   * @returns Copyright information
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/open_data.svg",
  )
  @Standalone()
  @ApiTags("Copyright")
  @core.TypedRoute.Post("getCopyRight")
  async getCopyRight(
    @TypedBody() input: KoreaCopyrightCommission.IGetCopyRightInput,
  ): Promise<KoreaCopyrightCommission.IGetCopyRightOutput> {
    return retry(() => OpenDataProvider.getCopyRight(input))();
  }
}
