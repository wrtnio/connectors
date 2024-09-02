import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";

import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { IGoogleSheet } from "@wrtn/connector-api/lib/structures/connector/google_sheet/IGoogleSheet";
import { test_api_connector_create_google_sheet } from "./test_api_connector_create_google_sheet";

export const test_api_connector_append_google_sheet = async (
  connection: CApi.IConnection,
): Promise<void> => {
  const spreadSheetId = (
    await test_api_connector_create_google_sheet(connection)
  ).spreadsheetId;
  const input: IGoogleSheet.IAppendToSheetInput = {
    secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
    spreadSheetId,
    range: "A1:A3",
    values: [["test1"], ["test2"], ["test3"]],
  };
  const result =
    await CApi.functional.connector.google_sheet.append.appendGoogleSheet(
      connection,
      input,
    );
  typia.assertEquals(result);
};
