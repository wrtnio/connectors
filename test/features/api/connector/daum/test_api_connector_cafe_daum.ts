import CApi from "@wrtn/connector-api/lib/index";
import { IDaum } from "@wrtn/connector-api/lib/structures/connector/daum/IDaum";
import typia from "typia";

export const test_api_connector_cafe_daum = async (connection: CApi.IConnection): Promise<IDaum.ICafeDaumOutput> => {
  const input: IDaum.ISearchDaumInput = {
    andKeywords: "뤼튼",
    orKeywords: "AI",
    notKeywords: "openAI",
    page: 1,
    size: 10,
    sort: "accuracy",
  };
  const result = await CApi.functional.connector.daum.cafe.searchCafe(connection, input);
  typia.assertEquals(result);

  return result.data;
};
