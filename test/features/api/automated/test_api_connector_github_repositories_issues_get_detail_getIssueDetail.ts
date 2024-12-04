import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_repositories_issues_get_detail_getIssueDetail =
  async (connection: api.IConnection) => {
    const output: Primitive<IGithub.DetailedIssue> =
      await api.functional.connector.github.repositories.issues.get_detail.getIssueDetail(
        connection,
        typia.random<IGithub.IGetIssueDetailInput>(),
      );
    typia.assert(output);
  };
