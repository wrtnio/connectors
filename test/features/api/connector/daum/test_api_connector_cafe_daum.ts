import CApi from "@wrtn/connector-api/lib/index";
import { IDaumCafe } from "@wrtn/connector-api/lib/structures/connector/daum_cafe/IDaumCafe";
import typia from "typia";

export const test_api_connector_cafe_daum = async (
  connection: CApi.IConnection,
): Promise<IDaumCafe.ICafeOutput> => {
  const input: IDaumCafe.ISearchInput = {
    andKeywords: "뤼튼",
    orKeywords: "AI",
    notKeywords: "openAI",
    page: 1,
    size: 10,
    sort: "accuracy",
  };
  const result = await CApi.functional.connector.daum_cafe.searchCafe(
    connection,
    input,
  );
  typia.assert(result);

  return result;
};
