import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";

import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { Try } from "../../../../../src/utils/createResponseForm";

export const test_api_connector_write_headers_google_sheet = async (
  connection: CApi.IConnection,
): Promise<Try<void>> => {
  const input = {
    url: "https://docs.google.com/spreadsheets/d/1t5N42ZfMFICZlPPT-sLxRgMNNiR-2j0Fb49SMQyVXRo/edit#gid=0",
    index: 0,
    headerNames: ["test1", "test2"],
    secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
  };
  const result = await CApi.functional.connector.google_sheet.header.writeHeaders(connection, input);
  typia.assertEquals(result);
  return result;
};
