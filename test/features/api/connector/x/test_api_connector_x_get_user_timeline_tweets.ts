import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { test_api_connector_x_get_user } from "./test_api_connector_x_get_user";

export const test_api_connector_x_get_user_timeline_tweets = async (
  connection: CApi.IConnection,
) => {
  const user = await test_api_connector_x_get_user(connection);
  const res =
    await CApi.functional.connector.x.get_user_timeline_tweets.getUserTimelineTweets(
      connection,
      {
        userId: user.id,
        userName: user.userName,
      },
    );
  typia.assert(res);
  return res;
};
