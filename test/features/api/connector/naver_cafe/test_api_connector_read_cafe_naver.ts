import CApi from "@wrtn/connector-api/lib/index";
import { INaverCafe } from "@wrtn/connector-api/lib/structures/connector/naver_cafe/INaverCafe";
import typia from "typia";

export const test_api_connector_read_cafe_naver = async (
  connection: CApi.IConnection,
): Promise<INaverCafe.ICafeNaverOutput> => {
  const input: INaverCafe.INaverKeywordInput = {
    andKeywords: "뤼튼",
    orKeywords: "AI",
    notKeywords: "openAI",
    display: 10,
    sort: "sim",
  };
  const result = await CApi.functional.connector.naver_cafe.cafeList(
    connection,
    input,
  );
  typia.assert(result);

  return result;
};
