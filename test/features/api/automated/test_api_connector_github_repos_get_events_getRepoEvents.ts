import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_repos_get_events_getRepoEvents = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IGithub.IGetEventOutput> =
    await api.functional.connector.github.repos.get_events.getRepoEvents(
      connection,
      typia.random<IGithub.IGetRepoEventInput>(),
    );
  typia.assert(output);
};
