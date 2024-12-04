import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_get_pull_requests_associated_with_a_commit_getPullRequestAssociatedWithACommit =
  async (connection: api.IConnection) => {
    const output: Primitive<IGithub.IGetPullRequestOutput> =
      await api.functional.connector.github.get_pull_requests_associated_with_a_commit.getPullRequestAssociatedWithACommit(
        connection,
        typia.random<IGithub.IGetPullRequestInput>(),
      );
    typia.assert(output);
  };
