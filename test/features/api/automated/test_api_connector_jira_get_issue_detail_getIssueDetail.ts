import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IJira } from "../../../../src/api/structures/connector/jira/IJira";

export const test_api_connector_jira_get_issue_detail_getIssueDetail = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IJira.IGetIssueDetailOutput> =
    await api.functional.connector.jira.get_issue_detail.getIssueDetail(
      connection,
      typia.random<IJira.IGetIssueDetailInput>(),
    );
  typia.assert(output);
};
