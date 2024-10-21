import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { test_api_connector_x_make_txt_file_and_upload_s3 } from "./test_api_connector_x_make_txt_file_and_upload_s3";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_x_get_chunk_document = async (
  connection: CApi.IConnection,
) => {
  await ConnectorGlobal.reload();
  const file =
    await test_api_connector_x_make_txt_file_and_upload_s3(connection);
  const res =
    await CApi.functional.connector.x.get_chunk_document.getChunkDocument(
      connection,
      {
        fileUrl: file.map((file) => file.fileUrl),
        query: "userName별로 content를 요약해줘.",
      },
    );
  typia.assert(res);
  return res;
};
