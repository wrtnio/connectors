import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_repos_get_contents_bulk_getBulkFileContents =
  async (connection: api.IConnection) => {
    const output: Primitive<IGithub.IGetBulkFileContentOutput> =
      await api.functional.connector.github.repos.get_contents.bulk.getBulkFileContents(
        connection,
        typia.random<IGithub.IGetBulkFileContentInput>(),
      );
    typia.assert(output);
  };
