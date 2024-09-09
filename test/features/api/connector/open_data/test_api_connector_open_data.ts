import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import assert from "assert";

export const test_api_connector_open_data_get_get_stock_price_info = async (
  connection: CApi.IConnection,
) => {
  const res = await CApi.functional.connector.open_data.getStockPriceInfo(
    connection,
    {
      basDt: "20240620",
    },
  );

  typia.assertEquals(res);
  assert(res.response.body.items.item.length > 0);
};

export const test_api_connector_open_data_get_get_stock_price_info_with_exact_company_name =
  async (connection: CApi.IConnection) => {
    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 30);

    const year = oneWeekAgo.getFullYear();
    const month = ("0" + (oneWeekAgo.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 +1 필요
    const day = ("0" + oneWeekAgo.getDate()).slice(-2); // 2자리 숫자로 맞추기 위해 '0'을 추가

    const formattedDate = `${year}${month}${day}`;

    const res = await CApi.functional.connector.open_data.getStockPriceInfo(
      connection,
      {
        likeItmsNm: "삼성전자",
        basDt: formattedDate,
      },
    );

    typia.assertEquals(res);
    assert(res.response.body.items.item.length > 0);
  };

/**
 * 1달 전 데이터는 얻을 수 있음
 * @param connection
 */
export const test_api_connector_open_data_get_get_stock_price_info_59_days_ago =
  async (connection: CApi.IConnection) => {
    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 59);

    const year = oneWeekAgo.getFullYear();
    const month = ("0" + (oneWeekAgo.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 +1 필요
    const day = ("0" + oneWeekAgo.getDate()).slice(-2); // 2자리 숫자로 맞추기 위해 '0'을 추가

    const formattedDate = `${year}${month}${day}`;

    const res = await CApi.functional.connector.open_data.getStockPriceInfo(
      connection,
      {
        likeItmsNm: "삼성전자",
        basDt: formattedDate,
      },
    );

    typia.assertEquals(res);
    assert(res.response.body.items.item.length > 0);
  };

/**
 * 1달 전 데이터는 얻을 수 있음
 * @param connection
 */
export const test_api_connector_open_data_get_get_stock_price_info_before_one_month =
  async (connection: CApi.IConnection) => {
    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 30);

    const year = oneWeekAgo.getFullYear();
    const month = ("0" + (oneWeekAgo.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 +1 필요
    const day = ("0" + oneWeekAgo.getDate()).slice(-2); // 2자리 숫자로 맞추기 위해 '0'을 추가

    const formattedDate = `${year}${month}${day}`;

    const res = await CApi.functional.connector.open_data.getStockPriceInfo(
      connection,
      {
        likeItmsNm: "삼성전자",
        basDt: formattedDate,
      },
    );

    typia.assertEquals(res);
    assert(res.response.body.items.item.length > 0);
  };

/**
 * 1주 전 데이터 얻을 수 있음
 */
export const test_api_connector_open_data_get_get_stock_price_info_before_one_week =
  async (connection: CApi.IConnection) => {
    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 59);

    const year = oneWeekAgo.getFullYear();
    const month = ("0" + (oneWeekAgo.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 +1 필요
    const day = ("0" + oneWeekAgo.getDate()).slice(-2); // 2자리 숫자로 맞추기 위해 '0'을 추가

    const formattedDate = `${year}${month}${day}`;

    const res = await CApi.functional.connector.open_data.getStockPriceInfo(
      connection,
      {
        likeItmsNm: "삼성전자",
        basDt: formattedDate,
      },
    );

    typia.assertEquals(res);
    assert(res.response.body.items.item.length > 0);
  };

/**
 * 오늘 데이터는 얻을 수 없음
 */
export const test_api_connector_open_data_get_get_today_stock_price_info =
  async (connection: CApi.IConnection) => {
    const year = String(new Date().getFullYear());
    const month = String(new Date().getMonth() + 1).padStart(2, "0");
    const date = String(new Date().getDate()).padStart(2, "0");

    const res = await CApi.functional.connector.open_data.getStockPriceInfo(
      connection,
      {
        likeItmsNm: "삼성전자",
        basDt: `${year}${month}${date}`,
      },
    );

    typia.assertEquals(res);
    assert(res.response.body.items.item.length === 0);
  };


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

  typia.assertEquals(res);
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

  typia.assertEquals(res);
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

  typia.assertEquals(res);
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

    typia.assertEquals<true>(res.data.length === 10);
    typia.assertEquals<true>(res.nextPage);
    typia.assertEquals(res);
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

  typia.assertEquals<false>(res.data.length === 1000);
  typia.assertEquals<false>(res.nextPage);
  typia.assertEquals(res);
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

    typia.assertEquals<false>(res.data.length === 1000);
    typia.assertEquals(res);
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

    typia.assertEquals<false>(res.data.length === 1000);
    typia.assertEquals<false>(res.nextPage);
    typia.assertEquals(res);
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

  typia.assertEquals(res);
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

    typia.assertEquals(firstPage);

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

    typia.assertEquals(secondPage);
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

  typia.assertEquals(res);
};

export const test_api_connector_open_data_get_copy_right = async (
  connection: CApi.IConnection,
) => {
  const res = await CApi.functional.connector.open_data.getCopyRight(
    connection,
    {},
  );

  typia.assertEquals(res);
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

    typia.assertEquals(res);
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

    typia.assertEquals(res);
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

  typia.assertEquals(res);
};
