import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { INaver } from "../../../../src/api/structures/connector/naver/INaver";

export const test_api_connector_naver_cafe_cafeList = async (
  connection: api.IConnection,
) => {
  const output: Primitive<INaver.ICafeNaverOutput> =
    await api.functional.connector.naver.cafe.cafeList(
      connection,
      typia.random<INaver.INaverKeywordInput>(),
    );
  typia.assert(output);
};
