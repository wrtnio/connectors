import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGoogleScholar } from "../../../../src/api/structures/connector/google_scholar/IGoogleScholar";

export const test_api_connector_google_scholar_search = async (
  connection: api.IConnection,
) => {
  const output: Primitive<Array<IGoogleScholar.ISearchOutput>> =
    await api.functional.connector.google_scholar.search(
      connection,
      typia.random<IGoogleScholar.ISearchInput>(),
    );
  typia.assert(output);
};
