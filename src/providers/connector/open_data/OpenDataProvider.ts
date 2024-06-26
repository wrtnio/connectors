import axios from "axios";

import { ILH } from "@wrtn/connector-api/lib/structures/connector/open_data/ILH";
import { IMOLIT } from "@wrtn/connector-api/lib/structures/connector/open_data/IMOLIT";
import { INIA } from "@wrtn/connector-api/lib/structures/connector/open_data/INIA";
import { IOpenData } from "@wrtn/connector-api/lib/structures/connector/open_data/IOpenData";

import { ConnectorGlobal } from "../../../ConnectorGlobal";

export namespace OpenDataProvider {
  export async function getRTMSDataSvcOffiRent(
    input: IMOLIT.IGetRTMSDataSvcOffiRentInput,
  ): Promise<IMOLIT.IGetRTMSDataSvcOffiRentOutput> {
    const baseUrl = `http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcOffiRent`;
    const serviceKey = `${ConnectorGlobal.env.OPEN_DATA_API_KEY}`;
    const queryString = Object.entries({
      ...input,
      serviceKey,
      _type: "json",
    })
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    const res = await axios.get(`${baseUrl}?${queryString}`);
    const data = res.data.response.body.items.item;

    return { data };
  }

  export async function getRTMSDataSvcAptRent(
    input: IMOLIT.IGetRTMSDataSvcAptRentInput,
  ): Promise<IMOLIT.IGetRTMSDataSvcAptRentOutput> {
    const baseUrl = `http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptRent`;
    const serviceKey = `${ConnectorGlobal.env.OPEN_DATA_API_KEY}`;
    const queryString = Object.entries({
      ...input,
      serviceKey,
      _type: "json",
    })
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    const res = await axios.get(`${baseUrl}?${queryString}`);
    const data = res.data.response.body.items.item;

    return { data };
  }

  export async function getLHLeaseInfo(
    input: ILH.IGetLHLeaseInfoInput,
  ): Promise<ILH.IGetLHLeaseInfoOutput> {
    const baseUrl = `http://apis.data.go.kr/B552555/lhLeaseInfo1/lhLeaseInfo1`;
    const serviceKey = `${ConnectorGlobal.env.OPEN_DATA_API_KEY}`;

    const queryString = Object.entries({
      PG_SZ: (input.numOfRows ? Number(input.numOfRows) : 10) + 1,
      PAGE: input.pageNo ?? 1,
      CNP_CD: input.CNP_CD,
      ...(input.SPL_TP_CD && { SPL_TP_CD: input.SPL_TP_CD }),
      serviceKey,
      type: "json",
    })
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    const res = await axios.get(`${baseUrl}?${queryString}`);
    const [_, { dsList }] = res.data;

    let nextPage: boolean = false;
    const take = (input.numOfRows ? Number(input.numOfRows) : 10) + 1;
    if (dsList.length === take) {
      nextPage = true;
      dsList.pop();
    }

    return {
      nextPage,
      data: dsList,
    };
  }

  export async function getParkingLot(
    input: INIA.IGetParkingLotInput,
  ): Promise<INIA.IGetParkingLotOutput> {
    const baseUrl = `http://api.data.go.kr/openapi/tn_pubr_prkplce_info_api`;
    const serviceKey = `${ConnectorGlobal.env.OPEN_DATA_API_KEY}`;

    const queryString = Object.entries({
      ...input,
      serviceKey,
      type: "json",
    })
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    const res = await axios.get(`${baseUrl}?${queryString}`);
    const data = res.data.response.body;
    const parkingLots = data.items;
    return {
      numOfRows: Number(data.numOfRows),
      pageNo: Number(data.pageNo),
      totalCount: Number(data.totalCount),
      parkingLots,
    };
  }

  export async function getBuildingInfo(
    input: IMOLIT.GetBuildingInfoInput,
  ): Promise<IMOLIT.GetBuildingInfoOutput> {
    const baseUrl = `http://apis.data.go.kr/1613000/BldRgstService_v2/getBrTitleInfo`;
    const serviceKey = `${ConnectorGlobal.env.OPEN_DATA_API_KEY}`;
    const queryString = Object.entries({
      ...input,
      serviceKey,
      _type: "json",
    })
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    const res = await axios.get(`${baseUrl}?${queryString}`);
    const data = res.data.response.body;
    const bulidings = data.items.item;

    return {
      numOfRows: Number(data.numOfRows),
      pageNo: Number(data.pageNo),
      totalCount: Number(data.totalCount),
      bulidings,
    };
  }

  export async function getStandardRegionCodeList(
    input: IOpenData.MinistryOfTheInteriorAndSafety.IGetStandardRegionCodeListInput,
  ): Promise<IOpenData.MinistryOfTheInteriorAndSafety.IGetStandardRegionCodeListOutput> {
    const baseUrl = `http://apis.data.go.kr/1741000/StanReginCd/getStanReginCdList`;
    const serviceKey = `${ConnectorGlobal.env.OPEN_DATA_API_KEY}`;

    const queryString = Object.entries({
      ...input,
      serviceKey,
      type: "json",
    })
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    const res = await axios.get(`${baseUrl}?${queryString}`);
    const [{ head }, body] = res.data.StanReginCd;

    return {
      totalCount: head[0].totalCount,
      pageNo: Number(head[1].pageNo),
      numOfRows: Number(head[1].numOfRows),
      rows: body.row.map(
        (
          el: IOpenData.MinistryOfTheInteriorAndSafety.IGetStandardRegionCodeListOutput["rows"][0],
        ) => {
          el.sigunguCd = `${el.sido_cd}${el.sgg_cd}`;
          el.sigunguNm = el.locatadd_nm?.split(" ").slice(0, 2).join(" ") ?? "";
          el.bjdongCd = `${el.umd_cd}${el.ri_cd}`;

          return el;
        },
      ),
    };
  }

  export async function getStockPriceInfo(
    input: IOpenData.FinancialServicesCommission.IGetStockPriceInfoInput,
  ): Promise<IOpenData.FinancialServicesCommission.IGetStockPriceInfoOutput> {
    const baseUrl = `https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo`;
    const serviceKey = `${ConnectorGlobal.env.OPEN_DATA_API_KEY}`;

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
    const serviceKey = `${ConnectorGlobal.env.OPEN_DATA_API_KEY}`;
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
