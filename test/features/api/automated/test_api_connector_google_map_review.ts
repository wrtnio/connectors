import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGoogleMap } from "../../../../src/api/structures/connector/google_map/IGoogleMap";

export const test_api_connector_google_map_review = async (
  connection: api.IConnection,
) => {
  const output: Primitive<Array<IGoogleMap.IReviewResponse>> =
    await api.functional.connector.google_map.review(
      connection,
      typia.random<IGoogleMap.IReviewRequest>(),
    );
  typia.assert(output);
};
