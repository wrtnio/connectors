import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_issues_updateIssue = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IGithub.Issue> =
    await api.functional.connector.github.issues.updateIssue(
      connection,
      typia.random<IGithub.IUpdateIssueInput>(),
    );
  typia.assert(output);
};
