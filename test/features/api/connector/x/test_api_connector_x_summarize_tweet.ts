import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { test_api_connector_x_make_txt_file_and_upload_s3 } from "./test_api_connector_x_make_txt_file_and_upload_s3";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_x_summarize_tweet = async (
  connection: CApi.IConnection,
) => {
  await ConnectorGlobal.reload();
  const file =
    await test_api_connector_x_make_txt_file_and_upload_s3(connection);
  const res = await CApi.functional.connector.x.summarize_tweet.summarizeTweet(
    connection,
    {
      fileUrl: file.fileUrl,
    },
  );
  console.log("SUMMARIZE_RESULT", res);
  typia.assert(res);
  return res;
};
