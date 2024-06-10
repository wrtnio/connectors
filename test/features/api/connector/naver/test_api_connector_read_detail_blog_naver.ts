import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { INaver } from "@wrtn/connector-api/lib/structures/connector/naver/INaver";

export const test_api_connector_read_detail_blog_naver = async (
  connection: CApi.IConnection,
): Promise<INaver.INaverBlogOutput> => {
  const input: INaver.INaverBlogInput = {
    blogUrl: "https://blog.naver.com/jumpsteady/222789249864",
  };
  const result = await CApi.functional.connector.naver.blog.detail.blogDetail(
    connection,
    input,
  );
  typia.assertEquals(result);

  return result;
};
