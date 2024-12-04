import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_repos_get_contents_getFileContents =
  async (connection: api.IConnection) => {
    const output: Primitive<IGithub.IGetFileContentOutput> =
      await api.functional.connector.github.repos.get_contents.getFileContents(
        connection,
        typia.random<IGithub.IGetFileContentInput>(),
      );
    typia.assert(output);
  };
