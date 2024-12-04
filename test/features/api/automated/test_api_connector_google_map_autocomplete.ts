import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGoogleMap } from "../../../../src/api/structures/connector/google_map/IGoogleMap";

export const test_api_connector_google_map_autocomplete = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IGoogleMap.IAutocompleteOutput> =
    await api.functional.connector.google_map.autocomplete(
      connection,
      typia.random<IGoogleMap.IAutocompleteInput>(),
    );
  typia.assert(output);
};
