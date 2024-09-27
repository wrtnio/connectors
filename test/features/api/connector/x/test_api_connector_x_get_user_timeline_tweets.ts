import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { test_api_connector_x_get_user } from "./test_api_connector_x_get_user";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_x_get_user_timeline_tweets = async (
  connection: CApi.IConnection,
) => {
  await ConnectorGlobal.reload();
  const user = await test_api_connector_x_get_user(connection);
  const res =
    await CApi.functional.connector.x.get_user_timeline_tweets.getUserTimelineTweets(
      connection,
      {
        secretKey: ConnectorGlobal.env.X_TEST_SECRET,
        user: [
          {
            userId: user.id,
            userName: user.userName,
          },
        ],
      },
    );
  console.log("res", res);
  typia.assert(res);
  return res;
};
