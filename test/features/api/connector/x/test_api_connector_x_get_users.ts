import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_x_get_users = async (
  connection: CApi.IConnection,
) => {
  await ConnectorGlobal.reload();
  const res = await CApi.functional.connector.x.get_users.getUsers(connection, {
    userName: [
      "elonmusk",
      "ivanhzhao",
      "sama",
      "POTUS",
      "realDonaldTrump",
      "hwchase17",
      "ilyasut",
      "miramurati",
    ],
    secretKey: ConnectorGlobal.env.X_TEST_SECRET,
  });
  typia.assert(res);
  return res;
};
