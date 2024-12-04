import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_repos_get_readme_getReadmeFile = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IGithub.IGetReadmeFileContentOutput> =
    await api.functional.connector.github.repos.get_readme.getReadmeFile(
      connection,
      typia.random<IGithub.IGetReadmeFileContentInput>(),
    );
  typia.assert(output);
};
