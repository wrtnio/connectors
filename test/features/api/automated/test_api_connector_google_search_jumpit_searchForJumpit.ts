import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGoogleSearch } from "../../../../src/api/structures/connector/google_search/IGoogleSearch";

export const test_api_connector_google_search_jumpit_searchForJumpit = async (
  connection: api.IConnection,
) => {
  const output: Primitive<Array<IGoogleSearch.IResponse>> =
    await api.functional.connector.google_search.jumpit.searchForJumpit(
      connection,
      typia.random<IGoogleSearch.IRequest>(),
    );
  typia.assert(output);
};
