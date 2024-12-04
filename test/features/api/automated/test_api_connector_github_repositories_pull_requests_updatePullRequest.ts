import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_repositories_pull_requests_updatePullRequest =
  async (connection: api.IConnection) => {
    const output: Primitive<IGithub.IUpdatePullRequestOutput> =
      await api.functional.connector.github.repositories.pull_requests.updatePullRequest(
        connection,
        typia.random<IGithub.IUpdatePullRequestInput>(),
      );
    typia.assert(output);
  };
