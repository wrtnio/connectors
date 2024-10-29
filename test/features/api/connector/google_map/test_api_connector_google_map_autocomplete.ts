import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";

export const test_api_connector_google_map_autocomplete = async (
  connection: CApi.IConnection,
) => {
  const res = await CApi.functional.connector.google_map.autocomplete(
    connection,
    {
      input: "강남역 맛집",
    },
  );

  typia.assertEquals(res);

  const res2 = await CApi.functional.connector.google_map.autocomplete(
    connection,
    {
      input: "맛집",
      circle: {
        latitude: 37.4979,
        longitude: 127.0276,
        radius: 500,
      },
    },
  );

  typia.assertEquals(res2);
};
