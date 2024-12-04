import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_repositories_get_activities_getRepositoryActivities =
  async (connection: api.IConnection) => {
    const output: Primitive<IGithub.IGetRepositoryActivityOutput> =
      await api.functional.connector.github.repositories.get_activities.getRepositoryActivities(
        connection,
        typia.random<IGithub.IGetRepositoryActivityInput>(),
      );
    typia.assert(output);
  };
