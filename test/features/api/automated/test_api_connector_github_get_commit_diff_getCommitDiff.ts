import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_get_commit_diff_getCommitDiff = async (
  connection: api.IConnection,
) => {
  const output: Primitive<string> =
    await api.functional.connector.github.get_commit_diff.getCommitDiff(
      connection,
      typia.random<IGithub.IGetCommitInput>(),
    );
  typia.assert(output);
};
