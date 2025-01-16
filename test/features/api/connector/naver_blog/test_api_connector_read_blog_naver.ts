import CApi from "@wrtn/connector-api/lib/index";
import { INaverBlog } from "@wrtn/connector-api/lib/structures/connector/naver_blog/INaverBlog";
import typia from "typia";

export const test_api_connector_read_blog_naver = async (
  connection: CApi.IConnection,
): Promise<INaverBlog.IBlogNaverOutput> => {
  const input: INaverBlog.INaverKeywordInput = {
    andKeywords: "뤼튼",
    orKeywords: "AI",
    notKeywords: "openAI",
    display: 10,
    sort: "sim",
  };
  const result = await CApi.functional.connector.naver_blog.blogList(
    connection,
    input,
  );
  typia.assert(result);

  return result;
};
