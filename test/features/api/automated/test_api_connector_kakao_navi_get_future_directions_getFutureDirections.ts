import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IKakaoNavi } from "../../../../src/api/structures/connector/kakao_navi/IKakaoNavi";

export const test_api_connector_kakao_navi_get_future_directions_getFutureDirections =
  async (connection: api.IConnection) => {
    const output: Primitive<IKakaoNavi.SuccessCase> =
      await api.functional.connector.kakao_navi.get_future_directions.getFutureDirections(
        connection,
        typia.random<IKakaoNavi.IGetFutureDirectionsInput>(),
      );
    typia.assert(output);
  };
