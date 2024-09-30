import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";

export const test_api_connector_google_search = async (
  connection: CApi.IConnection,
) => {
  const search_result = await CApi.functional.connector.google_search.search(
    connection,
    {
      andKeywords: ["애완견 동반 가능한 강원도 숙소 찾아줘"],
      orKeywords: [],
      notKeywords: [],
      max_results: 10,
    },
  );
  typia.assert(search_result);

  const wanted_result =
    await CApi.functional.connector.google_search.wanted.searchForWanted(
      connection,
      {
        andKeywords: ["NestJS"],
        orKeywords: [],
        notKeywords: [],
        max_results: 20,
      },
    );
  typia.assert(wanted_result);

  const incruit_result =
    await CApi.functional.connector.google_search.incruit.searchForIncruit(
      connection,
      {
        andKeywords: ["React"],
        orKeywords: [],
        notKeywords: [],
        max_results: 10,
      },
    );
  typia.assert(incruit_result);

  const saramin_result =
    await CApi.functional.connector.google_search.saramin.searchForSaramin(
      connection,
      {
        andKeywords: ["JAVA"],
        orKeywords: [],
        notKeywords: [],
        max_results: 10,
      },
    );
  typia.assert(saramin_result);

  const jumpit_result =
    await CApi.functional.connector.google_search.jumpit.searchForJumpit(
      connection,
      {
        andKeywords: ["파이썬"],
        orKeywords: [],
        notKeywords: [],
        max_results: 10,
      },
    );
  typia.assert(jumpit_result);

  const careerly_result =
    await CApi.functional.connector.google_search.careerly.searchForCareerly(
      connection,
      {
        andKeywords: [""],
        orKeywords: [],
        notKeywords: [],
        max_results: 10,
      },
    );
  typia.assert(careerly_result);
};
