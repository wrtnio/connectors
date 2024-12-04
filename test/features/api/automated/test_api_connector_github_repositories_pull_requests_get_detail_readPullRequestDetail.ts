import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_repositories_pull_requests_get_detail_readPullRequestDetail =
  async (connection: api.IConnection) => {
    const output: Primitive<IGithub.PullRequest> =
      await api.functional.connector.github.repositories.pull_requests.get_detail.readPullRequestDetail(
        connection,
        typia.random<IGithub.IReadPullRequestDetailInput>(),
      );
    typia.assert(output);
  };
