import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IYoutubeSearch } from "@wrtn/connector-api/lib/structures/connector/youtube_search/IYoutubeSearch";

export const test_api_connector_youtube_search_transcript = async (
  connection: CApi.IConnection,
): Promise<IYoutubeSearch.ITranscriptYoutubeResponse> => {
  const result = await CApi.functional.connector.youtube_search.transcript(
    connection,
    {
      url: "https://www.youtube.com/watch?v=fCNSUsjvczs",
    },
  );
  typia.assert(result);
  return result;
};
