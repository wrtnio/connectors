import CApi from "@wrtn/connector-api/lib/index";
import { randomUUID } from "crypto";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_notion_update_page_title = async (
  connection: CApi.IConnection,
) => {
  const pageToUpdate =
    await CApi.functional.connector.notion.markdown.createPageByMarkdown(
      connection,
      {
        parentPageId: "804989a1bb91410db6539034b212ebf5",
        title: randomUUID(),
        secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
        markdown: ``,
      },
    );

  const title_to_update = randomUUID();
  const res = await CApi.functional.connector.notion.page.title.updatePageTitle(
    connection,
    {
      secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
      title: title_to_update,
      pageId: pageToUpdate.id,
    },
  );

  typia.assertEquals(res);

  const retrieved =
    await CApi.functional.connector.notion.get_page_by_title.getPageByTitle(
      connection,
      {
        secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
        title: title_to_update,
      },
    );

  typia.assertEquals(retrieved);
};
