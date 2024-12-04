import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGoogleDocs } from "../../../../src/api/structures/connector/google_docs/IGoogleDocs";

export const test_api_connector_google_docs_createDocs = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IGoogleDocs.ICreateGoogleDocsOutput> =
    await api.functional.connector.google_docs.createDocs(
      connection,
      typia.random<IGoogleDocs.ICreateGoogleDocsInput>(),
    );
  typia.assert(output);
};
