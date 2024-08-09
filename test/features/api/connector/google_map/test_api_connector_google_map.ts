import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IGoogleMap } from "@wrtn/connector-api/lib/structures/connector/google_map/IGoogleMap";

export const test_api_connector_google_map = async (
  connection: CApi.IConnection,
) => {
  const results = await CApi.functional.connector.google_map.search(
    connection,
    {
      keyword: "도쿄 맛집",
    },
  );
  typia.assert<IGoogleMap.IResponse[]>(results);

  const reviews = await CApi.functional.connector.google_map.review(
    connection,
    {
      place_id: results[0].place_id,
    },
  );
  typia.assert<IGoogleMap.IReviewResponse[]>(reviews);
};
