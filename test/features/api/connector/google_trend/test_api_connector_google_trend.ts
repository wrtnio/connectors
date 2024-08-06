import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IGoogleTrend } from "@wrtn/connector-api/lib/structures/connector/google_trend/IGoogleTrend";

export const test_api_connector_google_trend = async (
  connection: CApi.IConnection,
) => {
  const results = await CApi.functional.connector.google_trend.daily(
    connection,
    {},
  );
  typia.assert<IGoogleTrend.IResponse[]>(results);
};
