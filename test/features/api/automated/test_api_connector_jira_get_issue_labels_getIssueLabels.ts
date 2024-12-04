import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IJira } from "../../../../src/api/structures/connector/jira/IJira";

export const test_api_connector_jira_get_issue_labels_getIssueLabels = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IJira.IGetIssueLabelOutput> =
    await api.functional.connector.jira.get_issue_labels.getIssueLabels(
      connection,
      typia.random<IJira.IGetIssueLabelInput>(),
    );
  typia.assert(output);
};
