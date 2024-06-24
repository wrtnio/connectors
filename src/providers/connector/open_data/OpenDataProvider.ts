import axios from "axios";

import { IOpenData } from "@wrtn/connector-api/lib/structures/connector/open_data/IOpenData";

import { ConnectorGlobal } from "../../../ConnectorGlobal";

export namespace OpenDataProvider {
  export async function getStockPriceInfo(
    input: IOpenData.FinancialServicesCommission.IGetStockPriceInfoInput,
  ): Promise<IOpenData.FinancialServicesCommission.IGetStockPriceInfoOutput> {
    const baseUrl = `https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo`;
    const serviceKey = `${ConnectorGlobal.env.OPEN_DATA_KOREA_METEOROLOGICAL_ADMINISTRATION}`;

    const queryString = Object.entries({
      ...input,
      serviceKey,
      resultType: "json",
    })
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    const res = await axios.get(`${baseUrl}?${queryString}`);
    return res.data;
  }

  export async function getShortTermForecast(
    input: IOpenData.IKoreaMeteorologicalAdministration.IGetVillageForecastInformationInput,
  ): Promise<IOpenData.IKoreaMeteorologicalAdministration.IGetVillageForecastInformationOutput> {
    const baseUrl = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst`;
    const serviceKey = `${ConnectorGlobal.env.OPEN_DATA_KOREA_METEOROLOGICAL_ADMINISTRATION}`;
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = `00`;

    const queryObject = {
      serviceKey,
      nx: input.nx,
      ny: input.ny,
      pageNo: 1,
      numOfRows: 14, // 코드 값의 수가 14개이므로 14를 고정 값으로 사용.
      base_date: `${year}${month}${day}`,
      base_time: `${hours}${minutes}`,
      dataType: "JSON",
    };

    const queryString = Object.entries(queryObject)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    const res = await axios.get(`${baseUrl}?${queryString}`);
    return res.data;
  }
}
