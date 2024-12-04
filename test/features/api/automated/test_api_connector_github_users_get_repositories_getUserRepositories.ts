import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_users_get_repositories_getUserRepositories =
  async (connection: api.IConnection) => {
    const output: Primitive<IGithub.IGetUserRepositoryOutput> =
      await api.functional.connector.github.users.get_repositories.getUserRepositories(
        connection,
        typia.random<IGithub.IGetUserRepositoryInput>(),
      );
    typia.assert(output);
  };
