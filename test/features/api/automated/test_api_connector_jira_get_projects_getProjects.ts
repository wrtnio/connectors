import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IJira } from "../../../../src/api/structures/connector/jira/IJira";

export const test_api_connector_jira_get_projects_getProjects = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IJira.IGetProjectOutput> =
    await api.functional.connector.jira.get_projects.getProjects(
      connection,
      typia.random<IJira.IGetProjectInputByBasicAuth>(),
    );
  typia.assert(output);
};
