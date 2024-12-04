import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_repositories_get_issues_getRepositoryIssues =
  async (connection: api.IConnection) => {
    const output: Primitive<IGithub.IFetchRepositoryOutput> =
      await api.functional.connector.github.repositories.get_issues.getRepositoryIssues(
        connection,
        typia.random<IGithub.IFetchRepositoryInput>(),
      );
    typia.assert(output);
  };
