import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";

export const test_api_connector_open_data_get_short_term_forecast = async (
  connection: CApi.IConnection,
) => {
  const res = await CApi.functional.connector.open_data.getShortTermForecast(
    connection,
    {
      nx: 60,
      ny: 127,
    },
  );

  typia.assertEquals(res);
};

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
};

export const test_api_connector_open_data_get_get_standard_region_code_list =
  async (connection: CApi.IConnection) => {
    const res =
      await CApi.functional.connector.open_data.getStandardRegionCodeList(
        connection,
        {
          locatadd_nm: "서울특별시",
        },
      );

    typia.assertEquals(res);
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
