import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IKakaoMap } from "../../../../src/api/structures/connector/kakao_map/IKakaoMap";

export const test_api_connector_kakao_map_search = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IKakaoMap.SearchByKeywordOutput> =
    await api.functional.connector.kakao_map.search(
      connection,
      typia.random<IKakaoMap.SearchByKeywordInput>(),
    );
  typia.assert(output);
};
