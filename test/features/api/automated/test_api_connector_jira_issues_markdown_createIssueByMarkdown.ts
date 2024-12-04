import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IJira } from "../../../../src/api/structures/connector/jira/IJira";

export const test_api_connector_jira_issues_markdown_createIssueByMarkdown =
  async (connection: api.IConnection) => {
    const output: Primitive<IJira.ICreateIssueOutput> =
      await api.functional.connector.jira.issues.markdown.createIssueByMarkdown(
        connection,
        typia.random<IJira.ICreateIssueByMarkdownInput>(),
      );
    typia.assert(output);
  };
