import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_get_followees_getFollowees = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IGithub.IGetFolloweeOutput> =
    await api.functional.connector.github.get_followees.getFollowees(
      connection,
      typia.random<IGithub.IGetFolloweeInput>(),
    );
  typia.assert(output);
};
