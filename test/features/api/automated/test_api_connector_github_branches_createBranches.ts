import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_branches_createBranches = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IGithub.ICreateBranchOutput> =
    await api.functional.connector.github.branches.createBranches(
      connection,
      typia.random<IGithub.ICreateBranchInput>(),
    );
  typia.assert(output);
};
