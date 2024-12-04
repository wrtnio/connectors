import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IJira } from "../../../../src/api/structures/connector/jira/IJira";

export const test_api_connector_jira_get_status_categories_getStatusCategories =
  async (connection: api.IConnection) => {
    const output: Primitive<IJira.IGetStatusCategoryOutput> =
      await api.functional.connector.jira.get_status_categories.getStatusCategories(
        connection,
        typia.random<IJira.IGetStatusCategoryInput>(),
      );
    typia.assert(output);
  };
