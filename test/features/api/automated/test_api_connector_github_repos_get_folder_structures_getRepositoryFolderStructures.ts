import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_repos_get_folder_structures_getRepositoryFolderStructures =
  async (connection: api.IConnection) => {
    const output: Primitive<IGithub.IGetRepositoryFolderStructureOutput> =
      await api.functional.connector.github.repos.get_folder_structures.getRepositoryFolderStructures(
        connection,
        typia.random<IGithub.IGetRepositoryFolderStructureInput>(),
      );
    typia.assert(output);
  };
