import typia from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_repositories_pull_requests_requested_reviewers_removeRequestedReviewers =
  async (connection: api.IConnection) => {
    const output =
      await api.functional.connector.github.repositories.pull_requests.requested_reviewers.removeRequestedReviewers(
        connection,
        typia.random<IGithub.IRequestReviewerInput>(),
      );
    typia.assert(output);
  };
