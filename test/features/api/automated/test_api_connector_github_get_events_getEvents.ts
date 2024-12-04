import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_get_events_getEvents = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IGithub.IGetEventOutput> =
    await api.functional.connector.github.get_events.getEvents(
      connection,
      typia.random<IGithub.IGetEventInput>(),
    );
  typia.assert(output);
};
