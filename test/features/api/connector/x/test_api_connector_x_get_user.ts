import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";

export const test_api_connector_x_get_user = async (
  connection: CApi.IConnection,
) => {
  const res = await CApi.functional.connector.x.get_user.getUser(connection, {
    userName: "elonmusk",
  });
  typia.assert(res);
  return res;
};
