import CApi from "@wrtn/connector-api/lib/index";
import { IDaum } from "@wrtn/connector-api/lib/structures/connector/daum/IDaum";
import typia from "typia";

export const test_api_connector_blog_daum = async (
  connection: CApi.IConnection,
) => {
  const input: IDaum.ISearchDaumInput = {
    andKeywords: "뤼튼",
    orKeywords: "AI",
    notKeywords: "openAI",
    page: 1,
    size: 10,
    sort: "accuracy",
  };
  const result = await CApi.functional.connector.daum.blog.searchBlog(
    connection,
    input,
  );
  typia.assert(result);

  return result;
};
