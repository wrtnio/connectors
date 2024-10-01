import CApi from "@wrtn/connector-api/lib/index";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_notion_delete_block_and_page = async (
  connection: CApi.IConnection,
) => {
  const page =
    await CApi.functional.connector.notion.markdown.createPageByMarkdown(
      connection,
      {
        markdown: `
# 테스트 헤딩1
## 테스트 헤딩2
### 테스트 헤딩3
- parent
	- child`,
        parentPageId: "011ff941f052423f8a203d8a84e4e71f",
        title: "TEST",
        secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
      },
    );

  const blocks =
    await CApi.functional.connector.notion.get.page.contents.readPageContents(
      connection,
      {
        block_id: page.id,
        secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
      },
    );

  for await (const block of blocks) {
    await CApi.functional.connector.notion.page.block.deleteBlock(connection, {
      block_id: block.id as string,
      secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
    });
  }

  await CApi.functional.connector.notion.page.block.deleteBlock(connection, {
    block_id: page.id as string,
    secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
  });
};
