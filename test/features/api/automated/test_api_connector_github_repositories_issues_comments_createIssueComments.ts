import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_repositories_issues_comments_createIssueComments =
  async (connection: api.IConnection) => {
    const output: Primitive<IGithub.IssueComment> =
      await api.functional.connector.github.repositories.issues.comments.createIssueComments(
        connection,
        typia.random<IGithub.ICreateIssueCommentInput>(),
      );
    typia.assert(output);
  };
