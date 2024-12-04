import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { test_api_connector_notion_create_gallery_database } from "./test_api_connector_notion_create_gallery_database";

export const test_api_connector_notion_create_gallery_item = async (
  connection: CApi.IConnection,
) => {
  const databaseId =
    await test_api_connector_notion_create_gallery_database(connection);
  const res =
    await CApi.functional.connector.notion.create_gallery_database_item.createGalleryDatabaseItem(
      connection,
      {
        databaseId: databaseId,
        secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
        property: [
          {
            title: "아이템 1",
            description: "아이템 1",
            imageUrl:
              "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
          },
          {
            title: "아이템 2",
            description: "아이템 2",
            imageUrl:
              "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/NaverCafe_full.svg",
          },
          {
            title: "아이템 3",
            description: "아이템 3",
            imageUrl:
              "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/JIraCloud_full.svg",
          },
        ],
      },
    );
  typia.assertEquals(res);
};
