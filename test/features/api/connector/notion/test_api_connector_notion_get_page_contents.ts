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
        pageId: "145ab4840d3381d48777e700540cdce7",
        secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
      },
    );
  console.log("RES", res);

  typia.assertEquals(res);
};
