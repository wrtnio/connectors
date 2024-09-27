import CApi from "@wrtn/connector-api/lib/index";
import { INaver } from "@wrtn/connector-api/lib/structures/connector/naver/INaver";
import typia from "typia";

export const test_api_connector_read_news_naver = async (
  connection: CApi.IConnection,
): Promise<INaver.INewsNaverOutput> => {
  const input: INaver.INaverKeywordInput = {
    andKeywords: "뤼튼",
  };
  const result = await CApi.functional.connector.naver.news.newsList(
    connection,
    input,
  );
  typia.assert(result);
  return result;
};
