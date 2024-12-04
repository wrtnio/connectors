import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_get_commit_getCommit = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IGithub.IGetCommitOutput> =
    await api.functional.connector.github.get_commit.getCommit(
      connection,
      typia.random<IGithub.IGetCommitInput>(),
    );
  typia.assert(output);
};
