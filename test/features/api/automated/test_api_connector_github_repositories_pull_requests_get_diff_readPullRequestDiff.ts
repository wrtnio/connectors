import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_repositories_pull_requests_get_diff_readPullRequestDiff =
  async (connection: api.IConnection) => {
    const output: Primitive<IGithub.IReadPullRequestDiffOutput> =
      await api.functional.connector.github.repositories.pull_requests.get_diff.readPullRequestDiff(
        connection,
        typia.random<IGithub.IReadPullRequestDetailInput>(),
      );
    typia.assert(output);
  };
