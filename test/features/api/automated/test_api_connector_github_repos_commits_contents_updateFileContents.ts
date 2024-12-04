import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_repos_commits_contents_updateFileContents =
  async (connection: api.IConnection) => {
    const output: Primitive<IGithub.IUpsertFileContentOutput> =
      await api.functional.connector.github.repos.commits.contents.updateFileContents(
        connection,
        typia.random<IGithub.IUpdateFileContentInput>(),
      );
    typia.assert(output);
  };
