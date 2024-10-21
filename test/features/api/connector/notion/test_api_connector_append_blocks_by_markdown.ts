import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_notion_create_page_by_markdown_with_300_lines =
  async (connection: CApi.IConnection) => {
    const res =
      await CApi.functional.connector.notion.markdown.createPageByMarkdown(
        connection,
        {
          markdown: new Array(300) // 300 라인 쓰기에 대한 ㅔㅌ스트
            .fill(0)
            .map((_, i) => `${i}: abcdefghijklmnopqrstuvwxyz`)
            .join("\n"),
          parentPageId: "011ff941f052423f8a203d8a84e4e71f",
          title: "TEST",
          secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
        },
      );

    typia.assert(res);
  };
