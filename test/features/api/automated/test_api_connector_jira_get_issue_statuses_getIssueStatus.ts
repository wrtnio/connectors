import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IJira } from "../../../../src/api/structures/connector/jira/IJira";

export const test_api_connector_jira_get_issue_statuses_getIssueStatus = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IJira.IGetIssueStatusOutput> =
    await api.functional.connector.jira.get_issue_statuses.getIssueStatus(
      connection,
      typia.random<IJira.IGetIssueStatusInput>(),
    );
  typia.assert(output);
};
