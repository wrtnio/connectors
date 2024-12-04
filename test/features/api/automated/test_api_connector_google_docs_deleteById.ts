import typia from "typia";

import api from "../../../../src/api";
import type { IGoogleDocs } from "../../../../src/api/structures/connector/google_docs/IGoogleDocs";

export const test_api_connector_google_docs_deleteById = async (
  connection: api.IConnection,
) => {
  const output = await api.functional.connector.google_docs.deleteById(
    connection,
    typia.random<string>(),
    typia.random<IGoogleDocs.ISecret>(),
  );
  typia.assert(output);
};
