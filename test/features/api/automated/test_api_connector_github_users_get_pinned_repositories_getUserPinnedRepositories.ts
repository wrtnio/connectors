import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_users_get_pinned_repositories_getUserPinnedRepositories =
  async (connection: api.IConnection) => {
    const output: Primitive<IGithub.IGetUserPinnedRepositoryOutput> =
      await api.functional.connector.github.users.get_pinned_repositories.getUserPinnedRepositories(
        connection,
        typia.random<IGithub.IGetUserPinnedRepositoryInput>(),
      );
    typia.assert(output);
  };
