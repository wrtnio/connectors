import CApi from "@wrtn/connector-api/lib/index";
import { IGmail } from "@wrtn/connector-api/lib/structures/connector/gmail/IGmail";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_gmail_send_mail_with_files = async (
  connection: CApi.IConnection,
) => {
  const secretKey = ConnectorGlobal.env.GOOGLE_TEST_SECRET;
  const createMailInput: IGmail.ICreateMailInput = {
    to: ["store@wrtn.io"],
    subject: "안녕하세요",
    body: "Gmail Connector 테스트 입니다.",
    cc: ["store@wrtn.io"],
    files: [
      {
        filename: "file1.xlsx",
        fileUrl: `https://studio-api-bucket.s3.ap-northeast-2.amazonaws.com/a.xlsx`,
      },
      {
        filename: "file2.csv",
        fileUrl: `https://studio-api-bucket.s3.ap-northeast-2.amazonaws.com/a.csv`,
      },
    ],
    secretKey,
  };

  const res = await CApi.functional.connector.gmail.send(
    connection,
    createMailInput,
  );

  typia.assert(res);
};
