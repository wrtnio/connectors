import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";

export const test_api_kakao_navi_get_future_directions = async (
  connection: CApi.IConnection,
) => {
  const first =
    await CApi.functional.connector.kakao_navi.get_future_directions.getFutureDirections(
      connection,
      {
        departure_time: `202406202000`,
        origin: "127.11015314141542,37.39472714688412",
        destination: "127.10824367964793,37.401937080111644",
      },
    );

  typia.assert(first);

  const second =
    await CApi.functional.connector.kakao_navi.get_future_directions.getFutureDirections(
      connection,
      {
        departure_time: `202406202000`,
        origin: "127.11015314141542,37.39472714688412",
        destination: "127.11015314141542,37.39472714688412",
      },
    );

  typia.assert(second);
};
