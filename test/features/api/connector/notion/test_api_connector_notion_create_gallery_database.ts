import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { INotion } from "@wrtn/connector-api/lib/structures/connector/notion/INotion";

export const test_api_connector_notion_create_gallery_database = async (
  connection: CApi.IConnection,
): Promise<INotion.ICreateGalleryDatabaseOutput> => {
  const res =
    await CApi.functional.connector.notion.create_gallery_database.createGalleryDatabase(
      connection,
      {
        parentPageId: "151ab4840d3380ee8ebacd2c101823df",
        secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
        title: "갤러리 데이터베이스 생성 테스트",
      },
    );
  typia.assertEquals<INotion.ICreateGalleryDatabaseOutput>(res);
  return res;
};
