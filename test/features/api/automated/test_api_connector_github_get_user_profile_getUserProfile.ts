import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_get_user_profile_getUserProfile = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IGithub.IGetUserProfileOutput> =
    await api.functional.connector.github.get_user_profile.getUserProfile(
      connection,
      typia.random<IGithub.IGetUserProfileInput>(),
    );
  typia.assert(output);
};
