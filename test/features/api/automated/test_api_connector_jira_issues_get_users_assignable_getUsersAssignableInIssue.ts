import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IJira } from "../../../../src/api/structures/connector/jira/IJira";

export const test_api_connector_jira_issues_get_users_assignable_getUsersAssignableInIssue =
  async (connection: api.IConnection) => {
    const output: Primitive<IJira.IGetIssueAssignableOutput> =
      await api.functional.connector.jira.issues.get_users_assignable.getUsersAssignableInIssue(
        connection,
        typia.random<IJira.IGetIssueAssignableInput>(),
      );
    typia.assert(output);
  };
