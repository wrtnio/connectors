// import typia from "typia";

// import CApi from "@wrtn/connector-api/lib/index";
// import { IYoutubeSearch } from "@wrtn/connector-api/lib/structures/connector/youtube_search/IYoutubeSearch";

// export const test_api_connector_youtube_official = async (
//   connection: CApi.IConnection,
// ): Promise<IYoutubeSearch.IYoutubeSearchVideoResponse[]> => {
//   const result =
//     await CApi.functional.connector.youtube_search.official.searchVideo(
//       connection,
//       {
//         and_keywords: ["귀여운", "고양이"],
//         or_keywords: ["야옹", "냐옹"],
//         not_keywords: ["강아지"],
//       },
//     );
//   typia.assert(result);
//   return result;
// };
