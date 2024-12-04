import typia from "typia";

import api from "../../../../src/api";
import type { IGoogleDocs } from "../../../../src/api/structures/connector/google_docs/IGoogleDocs";

export const test_api_connector_google_docs_permission = async (
  connection: api.IConnection,
) => {
  const output = await api.functional.connector.google_docs.permission(
    connection,
    typia.random<IGoogleDocs.IPermissionGoogleDocsInput>(),
  );
  typia.assert(output);
};
