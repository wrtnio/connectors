import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_notion_get_page_contents = async (
  connection: CApi.IConnection,
) => {
  const pages = await CApi.functional.connector.notion.get.page.readPageList(
    connection,
    {
      secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
    },
  );

  for await (const page of pages.slice(0, 10)) {
    const res =
      await CApi.functional.connector.notion.get.page.contents.readPageContents(
        connection,
        {
          block_id: page.pageId,
          page_size: 50,
          secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
        },
      );

    typia.assertEquals(res);
  }
};
