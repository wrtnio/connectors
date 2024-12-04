import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_organizations_users_get_events_getUserOrganizationEvents =
  async (connection: api.IConnection) => {
    const output: Primitive<IGithub.IGetEventOutput> =
      await api.functional.connector.github.organizations.users.get_events.getUserOrganizationEvents(
        connection,
        typia.random<IGithub.IGetOrganizationEventInput>(),
      );
    typia.assert(output);
  };
