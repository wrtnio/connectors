import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_x_general_search = async (
  connection: CApi.IConnection,
) => {
  await ConnectorGlobal.reload();
  const res = await CApi.functional.connector.x.general_search.generalSearch(
    connection,
    {
      secretKey: ConnectorGlobal.env.X_TEST_SECRET,
      query: "유행하는 책",
      lang: "ko",
      maxResults: 10,
      sort_order: "relevancy",
      // isExcludeQuote: true,
      // isExcludeReply: true,
      // isExcludeRetweet: true,
    },
  );
  console.log("RES", res);
  typia.assert(res);
  return res;
};
