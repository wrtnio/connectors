import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IGoogleSheet } from "@wrtn/connector-api/lib/structures/connector/google_sheet/IGoogleSheet";

import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_get_worksheet_google_sheet = async (
  connection: CApi.IConnection,
): Promise<IGoogleSheet.IGetWorkSheetOutput> => {
  const input = {
    url: "https://docs.google.com/spreadsheets/d/1t5N42ZfMFICZlPPT-sLxRgMNNiR-2j0Fb49SMQyVXRo/edit#gid=0",
    secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
  };
  const result = await CApi.functional.connector.google_sheet.worksheet.getWorkSheet(connection, input);
  typia.assertEquals(result);
  return result.data;
};
