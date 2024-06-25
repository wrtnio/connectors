import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IHancell } from "@wrtn/connector-api/lib/structures/connector/hancell/IHancell";

import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_hancell = async (
  connection: CApi.IConnection,
) => {
  /**
   * read worksheet list
   */
  const url = `https://${ConnectorGlobal.env.AWS_S3_BUCKET}.s3.ap-northeast-2.amazonaws.com/example.cell`;
  const worksheetListInput: IHancell.IReadHancellInput = { fileUrl: url };

  const res = await CApi.functional.connector.hancell.read(
    connection,
    worksheetListInput,
  );

  typia.assertEquals(res);
};
