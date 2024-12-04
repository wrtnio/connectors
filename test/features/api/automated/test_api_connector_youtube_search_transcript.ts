import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IYoutubeSearch } from "../../../../src/api/structures/connector/youtube_search/IYoutubeSearch";

export const test_api_connector_youtube_search_transcript = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IYoutubeSearch.ITranscriptYoutubeResponse> =
    await api.functional.connector.youtube_search.transcript(
      connection,
      typia.random<IYoutubeSearch.ITranscriptYoutubeRequest>(),
    );
  typia.assert(output);
};
