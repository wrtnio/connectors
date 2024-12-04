import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_repositories_issues_get_comments_getIssueComments =
  async (connection: api.IConnection) => {
    const output: Primitive<IGithub.IGetIssueCommentsOutput> =
      await api.functional.connector.github.repositories.issues.get_comments.getIssueComments(
        connection,
        typia.random<IGithub.IGetIssueCommentsInput>(),
      );
    typia.assert(output);
  };
