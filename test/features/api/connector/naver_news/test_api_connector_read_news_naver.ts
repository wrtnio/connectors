import CApi from "@wrtn/connector-api/lib/index";
import { INaverNews } from "@wrtn/connector-api/lib/structures/connector/naver_news/INaverNews";
import typia from "typia";

export const test_api_connector_read_news_naver = async (
  connection: CApi.IConnection,
): Promise<INaverNews.INewsNaverOutput> => {
  const input: INaverNews.INaverKeywordInput = {
    andKeywords: "뤼튼",
  };
  const result = await CApi.functional.connector.naver_news.newsList(
    connection,
    input,
  );
  typia.assert(result);
  return result;
};
