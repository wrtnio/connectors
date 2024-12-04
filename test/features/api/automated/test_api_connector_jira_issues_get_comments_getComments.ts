import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IJira } from "../../../../src/api/structures/connector/jira/IJira";

export const test_api_connector_jira_issues_get_comments_getComments = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IJira.IGetCommentOutput> =
    await api.functional.connector.jira.issues.get_comments.getComments(
      connection,
      typia.random<IJira.IGetCommentInput>(),
    );
  typia.assert(output);
};
