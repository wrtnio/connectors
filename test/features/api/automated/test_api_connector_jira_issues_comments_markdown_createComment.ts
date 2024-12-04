import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IJira } from "../../../../src/api/structures/connector/jira/IJira";

export const test_api_connector_jira_issues_comments_markdown_createComment =
  async (connection: api.IConnection) => {
    const output: Primitive<IJira.ICreateCommentOutput> =
      await api.functional.connector.jira.issues.comments.markdown.createComment(
        connection,
        typia.random<IJira.ICreateCommentByMarkdownInput>(),
      );
    typia.assert(output);
  };
