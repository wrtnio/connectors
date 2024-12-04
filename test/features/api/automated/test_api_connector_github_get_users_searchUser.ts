import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_get_users_searchUser = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IGithub.ISearchUserOutput> =
    await api.functional.connector.github.get_users.searchUser(
      connection,
      typia.random<IGithub.ISearchUserInput>(),
    );
  typia.assert(output);
};
