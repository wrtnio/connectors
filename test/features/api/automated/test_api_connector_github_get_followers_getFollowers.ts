import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_get_followers_getFollowers = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IGithub.IGetFollowerOutput> =
    await api.functional.connector.github.get_followers.getFollowers(
      connection,
      typia.random<IGithub.IGetFollowerInput>(),
    );
  typia.assert(output);
};
