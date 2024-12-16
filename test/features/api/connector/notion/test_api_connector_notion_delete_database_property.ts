import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { INotion } from "@wrtn/connector-api/lib/structures/connector/notion/INotion";
import { test_api_connector_notion_add_database_property } from "./test_api_connector_notion_add_database_property";

export const test_api_connector_notion_delete_database_property = async (
  connection: CApi.IConnection,
): Promise<INotion.IDeleteDatabasePropertyOutput> => {
  const database =
    await test_api_connector_notion_add_database_property(connection);
  const res =
    await CApi.functional.connector.notion.delete_database_property.deleteDatabaseProperty(
      connection,
      {
        databaseId: database.id,
        secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
        propertyName: "메롱",
      },
    );
  typia.assertEquals<INotion.IDeleteDatabasePropertyOutput>(res);
  return res;
};
