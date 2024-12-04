import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_get_commit_list_getCommitList = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IGithub.IGetCommitListOutput> =
    await api.functional.connector.github.get_commit_list.getCommitList(
      connection,
      typia.random<IGithub.IGetCommitListInput>(),
    );
  typia.assert(output);
};
