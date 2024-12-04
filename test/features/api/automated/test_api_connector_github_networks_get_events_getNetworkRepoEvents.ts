import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_networks_get_events_getNetworkRepoEvents =
  async (connection: api.IConnection) => {
    const output: Primitive<IGithub.IGetEventOutput> =
      await api.functional.connector.github.networks.get_events.getNetworkRepoEvents(
        connection,
        typia.random<IGithub.IGetRepoEventInput>(),
      );
    typia.assert(output);
  };
