import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";

export const test_api_internal_google = async (
  connection: CApi.IConnection,
) => {
  const refreshAccessTokenOutput =
    await CApi.functional.internal.google.refreshAccessToken(connection);

  typia.assert<string>(refreshAccessTokenOutput);
};
