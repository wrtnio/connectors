// import typia from "typia";

// import CApi from "@wrtn/connector-api/lib/index";
// import { IMarketingCopyGeneratorResponse } from "@wrtn/connector-api/lib/structures/connector/marketing_copy_generator/IMarketingCopyGenerator";

// /**
//  * Do not run in `npm run test` since actual calls to OpenAI are made and they are expensive and slow
//  */
// export async function test_api_marketing_copy_generator(
//   connection: CApi.IConnection,
// ): Promise<IMarketingCopyGeneratorResponse> {
//   const generated =
//     await CApi.functional.connector.marketing_copy_generator.generate(
//       connection,
//       {
//         number_of_copies: 2,
//         reference_contents: [
//           {
//             title: "How to write a blog post",
//             type: "video",
//             source: "facebook",
//             url: "https://www.wikihow.com/Write-a-Blog",
//             contents: "abcd",
//           },
//         ],
//         marketing_purpose: {
//           purpose: "sign_up",
//           product_name: "Wrtn",
//           unique_selling_point: [],
//           user_benefit: [],
//         },
//         distribution_channels: [
//           {
//             channel: "instagram_feed",
//             components: ["title", "cta", "subtitle"],
//           },
//           {
//             channel: "youtube",
//             components: ["title", "subtitle"],
//           },
//         ],
//       },
//     );
//   typia.assert<IMarketingCopyGeneratorResponse>(generated);
//   return generated;
// }
