import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { INotion } from "@wrtn/connector-api/lib/structures/connector/notion/INotion";

export const test_api_connector_notion_create_database = async (
  connection: CApi.IConnection,
): Promise<INotion.ICreateDatabaseOutput> => {
  const res =
    await CApi.functional.connector.notion.create_database.createDatabase(
      connection,
      {
        parentPageId: "151ab4840d3380ee8ebacd2c101823df",
        secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
        title: "데이터베이스 생성 테스트",
        properties: [
          {
            Name: {
              title: {},
            },
          },
          {
            description: {
              rich_text: {},
            },
          },
          {
            메모: {
              rich_text: {},
            },
          },
          {
            헤헤: {
              rich_text: {},
            },
          },
        ],
      },
    );
  typia.assertEquals<INotion.ICreateGalleryDatabaseOutput>(res);
  return res;
};
