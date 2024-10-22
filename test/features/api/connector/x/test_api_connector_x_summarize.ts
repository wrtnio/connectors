import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { test_api_connector_x_prepare_summarize } from "./test_api_connector_x_prepare_summarize";

export const test_api_connector_x_summarize = async (
  connection: CApi.IConnection,
) => {
  await ConnectorGlobal.reload();
  const prepareSummaize =
    await test_api_connector_x_prepare_summarize(connection);
  const res = await CApi.functional.connector.x.summarize.summarizeTweet(
    connection,
    {
      chatId: prepareSummaize.chatId,
      query: "userName별로 content를 요약해줘.",
    },
  );
  typia.assert(res);
  return res;
};
