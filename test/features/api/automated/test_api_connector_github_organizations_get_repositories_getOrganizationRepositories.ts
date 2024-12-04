import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_organizations_get_repositories_getOrganizationRepositories =
  async (connection: api.IConnection) => {
    const output: Primitive<IGithub.IGetOrganizationRepositoryOutput> =
      await api.functional.connector.github.organizations.get_repositories.getOrganizationRepositories(
        connection,
        typia.random<IGithub.IGetOrganizationEventInput>(),
      );
    typia.assert(output);
  };
