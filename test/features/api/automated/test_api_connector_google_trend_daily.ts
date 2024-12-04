import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGoogleTrend } from "../../../../src/api/structures/connector/google_trend/IGoogleTrend";

export const test_api_connector_google_trend_daily = async (
  connection: api.IConnection,
) => {
  const output: Primitive<Array<IGoogleTrend.IResponse>> =
    await api.functional.connector.google_trend.daily(
      connection,
      typia.random<IGoogleTrend.IRequest>(),
    );
  typia.assert(output);
};
