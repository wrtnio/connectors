import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";

import { IGoogleSheet } from "@wrtn/connector-api/lib/structures/connector/google_sheet/IGoogleSheet";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_create_google_sheet = async (
  connection: CApi.IConnection,
): Promise<IGoogleSheet.ICreateGoogleSheetOutput> => {
  const input: IGoogleSheet.ICreateGoogleSheetInput = {
    title: "Sheet 생성 테스트",
    secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
  };
  const result =
    await CApi.functional.connector.google_sheet.create.createGoogleSheet(
      connection,
      input,
    );
  typia.assert(result);
  return result;
};
