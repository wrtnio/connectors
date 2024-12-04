import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_repositories_pull_requests_createPullRequest =
  async (connection: api.IConnection) => {
    const output: Primitive<IGithub.ICreatePullRequestOutput> =
      await api.functional.connector.github.repositories.pull_requests.createPullRequest(
        connection,
        typia.random<IGithub.ICreatePullRequestInput>(),
      );
    typia.assert(output);
  };
