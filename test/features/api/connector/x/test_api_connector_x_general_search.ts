import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";

export const test_api_connector_x_general_search = async (
  connection: CApi.IConnection,
) => {
  const res = await CApi.functional.connector.x.general_search.generalSearch(
    connection,
    {
      query: "유행하는 책",
      lang: "ko",
      maxResults: 10,
      sort_order: "relevancy",
      // isExcludeQuote: true,
      // isExcludeReply: true,
      // isExcludeRetweet: true,
    },
  );
  typia.assert(res);
  return res;
};
