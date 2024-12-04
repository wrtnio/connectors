import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IKoreaMeteorologicalAdministration } from "../../../../src/api/structures/connector/open_data/IOpenData";

export const test_api_connector_open_data_getShortTermForecast = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IKoreaMeteorologicalAdministration.IWeatherResponse> =
    await api.functional.connector.open_data.getShortTermForecast(
      connection,
      typia.random<IKoreaMeteorologicalAdministration.IGetVillageForecastInformationInput>(),
    );
  typia.assert(output);
};
