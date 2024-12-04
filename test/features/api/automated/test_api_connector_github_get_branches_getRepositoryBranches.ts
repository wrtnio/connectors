import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_get_branches_getRepositoryBranches =
  async (connection: api.IConnection) => {
    const output: Primitive<IGithub.IGetBranchOutput> =
      await api.functional.connector.github.get_branches.getRepositoryBranches(
        connection,
        typia.random<IGithub.IGetBranchInput>(),
      );
    typia.assert(output);
  };
