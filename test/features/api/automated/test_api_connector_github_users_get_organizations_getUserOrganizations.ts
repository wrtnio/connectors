import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_users_get_organizations_getUserOrganizations =
  async (connection: api.IConnection) => {
    const output: Primitive<IGithub.IGetUserOrganizationOutput> =
      await api.functional.connector.github.users.get_organizations.getUserOrganizations(
        connection,
        typia.random<IGithub.IGetUserOrganizationInput>(),
      );
    typia.assert(output);
  };
