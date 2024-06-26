/**
 * @packageDocumentation
 * @module api.functional.connector.open_data
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection, Primitive, Resolved } from "@nestia/fetcher";
import { NestiaSimulator } from "@nestia/fetcher/lib/NestiaSimulator";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia from "typia";

import type { ILH } from "../../../structures/connector/open_data/ILH";
import type { IMOLIT } from "../../../structures/connector/open_data/IMOLIT";
import type { INIA } from "../../../structures/connector/open_data/INIA";
import type { IOpenData } from "../../../structures/connector/open_data/IOpenData";

/**
 * [국토교통부] 오피스텔 전세, 월세 정보를 조회합니다.
 *
 * @summary 오피스텔 전세, 월세 정보 조회
 * @param input 조회 조건
 * @returns 조회한 전세, 월세 정보
 *
 * @controller OpenDataController.getRTMSDataSvcOffiRent
 * @path POST /connector/open-data/getRTMSDataSvcOffiRent
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function getRTMSDataSvcOffiRent(
  connection: IConnection,
  input: getRTMSDataSvcOffiRent.Input,
): Promise<getRTMSDataSvcOffiRent.Output> {
  return !!connection.simulate
    ? getRTMSDataSvcOffiRent.simulate(connection, input)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...getRTMSDataSvcOffiRent.METADATA,
          template: getRTMSDataSvcOffiRent.METADATA.path,
          path: getRTMSDataSvcOffiRent.path(),
        },
        input,
      );
}
export namespace getRTMSDataSvcOffiRent {
  export type Input = Primitive<IMOLIT.IGetRTMSDataSvcAptRentInput>;
  export type Output = Primitive<IMOLIT.IGetRTMSDataSvcOffiRentOutput>;

  export const METADATA = {
    method: "POST",
    path: "/connector/open-data/getRTMSDataSvcOffiRent",
    request: {
      type: "application/json",
      encrypted: false,
    },
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: null,
  } as const;

  export const path = () => "/connector/open-data/getRTMSDataSvcOffiRent";
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<Primitive<IMOLIT.IGetRTMSDataSvcOffiRentOutput>> =>
    typia.random<Primitive<IMOLIT.IGetRTMSDataSvcOffiRentOutput>>(g);
  export const simulate = (
    connection: IConnection,
    input: getRTMSDataSvcOffiRent.Input,
  ): Output => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: path(),
      contentType: "application/json",
    });
    assert.body(() => typia.assert(input));
    return random(
      "object" === typeof connection.simulate && null !== connection.simulate
        ? connection.simulate
        : undefined,
    );
  };
}

/**
 * [국토교통부] 아파트 전세, 월세 정보를 조회합니다.
 *
 * @summary 아파트 전세, 월세 정보 조회
 * @param input 조회 조건
 * @returns 조회한 전세, 월세 정보
 *
 * @controller OpenDataController.getRTMSDataSvcAptRent
 * @path POST /connector/open-data/getRTMSDataSvcAptRent
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function getRTMSDataSvcAptRent(
  connection: IConnection,
  input: getRTMSDataSvcAptRent.Input,
): Promise<getRTMSDataSvcAptRent.Output> {
  return !!connection.simulate
    ? getRTMSDataSvcAptRent.simulate(connection, input)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...getRTMSDataSvcAptRent.METADATA,
          template: getRTMSDataSvcAptRent.METADATA.path,
          path: getRTMSDataSvcAptRent.path(),
        },
        input,
      );
}
export namespace getRTMSDataSvcAptRent {
  export type Input = Primitive<IMOLIT.IGetRTMSDataSvcAptRentInput>;
  export type Output = Primitive<IMOLIT.IGetRTMSDataSvcAptRentOutput>;

  export const METADATA = {
    method: "POST",
    path: "/connector/open-data/getRTMSDataSvcAptRent",
    request: {
      type: "application/json",
      encrypted: false,
    },
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: null,
  } as const;

  export const path = () => "/connector/open-data/getRTMSDataSvcAptRent";
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<Primitive<IMOLIT.IGetRTMSDataSvcAptRentOutput>> =>
    typia.random<Primitive<IMOLIT.IGetRTMSDataSvcAptRentOutput>>(g);
  export const simulate = (
    connection: IConnection,
    input: getRTMSDataSvcAptRent.Input,
  ): Output => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: path(),
      contentType: "application/json",
    });
    assert.body(() => typia.assert(input));
    return random(
      "object" === typeof connection.simulate && null !== connection.simulate
        ? connection.simulate
        : undefined,
    );
  };
}

/**
 * [한국토지주택공사] LH 임대주택 단지를 조회합니다.
 *
 * @summary LH 임대주택 조회
 * @param input 조회할 임대주택 조건
 * @returns LH 임대주택 정보
 *
 * @controller OpenDataController.getLHLeaseInfo
 * @path POST /connector/open-data/getLHLeaseInfo
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function getLHLeaseInfo(
  connection: IConnection,
  input: getLHLeaseInfo.Input,
): Promise<getLHLeaseInfo.Output> {
  return !!connection.simulate
    ? getLHLeaseInfo.simulate(connection, input)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...getLHLeaseInfo.METADATA,
          template: getLHLeaseInfo.METADATA.path,
          path: getLHLeaseInfo.path(),
        },
        input,
      );
}
export namespace getLHLeaseInfo {
  export type Input = Primitive<ILH.IGetLHLeaseInfoInput>;
  export type Output = Primitive<ILH.IGetLHLeaseInfoOutput>;

  export const METADATA = {
    method: "POST",
    path: "/connector/open-data/getLHLeaseInfo",
    request: {
      type: "application/json",
      encrypted: false,
    },
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: null,
  } as const;

  export const path = () => "/connector/open-data/getLHLeaseInfo";
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<Primitive<ILH.IGetLHLeaseInfoOutput>> =>
    typia.random<Primitive<ILH.IGetLHLeaseInfoOutput>>(g);
  export const simulate = (
    connection: IConnection,
    input: getLHLeaseInfo.Input,
  ): Output => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: path(),
      contentType: "application/json",
    });
    assert.body(() => typia.assert(input));
    return random(
      "object" === typeof connection.simulate && null !== connection.simulate
        ? connection.simulate
        : undefined,
    );
  };
}

/**
 * [한국지능정보사회진흥원] 주차장 정보를 조회합니다.
 *
 * @summary 주차장 조회
 * @param input 주차장 조회 조건
 * @returns 주차장 정보
 *
 * @controller OpenDataController.getParkingLot
 * @path POST /connector/open-data/getParkingLot
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function getParkingLot(
  connection: IConnection,
  input: getParkingLot.Input,
): Promise<getParkingLot.Output> {
  return !!connection.simulate
    ? getParkingLot.simulate(connection, input)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...getParkingLot.METADATA,
          template: getParkingLot.METADATA.path,
          path: getParkingLot.path(),
        },
        input,
      );
}
export namespace getParkingLot {
  export type Input = Primitive<INIA.IGetParkingLotInput>;
  export type Output = Primitive<INIA.IGetParkingLotOutput>;

  export const METADATA = {
    method: "POST",
    path: "/connector/open-data/getParkingLot",
    request: {
      type: "application/json",
      encrypted: false,
    },
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: null,
  } as const;

  export const path = () => "/connector/open-data/getParkingLot";
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<Primitive<INIA.IGetParkingLotOutput>> =>
    typia.random<Primitive<INIA.IGetParkingLotOutput>>(g);
  export const simulate = (
    connection: IConnection,
    input: getParkingLot.Input,
  ): Output => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: path(),
      contentType: "application/json",
    });
    assert.body(() => typia.assert(input));
    return random(
      "object" === typeof connection.simulate && null !== connection.simulate
        ? connection.simulate
        : undefined,
    );
  };
}

/**
 * [국토교통부] 건축물대장정보를 조회합니다.
 *
 * @summary 건축물대장정보 조회
 * @param input 빌딩 정보를 조회하는 조건
 * @returns 빌딩 정보
 *
 * @controller OpenDataController.getBuildingInfo
 * @path POST /connector/open-data/getBuildingInfo
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function getBuildingInfo(
  connection: IConnection,
  input: getBuildingInfo.Input,
): Promise<getBuildingInfo.Output> {
  return !!connection.simulate
    ? getBuildingInfo.simulate(connection, input)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...getBuildingInfo.METADATA,
          template: getBuildingInfo.METADATA.path,
          path: getBuildingInfo.path(),
        },
        input,
      );
}
export namespace getBuildingInfo {
  export type Input = Primitive<IMOLIT.GetBuildingInfoInput>;
  export type Output = Primitive<IMOLIT.GetBuildingInfoOutput>;

  export const METADATA = {
    method: "POST",
    path: "/connector/open-data/getBuildingInfo",
    request: {
      type: "application/json",
      encrypted: false,
    },
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: null,
  } as const;

  export const path = () => "/connector/open-data/getBuildingInfo";
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<Primitive<IMOLIT.GetBuildingInfoOutput>> =>
    typia.random<Primitive<IMOLIT.GetBuildingInfoOutput>>(g);
  export const simulate = (
    connection: IConnection,
    input: getBuildingInfo.Input,
  ): Output => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: path(),
      contentType: "application/json",
    });
    assert.body(() => typia.assert(input));
    return random(
      "object" === typeof connection.simulate && null !== connection.simulate
        ? connection.simulate
        : undefined,
    );
  };
}

/**
 * [행정안전부] 국내 지역의 행정 표준 상 코드를 조회합니다.
 *
 * @summary 행정표준 코드 조회
 * @param input 조회할 지역 조건
 * @returns 지역 코드
 *
 * @controller OpenDataController.getStandardRegionCodeList
 * @path POST /connector/open-data/getStandardRegionCodeList
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function getStandardRegionCodeList(
  connection: IConnection,
  input: getStandardRegionCodeList.Input,
): Promise<getStandardRegionCodeList.Output> {
  return !!connection.simulate
    ? getStandardRegionCodeList.simulate(connection, input)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...getStandardRegionCodeList.METADATA,
          template: getStandardRegionCodeList.METADATA.path,
          path: getStandardRegionCodeList.path(),
        },
        input,
      );
}
export namespace getStandardRegionCodeList {
  export type Input =
    Primitive<IOpenData.MinistryOfTheInteriorAndSafety.IGetStandardRegionCodeListInput>;
  export type Output =
    Primitive<IOpenData.MinistryOfTheInteriorAndSafety.IGetStandardRegionCodeListOutput>;

  export const METADATA = {
    method: "POST",
    path: "/connector/open-data/getStandardRegionCodeList",
    request: {
      type: "application/json",
      encrypted: false,
    },
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: null,
  } as const;

  export const path = () => "/connector/open-data/getStandardRegionCodeList";
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<
    Primitive<IOpenData.MinistryOfTheInteriorAndSafety.IGetStandardRegionCodeListOutput>
  > =>
    typia.random<
      Primitive<IOpenData.MinistryOfTheInteriorAndSafety.IGetStandardRegionCodeListOutput>
    >(g);
  export const simulate = (
    connection: IConnection,
    input: getStandardRegionCodeList.Input,
  ): Output => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: path(),
      contentType: "application/json",
    });
    assert.body(() => typia.assert(input));
    return random(
      "object" === typeof connection.simulate && null !== connection.simulate
        ? connection.simulate
        : undefined,
    );
  };
}

/**
 * [금융위원회] 시가총액과 주식 정보를 조회합니다.
 *
 * @summary 시가총액 및 주식 정보 조회
 * @param input 시가총액 조회를 위한 조건
 * @returns 시가 총액 및 주식 정보
 *
 * @controller OpenDataController.getStockPriceInfo
 * @path POST /connector/open-data/getStockPriceInfo
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function getStockPriceInfo(
  connection: IConnection,
  input: getStockPriceInfo.Input,
): Promise<getStockPriceInfo.Output> {
  return !!connection.simulate
    ? getStockPriceInfo.simulate(connection, input)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...getStockPriceInfo.METADATA,
          template: getStockPriceInfo.METADATA.path,
          path: getStockPriceInfo.path(),
        },
        input,
      );
}
export namespace getStockPriceInfo {
  export type Input =
    Primitive<IOpenData.FinancialServicesCommission.IGetStockPriceInfoInput>;
  export type Output =
    Primitive<IOpenData.FinancialServicesCommission.IGetStockPriceInfoOutput>;

  export const METADATA = {
    method: "POST",
    path: "/connector/open-data/getStockPriceInfo",
    request: {
      type: "application/json",
      encrypted: false,
    },
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: null,
  } as const;

  export const path = () => "/connector/open-data/getStockPriceInfo";
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<
    Primitive<IOpenData.FinancialServicesCommission.IGetStockPriceInfoOutput>
  > =>
    typia.random<
      Primitive<IOpenData.FinancialServicesCommission.IGetStockPriceInfoOutput>
    >(g);
  export const simulate = (
    connection: IConnection,
    input: getStockPriceInfo.Input,
  ): Output => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: path(),
      contentType: "application/json",
    });
    assert.body(() => typia.assert(input));
    return random(
      "object" === typeof connection.simulate && null !== connection.simulate
        ? connection.simulate
        : undefined,
    );
  };
}

/**
 * [기상청] 오늘 날씨를 조회합니다.
 *
 * @summary 기상청 오늘 날씨 조회
 * @param input 날씨 조회를 위한 위치 정보 DTO
 * @returns 해당 지역의 기상 정보
 *
 * @controller OpenDataController.getShortTermForecast
 * @path POST /connector/open-data/getShortTermForecast
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function getShortTermForecast(
  connection: IConnection,
  input: getShortTermForecast.Input,
): Promise<getShortTermForecast.Output> {
  return !!connection.simulate
    ? getShortTermForecast.simulate(connection, input)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...getShortTermForecast.METADATA,
          template: getShortTermForecast.METADATA.path,
          path: getShortTermForecast.path(),
        },
        input,
      );
}
export namespace getShortTermForecast {
  export type Input =
    Primitive<IOpenData.IKoreaMeteorologicalAdministration.IGetVillageForecastInformationInput>;
  export type Output =
    Primitive<IOpenData.IKoreaMeteorologicalAdministration.IGetVillageForecastInformationOutput>;

  export const METADATA = {
    method: "POST",
    path: "/connector/open-data/getShortTermForecast",
    request: {
      type: "application/json",
      encrypted: false,
    },
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: null,
  } as const;

  export const path = () => "/connector/open-data/getShortTermForecast";
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<
    Primitive<IOpenData.IKoreaMeteorologicalAdministration.IGetVillageForecastInformationOutput>
  > =>
    typia.random<
      Primitive<IOpenData.IKoreaMeteorologicalAdministration.IGetVillageForecastInformationOutput>
    >(g);
  export const simulate = (
    connection: IConnection,
    input: getShortTermForecast.Input,
  ): Output => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: path(),
      contentType: "application/json",
    });
    assert.body(() => typia.assert(input));
    return random(
      "object" === typeof connection.simulate && null !== connection.simulate
        ? connection.simulate
        : undefined,
    );
  };
}
