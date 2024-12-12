import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { INotion } from "@wrtn/connector-api/lib/structures/connector/notion/INotion";
import { test_api_connector_notion_create_database } from "./test_api_connector_notion_create_database";

export const test_api_connector_notion_add_database_property = async (
  connection: CApi.IConnection,
): Promise<INotion.IAddDatabasePropertyOutput> => {
  const database = await test_api_connector_notion_create_database(connection);
  const res =
    await CApi.functional.connector.notion.add_database_property.addDatabaseProperty(
      connection,
      {
        databaseId: database.id,
        secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
        property: {
          메롱: {
            rich_text: {},
          },
        },
      },
    );
  typia.assertEquals<INotion.IAddDatabasePropertyOutput>(res);
  return res;
};
