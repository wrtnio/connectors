import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";

export async function test_api_connector_kakao_map_search_by_keyword(
  connection: CApi.IConnection,
): Promise<void> {
  const res = await CApi.functional.connector.kakao_map.search(connection, {
    query: "도봉구 맛집",
  });
  typia.assert(res);
}
