import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_google_drive_read_pdf = async (
  connection: CApi.IConnection,
) => {
  const secretKey = ConnectorGlobal.env.GOOGLE_TEST_SECRET;

  const pdf = await CApi.functional.connector.google_drive.get.file.readFile(
    connection,
    "13SikpPZyeWelZ06HsA84J7r7M52fzJeH",
    {
      secretKey,
    },
  );

  typia.assert(pdf);
};
