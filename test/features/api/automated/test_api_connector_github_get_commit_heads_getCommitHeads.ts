import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_get_commit_heads_getCommitHeads = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IGithub.IGetCommitHeadOutput> =
    await api.functional.connector.github.get_commit_heads.getCommitHeads(
      connection,
      typia.random<IGithub.IGetCommitHeadInput>(),
    );
  typia.assert(output);
};
