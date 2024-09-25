import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { test_api_connector_x_get_user_timeline_tweets } from "./test_api_connector_x_get_user_timeline_tweets";

export const test_api_connector_x_get_tweet = async (
  connection: CApi.IConnection,
) => {
  const tweet = await test_api_connector_x_get_user_timeline_tweets(connection);
  const res = await CApi.functional.connector.x.get_tweet.getTweet(connection, {
    secretKey: ConnectorGlobal.env.X_TEST_SECRET,
    tweetId: tweet[0].id,
  });
  typia.assert(res);
  return res;
};
