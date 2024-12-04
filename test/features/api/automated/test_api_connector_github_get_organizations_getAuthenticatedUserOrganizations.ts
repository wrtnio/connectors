import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_get_organizations_getAuthenticatedUserOrganizations =
  async (connection: api.IConnection) => {
    const output: Primitive<IGithub.IGetAuthenticatedUserOrganizationOutput> =
      await api.functional.connector.github.get_organizations.getAuthenticatedUserOrganizations(
        connection,
        typia.random<IGithub.IGetAuthenticatedUserOrganizationInput>(),
      );
    typia.assert(output);
  };
