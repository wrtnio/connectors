import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { INotion } from "@wrtn/connector-api/lib/structures/connector/notion/INotion";
import { NotionDatabaseProperties } from "../../../../../src/utils/NotionDatabaseProperties";

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
        properties: {
          Name: NotionDatabaseProperties.createTitleProperty("Name"),
          description:
            NotionDatabaseProperties.createRichTextProperty("Description"),
          category: NotionDatabaseProperties.createSelectProperty("Category", [
            { name: "A", color: "blue" },
            { name: "B", color: "green" },
          ]),
          created_at: NotionDatabaseProperties.createDateProperty("created_at"),
        },
      },
    );
  typia.assertEquals<INotion.ICreateGalleryDatabaseOutput>(res);
  return res;
};
