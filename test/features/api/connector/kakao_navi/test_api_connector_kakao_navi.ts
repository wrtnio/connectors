import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";

export const test_api_kakao_navi_get_future_directions = async (
  connection: CApi.IConnection,
) => {
  /**
   * 액세스 토큰 갱신.
   */
  const res =
    await CApi.functional.connector.kakao_navi.get_future_directions.getFutureDirections(
      connection,
      {
        departure_time: `202406202000`,
        origin: "127.111202,37.394912",
        destination: "127.111202,35.394912",
      },
    );

  typia.assertEquals(res);
};
