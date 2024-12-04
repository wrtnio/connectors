import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_organizations_get_issues_getOrganizationIssues =
  async (connection: api.IConnection) => {
    const output: Primitive<IGithub.IGetOrganizationAuthenticationUserIssueOutput> =
      await api.functional.connector.github.organizations.get_issues.getOrganizationIssues(
        connection,
        typia.random<IGithub.IGetOrganizationAuthenticationUserIssueInput>(),
      );
    typia.assert(output);
  };
