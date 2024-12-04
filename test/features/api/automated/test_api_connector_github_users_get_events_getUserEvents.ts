import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_users_get_events_getUserEvents = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IGithub.IGetEventOutput> =
    await api.functional.connector.github.users.get_events.getUserEvents(
      connection,
      typia.random<IGithub.IGetUserEventInput>(),
    );
  typia.assert(output);
};
