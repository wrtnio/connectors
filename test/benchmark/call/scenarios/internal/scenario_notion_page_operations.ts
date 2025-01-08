// import ConnectorApi from "@wrtnio/connector-api";

// import { ILlmBenchmarkOperation } from "../../structures/ILlmBenchmarkOperation";

// export const scenario_notion_page_operations = (): ILlmBenchmarkOperation[] => [
//   {
//     type: "union",
//     elements: [
//       {
//         type: "standalone",
//         function:
//           ConnectorApi.functional.connector.notion.markdown
//             .createPageByMarkdown,
//         required: true,
//       },
//       {
//         type: "parallel",
//         elements: [
//           {
//             type: "standalone",
//             function: ConnectorApi.functional.connector.notion.page.createPage,
//             required: true,
//           },
//           {
//             type: "union",
//             elements: [
//               ConnectorApi.functional.connector.notion.page.bookmark
//                 .createBookmark,
//               ConnectorApi.functional.connector.notion.page.breadcrumb
//                 .createBreadcrumb,
//               ConnectorApi.functional.connector.notion.page.code.createCode,
//               ConnectorApi.functional.connector.notion.page.divider
//                 .createDivider,
//               ConnectorApi.functional.connector.notion.page.embed.createEmbed,
//               ConnectorApi.functional.connector.notion.page.file.createFile,
//               ConnectorApi.functional.connector.notion.page.image.createImage,
//               ConnectorApi.functional.connector.notion.page.link_to_page
//                 .createLinkToPage,
//               ConnectorApi.functional.connector.notion.page.markdown
//                 .appendBlocksByMarkdown,
//               ConnectorApi.functional.connector.notion.page.pdf.createPdf,
//               ConnectorApi.functional.connector.notion.page.table_of_contents
//                 .createTableOfContents,
//               ConnectorApi.functional.connector.notion.page.toggle.createToggle,
//               ConnectorApi.functional.connector.notion.page.video.createVideo,
//             ].map((func) => ({
//               type: "standalone",
//               function: func,
//               required: true,
//             })),
//             required: true,
//           },
//         ],
//         required: true,
//       },
//     ],
//     required: true,
//   },
// ];
