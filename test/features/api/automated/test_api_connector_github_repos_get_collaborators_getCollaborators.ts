import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_repos_get_collaborators_getCollaborators =
  async (connection: api.IConnection) => {
    const output: Primitive<IGithub.IGetCollaboratorOutput> =
      await api.functional.connector.github.repos.get_collaborators.getCollaborators(
        connection,
        typia.random<IGithub.IGetCollaboratorInput>(),
      );
    typia.assert(output);
  };
