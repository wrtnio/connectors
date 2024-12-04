import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IJira } from "../../../../src/api/structures/connector/jira/IJira";

export const test_api_connector_jira_issues_get_transitions_getTransitions =
  async (connection: api.IConnection) => {
    const output: Primitive<IJira.IGetTransitionOutput> =
      await api.functional.connector.jira.issues.get_transitions.getTransitions(
        connection,
        typia.random<IJira.IGetTransitionInput>(),
      );
    typia.assert(output);
  };
