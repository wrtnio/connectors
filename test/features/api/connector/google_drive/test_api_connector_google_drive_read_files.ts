import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_google_drive_read_files = async (
  connection: CApi.IConnection,
) => {
  const secretKey = ConnectorGlobal.env.GOOGLE_TEST_SECRET;

  const files = await CApi.functional.connector.google_drive.get.files.fileList(
    connection,
    {
      secretKey,
    },
  );

  if (files.data.length === 0) {
    throw new Error(
      "파일의 개수가 0개 이하라 google_drive의 읽기 테스트가 불가능합니다.",
    );
  }

  for await (const file of files.data) {
    const res = await CApi.functional.connector.google_drive.get.file.readFile(
      connection,
      file.id as string,
      {
        secretKey,
      },
    );

    typia.assert(res);
  }
};
