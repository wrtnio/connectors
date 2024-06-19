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
