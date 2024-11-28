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
      and_keywords: ["고양이"],
      or_keywords: ["개"],
      not_keywords: ["토끼"],
      lang: "ko",
      maxResults: 10,
      sort_order: "recency",
      isExcludeQuote: true,
      isExcludeReply: true,
      isExcludeRetweet: true,
    },
  );
  typia.assert(res);
  return res;
};
