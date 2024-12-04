import typia from "typia";

import api from "../../../../src/api";
import type { IJira } from "../../../../src/api/structures/connector/jira/IJira";

export const test_api_connector_jira_issues_asignee_unassign = async (
  connection: api.IConnection,
) => {
  const output = await api.functional.connector.jira.issues.asignee.unassign(
    connection,
    typia.random<IJira.IUnAssignInput>(),
  );
  typia.assert(output);
};
