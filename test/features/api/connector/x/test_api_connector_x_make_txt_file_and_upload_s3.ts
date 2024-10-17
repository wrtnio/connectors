import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { test_api_connector_x_get_user_timeline_tweets } from "./test_api_connector_x_get_user_timeline_tweets";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_x_make_txt_file_and_upload_s3 = async (
  connection: CApi.IConnection,
) => {
  await ConnectorGlobal.reload();
  const tweets =
    await test_api_connector_x_get_user_timeline_tweets(connection);
  const res =
    await CApi.functional.connector.x.make_txt_file_and_upload.makeTxtFileForTweetAndUploadToS3(
      connection,
      tweets,
    );
  typia.assert(res);
  return res;
};
