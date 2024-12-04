import typia from "typia";

import api from "../../../../src/api";
import type { IJira } from "../../../../src/api/structures/connector/jira/IJira";

export const test_api_connector_jira_issues_status_updateIssueStatus = async (
  connection: api.IConnection,
) => {
  const output =
    await api.functional.connector.jira.issues.status.updateIssueStatus(
      connection,
      typia.random<IJira.IUpdateStatusInput>(),
    );
  typia.assert(output);
};
