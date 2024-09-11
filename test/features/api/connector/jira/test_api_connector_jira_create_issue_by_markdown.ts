import CApi from "@wrtn/connector-api/lib/index";
import { IJira } from "@wrtn/connector-api/lib/structures/connector/jira/IJira";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { markdownToJiraBlock } from "../../../../../src/utils/markdownToJiraBlock";

const markdown = `
| 제목 1 | 제목 2 | 제목 3 |
|--------|--------|--------|
| 데이터 1 | 데이터 2 | 데이터 3 |
| 데이터 4 | 데이터 5 | 데이터 6 |
`;

const Configuration = {
  email: "studio@wrtn.io",
  token: ConnectorGlobal.env.JIRA_TEST_SECRET,
  domain: "https://wrtn-ecosystem.atlassian.net",
} as const;

export const test_api_connector_jira_create_issue_by_markdown = async (
  connection: CApi.IConnection,
) => {
  const blocks = markdownToJiraBlock(markdown);
  const validated = typia.assert<IJira.TopLevelBlockNode[]>(blocks);

  const res = await CApi.functional.connector.jira.issues.createIssue(
    connection,
    {
      secretKey: JSON.stringify(Configuration),
      fields: {
        summary: "TEST",
        project: { key: "KAK" },
        issuetype: { id: "10005" },

        description: {
          type: "doc",
          version: 1,
          content: validated,
        },
      },
    },
  );

  typia.assert(res);
};
