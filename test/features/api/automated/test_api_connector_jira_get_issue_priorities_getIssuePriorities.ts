import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IJira } from "../../../../src/api/structures/connector/jira/IJira";

export const test_api_connector_jira_get_issue_priorities_getIssuePriorities =
  async (connection: api.IConnection) => {
    const output: Primitive<IJira.IGetIssuePriorityOutput> =
      await api.functional.connector.jira.get_issue_priorities.getIssuePriorities(
        connection,
        typia.random<IJira.IGetIssuePriorityInput>(),
      );
    typia.assert(output);
  };
