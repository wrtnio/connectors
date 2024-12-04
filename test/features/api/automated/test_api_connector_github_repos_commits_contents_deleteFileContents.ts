import typia from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_repos_commits_contents_deleteFileContents =
  async (connection: api.IConnection) => {
    const output =
      await api.functional.connector.github.repos.commits.contents.deleteFileContents(
        connection,
        typia.random<IGithub.IDeleteFileContentInput>(),
      );
    typia.assert(output);
  };
