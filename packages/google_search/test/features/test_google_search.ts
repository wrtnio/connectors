import { GoogleSearchService } from "@wrtnlabs/connector-google-search";
import typia from "typia";
import { TestGlobal } from "../TestGlobal";

export const test_google_search = async () => {
  const googleSearchService = new GoogleSearchService({
    apiKey: TestGlobal.env.SERP_API_KEY,
  });

  const search_result = await googleSearchService.searchResult({
    andKeywords: ["애완견 동반 가능한 강원도 숙소 찾아줘"],
    orKeywords: [],
    notKeywords: [],
    max_results: 10,
  });
  typia.assert(search_result);

  const wanted_result = await googleSearchService.searchResult(
    {
      andKeywords: ["NestJS"],
      orKeywords: [],
      notKeywords: [],
      max_results: 20,
    },
    "https://www.wanted.co.kr",
  );
  typia.assert(wanted_result);

  const incruit_result = await googleSearchService.searchResult(
    {
      andKeywords: ["React"],
      orKeywords: [],
      notKeywords: [],
      max_results: 10,
    },
    "https://www.incruit.com",
  );
  typia.assert(incruit_result);

  const saramin_result = await googleSearchService.searchResult(
    {
      andKeywords: ["JAVA"],
      orKeywords: [],
      notKeywords: [],
      max_results: 10,
    },
    "https://www.saramin.co.kr/zf_user",
  );
  typia.assert(saramin_result);

  const jumpit_result = await googleSearchService.searchResult(
    {
      andKeywords: ["파이썬"],
      orKeywords: [],
      notKeywords: [],
      max_results: 10,
    },
    "https://www.jumpit.co.kr",
  );
  typia.assert(jumpit_result);

  const careerly_result = await googleSearchService.searchResult(
    {
      andKeywords: [""],
      orKeywords: [],
      notKeywords: [],
      max_results: 10,
    },
    "https://careerly.co.kr",
  );
  typia.assert(careerly_result);
};
