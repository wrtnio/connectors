import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_repositories_pull_requests_get_commits_readPullRequestCommits =
  async (connection: api.IConnection) => {
    const output: Primitive<IGithub.IReadPullRequestCommitOutput> =
      await api.functional.connector.github.repositories.pull_requests.get_commits.readPullRequestCommits(
        connection,
        typia.random<IGithub.IReadPullRequestCommitInput>(),
      );
    typia.assert(output);
  };
