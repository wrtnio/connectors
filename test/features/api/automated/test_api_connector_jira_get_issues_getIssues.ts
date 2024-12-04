import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IJira } from "../../../../src/api/structures/connector/jira/IJira";

export const test_api_connector_jira_get_issues_getIssues = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IJira.IGetIssueOutput> =
    await api.functional.connector.jira.get_issues.getIssues(
      connection,
      typia.random<IJira.IGetIssueInputByBasicAuth>(),
    );
  typia.assert(output);
};
