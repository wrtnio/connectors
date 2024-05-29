import CApi from "@wrtn/connector-api/lib/index"
import {INaver} from "@wrtn/connector-api/lib/structures/connector/naver/INaver";
import typia from "typia";

export const test_api_connector_read_cafe_naver = async (
  connection: CApi.IConnection
): Promise<INaver.ICafeNaverOutput> => {
  const input: INaver.INaverKeywordInput = {
    andKeywords: '뤼튼',
    orKeywords: 'AI',
    notKeywords:  'openAI',
    display: 10,
    sort: 'sim',
  }
  const result = await CApi.functional.connector.naver.cafe.cafeList(connection, input);
  typia.assertEquals(result);

  return result;
}