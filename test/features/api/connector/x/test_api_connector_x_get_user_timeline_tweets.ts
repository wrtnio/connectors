import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { test_api_connector_x_get_users } from "./test_api_connector_x_get_users";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_x_get_user_timeline_tweets = async (
  connection: CApi.IConnection,
) => {
  await ConnectorGlobal.reload();
  const users = await test_api_connector_x_get_users(connection);
  const res =
    await CApi.functional.connector.x.get_user_timeline_tweets.getUserTimelineTweets(
      connection,
      {
        secretKey: ConnectorGlobal.env.X_TEST_SECRET,
        user: users.map((user) => {
          return {
            userId: user.id,
            name: user.name,
            userName: user.userName,
          };
        }),
      },
    );
  console.log("TIMELINE_TWEETS", res);
  typia.assert(res);
  return res;
};
