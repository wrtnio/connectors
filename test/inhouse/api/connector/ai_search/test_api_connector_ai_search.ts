import CApi from "@wrtn/connector-api/lib/index";
import { IAISearch } from "@wrtn/connector-api/lib/structures/connector/ai_search/IAISearch";
import typia from "typia";

export const test_api_connector_ai_search = async (
  connection: CApi.IConnection,
) => {
  const requestBody: IAISearch.IRequest = {
    search_query: "한국 축구 월드컵 최종 예선 어떻게 되고 있어?",
  };

  const output = await CApi.functional.connector.ai_search.search(
    connection,
    requestBody,
  );
  typia.assertEquals<any>(output);
};
