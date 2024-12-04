import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_repositories_get_pull_requests_getRepositoryPullRequest =
  async (connection: api.IConnection) => {
    const output: Primitive<IGithub.IFetchRepositoryPullRequestOutput> =
      await api.functional.connector.github.repositories.get_pull_requests.getRepositoryPullRequest(
        connection,
        typia.random<IGithub.IFetchRepositoryPullRequestInput>(),
      );
    typia.assert(output);
  };
