import axios from "axios";

import { ILH } from "@wrtn/connector-api/lib/structures/connector/open_data/ILH";
import { IMOLIT } from "@wrtn/connector-api/lib/structures/connector/open_data/IMOLIT";
import { INIA } from "@wrtn/connector-api/lib/structures/connector/open_data/INIA";
import {
  IKoreaMeteorologicalAdministration,
  IOpenData,
} from "@wrtn/connector-api/lib/structures/connector/open_data/IOpenData";
import { KoreaCopyrightCommission } from "@wrtn/connector-api/lib/structures/connector/open_data/KoreaCopyrightCommission";

import { IMSIT } from "@wrtn/connector-api/lib/structures/connector/open_data/MSIT";
import typia, { tags } from "typia";
import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { convertAllPropertyToString } from "../../../utils/convertAllPropertyToString";
import { convertXmlToJson } from "../../../utils/convertXmlToJson";
import { createQueryParameter } from "../../../utils/CreateQueryParameter";
import { getOffset } from "../../../utils/getOffset";

export namespace OpenDataProvider {
  export function getPagination<T>(
    data: T[],
    option: { page: number; limit: number },
  ): { response: T[]; nextPage: boolean } {
    const { skip, take } = getOffset(option);
    const response = data.splice(skip, take + 1);

    // 다음 페이지가 존재한다는 take + 1 번째 값이 존재할 경우 다음 페이지가 있다고 값 저장 후 take + 1 번째 값 제거
    const nextPage = response.length === take + 1 ? true : false;
    if (nextPage === true) {
      response.pop();
    }

    return { response, nextPage };
  }

  export async function getAddress(
    input: IMSIT.IGetAddressInput,
  ): Promise<IMSIT.IGetAddressOutput> {
    const baseUrl = `http://openapi.epost.go.kr/postal/retrieveNewAdressAreaCdService/retrieveNewAdressAreaCdService/getNewAddressListAreaCd`;
    const serviceKey = `${ConnectorGlobal.env.OPEN_DATA_API_KEY}`;
    const queryString = createQueryParameter({
      ...input,
      searchSe: "post",
      serviceKey,
    });
    const res = await axios.get(`${baseUrl}?${queryString}`);
    return res.data;
  }

