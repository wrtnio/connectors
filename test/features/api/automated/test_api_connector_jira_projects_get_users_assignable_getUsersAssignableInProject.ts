import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IJira } from "../../../../src/api/structures/connector/jira/IJira";

export const test_api_connector_jira_projects_get_users_assignable_getUsersAssignableInProject =
  async (connection: api.IConnection) => {
    const output: Primitive<IJira.IGetProjectAssignableOutput> =
      await api.functional.connector.jira.projects.get_users_assignable.getUsersAssignableInProject(
        connection,
        typia.random<IJira.IGetProjectAssignableInput>(),
      );
    typia.assert(output);
  };
