import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGoogleDocs } from "../../../../src/api/structures/connector/google_docs/IGoogleDocs";

export const test_api_connector_google_docs_get_list_list = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IGoogleDocs.IListGoogleDocsOutput> =
    await api.functional.connector.google_docs.get_list.list(
      connection,
      typia.random<IGoogleDocs.ISecret>(),
    );
  typia.assert(output);
};
