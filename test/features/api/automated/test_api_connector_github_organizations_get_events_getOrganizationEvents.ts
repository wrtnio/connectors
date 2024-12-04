import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_organizations_get_events_getOrganizationEvents =
  async (connection: api.IConnection) => {
    const output: Primitive<IGithub.IGetEventOutput> =
      await api.functional.connector.github.organizations.get_events.getOrganizationEvents(
        connection,
        typia.random<IGithub.IGetOrganizationEventInput>(),
      );
    typia.assert(output);
  };
