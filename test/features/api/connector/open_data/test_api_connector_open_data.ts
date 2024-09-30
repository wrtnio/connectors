import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import assert from "assert";

export const test_api_connector_open_data_get_get_building_info = async (
  connection: CApi.IConnection,
) => {
  const res = await CApi.functional.connector.open_data.getBuildingInfo(
    connection,
    {
      sigunguCd: "11680",
      bjdongCd: "10300",
      pageNo: 1,
      numOfRows: 100,
    },
  );

  typia.assert(res);
};

export const test_api_connector_open_data_get_get_building_info_2 = async (
  connection: CApi.IConnection,
) => {
  const res = await CApi.functional.connector.open_data.getBuildingInfo(
    connection,
    {
      sigunguCd: "11680",
      bjdongCd: "1168010300",
      pageNo: 1,
      numOfRows: 100,
    },
  );

  typia.assert(res);
};

export const test_api_connector_open_data_get_get_parking_lot = async (
  connection: CApi.IConnection,
) => {
  const res = await CApi.functional.connector.open_data.getParkingLot(
    connection,
    {
      pageNo: 1,
      numOfRows: 100,
      lnmadr: "강원도 평창군 대관령면 횡계리 321-10",
    },
  );

  typia.assert(res);
};

export const test_api_connector_open_data_get_get_lh_lease_info_has_next_page =
  async (connection: CApi.IConnection) => {
    const res = await CApi.functional.connector.open_data.getLHLeaseInfo(
      connection,
      {
        pageNo: 1,
        numOfRows: 10,
        CNP_CD: 11,
      },
    );

    typia.assert<true>(res.data.length === 10);
    typia.assert<true>(res.nextPage);
    typia.assert(res);
  };

export const test_api_connector_open_data_get_get_lh_lease_info = async (
  connection: CApi.IConnection,
) => {
  const res = await CApi.functional.connector.open_data.getLHLeaseInfo(
    connection,
    {
      pageNo: 1,
      numOfRows: 1000,
      CNP_CD: 11,
    },
  );

  typia.assert<false>(res.data.length === 1000);
  typia.assert<false>(res.nextPage);
  typia.assert(res);
};

export const test_api_connector_open_data_get_get_lh_lease_info_second_page =
  async (connection: CApi.IConnection) => {
    const res = await CApi.functional.connector.open_data.getLHLeaseInfo(
      connection,
      {
        pageNo: 2,
        numOfRows: 1000,
        CNP_CD: 11,
      },
    );

    typia.assert<false>(res.data.length === 1000);
    typia.assert(res);
  };

export const test_api_connector_open_data_get_get_lh_lease_info_third_page =
  async (connection: CApi.IConnection) => {
    const res = await CApi.functional.connector.open_data.getLHLeaseInfo(
      connection,
      {
        pageNo: 3,
        numOfRows: 1000,
        CNP_CD: 11,
      },
    );

    typia.assert<false>(res.data.length === 1000);
    typia.assert<false>(res.nextPage);
    typia.assert(res);
  };

export const test_api_connector_open_data_get_RTMS_Data_svc_offi_rent = async (
  connection: CApi.IConnection,
) => {
  const standardRegionCodeList =
    await CApi.functional.connector.open_data.getStandardRegionCodeList(
      connection,
      {
        locatadd_nm: "서울특별시",
      },
    );

  const sigunguCd = standardRegionCodeList.rows.at(0)?.sigunguCd;
  if (!sigunguCd) {
    throw new Error("시군도 코드 조회 단계에서 에러 발생");
  }

  const res = await CApi.functional.connector.open_data.getRTMSDataSvcOffiRent(
    connection,
    {
      page: 1,
      limit: 20,
      LAWD_CD: sigunguCd,
      DEAL_YMD: "202406",
    },
  );

  typia.assert(res);
};
export const test_api_connector_open_data_get_RTMS_Data_svc_offi_rent_with_pagination =
  async (connection: CApi.IConnection) => {
    const standardRegionCodeList =
      await CApi.functional.connector.open_data.getStandardRegionCodeList(
        connection,
        {
          locatadd_nm: "서울특별시",
        },
      );

    const sigunguCd = standardRegionCodeList.rows.at(0)?.sigunguCd;
    if (!sigunguCd) {
      throw new Error("시군도 코드 조회 단계에서 에러 발생");
    }

    const firstPage =
      await CApi.functional.connector.open_data.getRTMSDataSvcOffiRent(
        connection,
        {
          page: 1,
          limit: 1,
          LAWD_CD: sigunguCd,
          DEAL_YMD: "202406",
        },
      );

    typia.assert(firstPage);

    const secondPage =
      await CApi.functional.connector.open_data.getRTMSDataSvcOffiRent(
        connection,
        {
          page: 2,
          limit: 1,
          LAWD_CD: sigunguCd,
          DEAL_YMD: "202406",
        },
      );

    typia.assert(secondPage);
    assert(JSON.stringify(firstPage) !== JSON.stringify(secondPage));
  };

export const test_api_connector_open_data_get_RTMS_Data_svc_apt_rent = async (
  connection: CApi.IConnection,
) => {
  const standardRegionCodeList =
    await CApi.functional.connector.open_data.getStandardRegionCodeList(
      connection,
      {
        locatadd_nm: "서울특별시",
      },
    );

  const sigunguCd = standardRegionCodeList.rows.at(0)?.sigunguCd;
  if (!sigunguCd) {
    throw new Error("시군도 코드 조회 단계에서 에러 발생");
  }

  const res = await CApi.functional.connector.open_data.getRTMSDataSvcAptRent(
    connection,
    {
      page: 1,
      limit: 20,
      LAWD_CD: sigunguCd,
      DEAL_YMD: "202406",
    },
  );

  typia.assert(res);
};

export const test_api_connector_open_data_get_copy_right = async (
  connection: CApi.IConnection,
) => {
  const res = await CApi.functional.connector.open_data.getCopyRight(
    connection,
    {},
  );

  typia.assert(res);
};

export const test_api_connector_open_data_get_copy_right_with_author_name_1 =
  async (connection: CApi.IConnection) => {
    const res = await CApi.functional.connector.open_data.getCopyRight(
      connection,
      {
        AUTHOR_NAME: "이지은",
        page: 1,
        perPage: 100,
      },
    );

    typia.assert(res);
  };

export const test_api_connector_open_data_get_copy_right_with_author_name_2 =
  async (connection: CApi.IConnection) => {
    const res = await CApi.functional.connector.open_data.getCopyRight(
      connection,
      {
        AUTHOR_NAME: "이지은",
        page: 2,
        perPage: 100,
      },
    );

    typia.assert(res);
  };

export const test_api_connector_open_data_get_RTMS_Data_svc_sh_rent = async (
  connection: CApi.IConnection,
) => {
  const standardRegionCodeList =
    await CApi.functional.connector.open_data.getStandardRegionCodeList(
      connection,
      {
        locatadd_nm: "서울특별시",
      },
    );

  const sigunguCd = standardRegionCodeList.rows.at(0)?.sigunguCd;
  if (!sigunguCd) {
    throw new Error("시군도 코드 조회 단계에서 에러 발생");
  }

  const res = await CApi.functional.connector.open_data.getRTMSDataSvcSHRent(
    connection,
    {
      page: 1,
      limit: 20,
      LAWD_CD: sigunguCd,
      DEAL_YMD: "202406",
    },
  );

  typia.assert(res);
};
