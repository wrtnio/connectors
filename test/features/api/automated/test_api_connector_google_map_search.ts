import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGoogleMap } from "../../../../src/api/structures/connector/google_map/IGoogleMap";

export const test_api_connector_google_map_search = async (
  connection: api.IConnection,
) => {
  const output: Primitive<Array<IGoogleMap.IResponse>> =
    await api.functional.connector.google_map.search(
      connection,
      typia.random<IGoogleMap.IRequest>(),
    );
  typia.assert(output);
};