  export async function getRTMSDataSvcSHRent(
    input: IMOLIT.IgetRTMSDataSvcSHRentInput,
  ): Promise<IMOLIT.IgetRTMSDataSvcSHRentOutput> {
    try {
      const baseUrl = `http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcSHRent`;
      const serviceKey = `${ConnectorGlobal.env.OPEN_DATA_API_KEY}`;
      const queryString = Object.entries({
        ...input,
        serviceKey,
        _type: "json",
      })
        .map(([key, value]) => `${key}=${value}`)
        .join("&");

      const res = await axios.get(`${baseUrl}?${queryString}`);
      const data = res.data.response.body.items
        .item as IMOLIT.OriginalBuildingLentInfo[];

      const { response, nextPage } = getPagination(data, input);
      return {
        data: response.map((el) => {
          const sh: IMOLIT.BuildingLentInfo = {
            useOfRenewalRight: el.갱신요구권사용,
            yearOfConstruction: el.건축년도,
            typeOfContract: el.계약구분,
            contractPeriod: el.계약기간,
            year: el.년,
            legalDistrict: el.법정동,
            depositAmount: el.보증금액,
            apartment: el.아파트,
            month: el.월,
            monthlyRentAmount: el.월세금액,
            day: el.일,
            exclusiveArea: el.전용면적,
            previousContractDeposit: el.종전계약보증금,
            previousContractMonthlyRent: el.종전계약월세,
            lotNumber: el.지번,
            areaCode: el.지역코드,
            floor: el.층,
          };
          return sh;
        }),
        nextPage,
      };
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function getRTMSDataSvcOffiRent(
    input: IMOLIT.IGetRTMSDataSvcOffiRentInput,
  ): Promise<IMOLIT.IGetRTMSDataSvcOffiRentOutput> {
    try {
      const baseUrl = `https://apis.data.go.kr/1613000/RTMSDataSvcOffiRent/getRTMSDataSvcOffiRent`;
      const serviceKey = `${ConnectorGlobal.env.OPEN_DATA_API_KEY}`;
      const queryString = Object.entries({
        ...input,
        serviceKey,
        _type: "json",
      })
        .map(([key, value]) => `${key}=${value}`)
        .join("&");

      const res = await axios.get(`${baseUrl}?${queryString}`);
      const jsonData = await convertXmlToJson(res.data);
      const data = jsonData.response.body.items.item.map(
        convertAllPropertyToString,
      );
      const numOfRows = jsonData.response.body.numOfRows;
      const pageNo = jsonData.response.body.pageNo;
      const totalCount = jsonData.response.body.totalCount;
      return { data, numOfRows, pageNo, totalCount };
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function getRTMSDataSvcAptRent(
    input: IMOLIT.IGetRTMSDataSvcAptRentInput,
  ): Promise<IMOLIT.IGetRTMSDataSvcAptRentOutput> {
    try {
      const baseUrl = `https://apis.data.go.kr/1613000/RTMSDataSvcAptTradeDev/getRTMSDataSvcAptTradeDev`;
      const serviceKey = `${ConnectorGlobal.env.OPEN_DATA_API_KEY}`;
      const queryString = createQueryParameter({
        ...input,
        serviceKey,
        type: "JSON",
      });

      const url = `${baseUrl}?${queryString}`;
      const res = await axios.get(url);
      const jsonData = await convertXmlToJson(res.data);
      const data = jsonData.response.body.items.item.map(
        convertAllPropertyToString,
      );
      const numOfRows = jsonData.response.body.numOfRows;
      const pageNo = jsonData.response.body.pageNo;
      const totalCount = jsonData.response.body.totalCount;
      return { data, numOfRows, pageNo, totalCount };
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function getLHLeaseInfo(
    input: ILH.IGetLHLeaseInfoInput,
  ): Promise<ILH.IGetLHLeaseInfoOutput> {
    try {
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

      return { nextPage, data: dsList };
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function getParkingLot(
    input: INIA.IGetParkingLotInput,
  ): Promise<INIA.IGetParkingLotOutput> {
    try {
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
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
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

    try {
      const res = await axios.get(`${baseUrl}?${queryString}`, {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      });
      const data = res.data.response.body;
      const bulidings = data.items.item;

      return {
        numOfRows: Number(data.numOfRows),
        pageNo: Number(data.pageNo),
        totalCount: Number(data.totalCount),
        bulidings: bulidings,
      };
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function getStandardRegionCodeList(
    input: IOpenData.MinistryOfTheInteriorAndSafety.IGetStandardRegionCodeListInput,
  ): Promise<IOpenData.MinistryOfTheInteriorAndSafety.IGetStandardRegionCodeListOutput> {
    try {
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
            el.sigunguNm =
              el.locatadd_nm?.split(" ").slice(0, 2).join(" ") ?? "";
            el.bjdongCd = `${el.umd_cd}${el.ri_cd}`;

            return el;
          },
        ),
      };
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function getStockPriceInfo(
    input: IOpenData.FinancialServicesCommission.IGetStockPriceInfoInput,
  ): Promise<IOpenData.FinancialServicesCommission.IGetStockPriceInfoOutput> {
    try {
      const baseUrl = `https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo`;
      const serviceKey = `${ConnectorGlobal.env.OPEN_DATA_API_KEY}`;

      // 형식에 안맞는 date format일 경우 공공 데이터 포맷에 맞게 변형
      const is = typia.createIs<string & tags.Format<"date">>();

      const transformedInput = Object.entries(input)
        .map((el) => (is(el) ? el.replaceAll("-", "") : el))
        .reduce((acc, [key, value]) => {
          acc = Object.assign({ [key]: value });
          return acc;
        }, {});

      const queryString = createQueryParameter({
        ...transformedInput,
        serviceKey,
        resultType: "json",
      });

      const res = await axios.get(`${baseUrl}?${queryString}`);
      return res.data;
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function getShortTermForecast(
    input: IKoreaMeteorologicalAdministration.IGetVillageForecastInformationInput,
  ): Promise<IKoreaMeteorologicalAdministration.IWeatherResponse> {
    let nx: number | null = input.nx;
    let ny: number | null = input.ny;

    try {
      const baseUrl = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst`;
      const serviceKey = `${ConnectorGlobal.env.OPEN_DATA_API_KEY}`;

      const koreanTimeString = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Seoul",
      });
      const now = new Date(koreanTimeString);

      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = `00`;

      if (input.type === "latitude_and_longitude") {
        const { x, y } = dfs_xy_conv("toXY", input.ny, input.nx);
        nx = x;
        ny = y;
      }

      const queryObject = {
        serviceKey,
        nx,
        ny,
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
      const data =
        res.data as IKoreaMeteorologicalAdministration.IGetVillageForecastInformationOutput;
      return data.response.body.items?.item.map((el) => {
        const { lat, lng } = dfs_xy_conv("toLL", el.ny, el.nx);
        return { ...el, nx: lat, ny: lng };
      });
    } catch (error) {
      const type = "latitude_and_longitude" as const;
      return await getShortTermForecastByOpenWhatherMap({ type, nx, ny });
    }
  }

  export async function getShortTermForecastByOpenWhatherMap(
    input: IKoreaMeteorologicalAdministration.IGetVillageForecastInformationInput,
  ) {
    const res = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          appid: ConnectorGlobal.env.OPEN_WEATHER_API_KEY,
          lat: input.ny,
          lon: input.nx,
        },
      },
    );

    console.log(JSON.stringify(res.data, null, 2));
    const kelvinToCelsius = (kelvin: number) =>
      Number((kelvin - 273.15).toFixed(1));
    const { name, main, weather, wind } = res.data;
    return {
      city_name: name,
      weather_main: weather[0].main,
      weather_description: weather[0].description,
      temperature: kelvinToCelsius(main.temp),
      feel_like_temperature: kelvinToCelsius(main.feels_like),
      temperature_min: kelvinToCelsius(main.temp_min),
      temperature_max: kelvinToCelsius(main.temp_max),
      wind_speed: wind.speed,
      humidity: main.humidity,
    };
  }

  export async function getCopyRight(
    input: KoreaCopyrightCommission.IGetCopyRightInput,
  ): Promise<KoreaCopyrightCommission.IGetCopyRightOutput> {
    try {
      const baseUrl = `https://api.odcloud.kr/api/CpyrRegInforService/v1/getCpyrRegInforUniList`;
      const serviceKey = `${ConnectorGlobal.env.OPEN_DATA_API_KEY}`;

      const decoded = decodeURIComponent(serviceKey);
      const queryString = createQueryParameter({
        serviceKey: decoded,
        "cond[AUTHOR_NAME::LIKE]": input.AUTHOR_NAME,
        "cond[CONT_TITLE::LIKE]": input.CONT_TITLE,
        "cond[REG_ID::EQ]": input.REG_ID,
        page: input.page,
        perPage: input.perPage,
      });

      const res = await axios.get(`${baseUrl}?${queryString}`, {
        headers: {
          Authorization: decoded,
        },
      });
      return res.data;
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  /**
   * LCC DFS 좌표변환 ( code : "toXY"(위경도->좌표, v1:위도, v2:경도), "toLL"(좌표->위경도,v1:x, v2:y) )
   *
   * @param code
   * @param v1 y좌표 혹은 위도
   * @param v2 x좌표 혹은 경도
   * @returns
   */
  export function dfs_xy_conv(code: "toXY" | "toLL", v1: number, v2: number) {
    const RE = 6371.00877; // 지구 반경(km)
    const GRID = 5.0; // 격자 간격(km)
    const SLAT1 = 30.0; // 투영 위도1(degree)
    const SLAT2 = 60.0; // 투영 위도2(degree)
    const OLON = 126.0; // 기준점 경도(degree)
    const OLAT = 38.0; // 기준점 위도(degree)
    const XO = 43; // 기준점 X좌표(GRID)
    const YO = 136; // 기준점 Y좌표(GRID)

    const DEGRAD = Math.PI / 180.0;
    const RADDEG = 180.0 / Math.PI;

    const re = RE / GRID;
    const slat1 = SLAT1 * DEGRAD;
    const slat2 = SLAT2 * DEGRAD;
    const olon = OLON * DEGRAD;
    const olat = OLAT * DEGRAD;

    const sn =
      Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
      Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;
    let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
    ro = (re * sf) / Math.pow(ro, sn);
    let ra: number | null = null;
    let theta: number | null = null;

    const rs: Record<"lat" | "lng" | "x" | "y", number> = {
      lat: 0,
      lng: 0,
      x: 0,
      y: 0,
    };

    if (code == "toXY") {
      rs["lat"] = v1;
      rs["lng"] = v2;
      ra = Math.tan(Math.PI * 0.25 + v1 * DEGRAD * 0.5);
      if (!ra) {
        console.error("Invalid ra value", ra);
      }
      ra = (re * sf) / Math.pow(ra, sn);
      if (!ra || isNaN(ra)) {
        console.error("Invalid ra value after pow", ra);
      }
      theta = v2 * DEGRAD - olon;
      if (theta > Math.PI) theta -= 2.0 * Math.PI;
      if (theta < -Math.PI) theta += 2.0 * Math.PI;
      theta *= sn;
      rs["x"] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
      rs["y"] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
    } else {
      rs["x"] = v1;
      rs["y"] = v2;
      const xn = v1 - XO;
      const yn = ro - v2 + YO;
      ra = Math.sqrt(xn * xn + yn * yn);
      if (sn < 0.0) -ra;
      let alat = Math.pow((re * sf) / ra, 1.0 / sn);
      alat = 2.0 * Math.atan(alat) - Math.PI * 0.5;

      if (Math.abs(xn) <= 0.0) {
        theta = 0.0;
      } else {
        if (Math.abs(yn) <= 0.0) {
          theta = Math.PI * 0.5;
          if (xn < 0.0) -theta;
        } else theta = Math.atan2(xn, yn);
      }
      const alon = theta / sn + olon;
      rs["lat"] = alat * RADDEG;
      rs["lng"] = alon * RADDEG;
    }
    return rs;
  }
}
