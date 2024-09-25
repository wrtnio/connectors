import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { test_api_connector_x_get_user } from "./test_api_connector_x_get_user";

export const test_api_connector_x_get_user_followers = async (
  connection: CApi.IConnection,
) => {
  const user = await test_api_connector_x_get_user(connection);
  const res =
    await CApi.functional.connector.x.get_user_followers.getUserFollowers(
      connection,
      {
        userId: user.id,
        secretKey: ConnectorGlobal.env.X_TEST_SECRET,
      },
    );
  typia.assert(res);
  return res;
};
