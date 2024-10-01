import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_notion_get_page_contents_by_page_id = async (
  connection: CApi.IConnection,
) => {
  const res =
    await CApi.functional.connector.notion.get.page.contents.readPageContents(
      connection,
      {
        block_id: "112ab4840d338052a0a8ca5788eb25b0" as string,
        secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
      },
    );

  typia.assertEquals(res);
};
