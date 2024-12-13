import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { test_api_connector_notion_create_database } from "./test_api_connector_notion_create_database";
import { INotion } from "@wrtn/connector-api/lib/structures/connector/notion/INotion";

export const test_api_connector_notion_add_items_to_database = async (
  connection: CApi.IConnection,
): Promise<INotion.IAddItemsToDatabaseOutput> => {
  const database = await test_api_connector_notion_create_database(connection);
  const res =
    await CApi.functional.connector.notion.add_items_to_database.addItemsToDatabase(
      connection,
      {
        databaseId: database.id,
        secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
        items: [
          {
            title: "안녕",
            rich_text: [
              {
                propertyName: "description",
                value: "1",
              },
              {
                propertyName: "메모",
                value: "2",
              },
              {
                propertyName: "헤헤",
                value: "3",
              },
            ],
            date: new Date().toISOString(),
            markdown: `# 안녕하세요`,
          },
          {
            title: "잘가",
            rich_text: [
              {
                propertyName: "description",
                value: "4",
              },
              {
                propertyName: "메모",
                value: "5",
              },
              {
                propertyName: "헤헤",
                value: "6",
              },
            ],
            date: new Date().toISOString(),
            markdown: `# 잘가세요`,
          },
        ],
      },
    );
  typia.assertEquals<INotion.IAddItemsToDatabaseOutput>(res);
  return res;
};
