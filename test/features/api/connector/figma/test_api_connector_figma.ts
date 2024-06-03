import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IFigma } from "@wrtn/connector-api/lib/structures/connector/figma/IFigma";

import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

const requestBody: IFigma.IReadFileInput = {
  secretKey: ConnectorGlobal.env.FIGMA_TEST_SECRET,
  fileKey: ConnectorGlobal.env.FIGMA_TEST_FILE_KEY,
};

export const test_api_connector_figma = async (
  connection: CApi.IConnection,
) => {
  const result = await CApi.functional.connector.figma.get_files.readFiles(
    connection,
    requestBody,
  );

  typia.assertEquals(result);
  return result;
};
