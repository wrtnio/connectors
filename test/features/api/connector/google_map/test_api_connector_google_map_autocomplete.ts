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

  console.log(JSON.stringify(res, null, 2));
  typia.assertEquals(res);

  // const res2 = await CApi.functional.connector.google_map.autocomplete(
  //   connection,
  //   {
  //     input: "맛집",
  //   },
  // );

  // console.log(JSON.stringify(res2, null, 2));
  // typia.assertEquals(res2);
};
