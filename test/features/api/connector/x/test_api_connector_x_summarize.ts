import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { test_api_connector_x_get_users } from "./test_api_connector_x_get_users";

export const test_api_connector_x_summarize = async (
  connection: CApi.IConnection,
) => {
  await ConnectorGlobal.reload();
  const users = await test_api_connector_x_get_users(connection);
  const res = await CApi.functional.connector.x.summarize.summarizeTweet(
    connection,
    {
      user: users.map((user) => {
        return {
          userId: user.id,
          name: user.name,
          userName: user.userName,
        };
      }),
      secretKey: ConnectorGlobal.env.X_TEST_SECRET,
      query: "userName별로 content를 요약해줘.",
    },
  );
  console.log("RES", res);
  typia.assert(res);
  return res;
};
