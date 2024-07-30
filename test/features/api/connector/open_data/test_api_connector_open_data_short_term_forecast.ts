import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";

export const test_api_connector_open_data_get_short_term_forecast_1 = async (
  connection: CApi.IConnection,
) => {
  const seoul = await CApi.functional.connector.open_data.getShortTermForecast(
    connection,
    {
      type: "latitude_and_longitude",
      nx: 126.978,
      ny: 37.5665,
    },
  );

  typia.assertEquals(seoul);
};

export const test_api_connector_open_data_get_short_term_forecast_2 = async (
  connection: CApi.IConnection,
) => {
  const busan = await CApi.functional.connector.open_data.getShortTermForecast(
    connection,
    {
      type: "latitude_and_longitude",
      nx: 129.0756,
      ny: 35.1796,
    },
  );

  typia.assertEquals(busan);
};

export const test_api_connector_open_data_get_short_term_forecast_3 = async (
  connection: CApi.IConnection,
) => {
  const daegu = await CApi.functional.connector.open_data.getShortTermForecast(
    connection,
    {
      type: "latitude_and_longitude",
      nx: 128.6014,
      ny: 35.8714,
    },
  );

  typia.assertEquals(daegu);
};

export const test_api_connector_open_data_get_short_term_forecast_4 = async (
  connection: CApi.IConnection,
) => {
  const incheon =
    await CApi.functional.connector.open_data.getShortTermForecast(connection, {
      type: "latitude_and_longitude",
      nx: 126.8529,
      ny: 37.4563,
    });

  typia.assertEquals(incheon);
};

export const test_api_connector_open_data_get_short_term_forecast_5 = async (
  connection: CApi.IConnection,
) => {
  const gwangju =
    await CApi.functional.connector.open_data.getShortTermForecast(connection, {
      type: "latitude_and_longitude",
      nx: 126.8526,
      ny: 37.1595,
    });

  typia.assertEquals(gwangju);
};

export const test_api_connector_open_data_get_short_term_forecast_6 = async (
  connection: CApi.IConnection,
) => {
  const daejeon =
    await CApi.functional.connector.open_data.getShortTermForecast(connection, {
      type: "latitude_and_longitude",
      nx: 127.3845,
      ny: 36.3504,
    });

  typia.assertEquals(daejeon);
};

export const test_api_connector_open_data_get_short_term_forecast_7 = async (
  connection: CApi.IConnection,
) => {
  const ulsan = await CApi.functional.connector.open_data.getShortTermForecast(
    connection,
    {
      type: "latitude_and_longitude",
      nx: 129.3114,
      ny: 35.5384,
    },
  );

  typia.assertEquals(ulsan);
};

export const test_api_connector_open_data_get_short_term_forecast_by_grid_coordinates =
  async (connection: CApi.IConnection) => {
    const grids = [
      { gridX: 60, gridY: 127 },
      { gridX: 97, gridY: 74 },
      { gridX: 53, gridY: 38 },
    ] as const;

    for await (const grid of grids) {
      const res =
        await CApi.functional.connector.open_data.getShortTermForecast(
          connection,
          {
            type: "grid_coordinates",
            nx: grid.gridX,
            ny: grid.gridY,
          },
        );

      typia.assertEquals(res);
    }
  };
