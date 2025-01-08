// import ConnectorApi from "@wrtnio/connector-api";

// import { IFuntionCallBenchmarkScenario } from "../../structures/IFuntionCallBenchmarkScenario";
// import { scenario_notion_page_operations } from "../internal/scenario_notion_page_operations";

// export const scenario_mermaid_erd_from_github_to_notion =
//   (): IFuntionCallBenchmarkScenario => ({
//     title: "Mermaid ERD from Github",
//     prompt: `
//     너는 mermaid 와 프로그래밍 디자인 패턴에 깊은 이해도를
//     가지고 있는 시니어 개발자야. 깃허브 레포지토리
//     (https://github.com/team-xquare/v1-point-service)의 코드를 분석해서
//     해당 레포지토리에서 사용된 라이브러리와 디자인 패턴을 설명 하는 노션 문서와
//     mermaid로 코드 블록을 만들어 문서를 완성해줘.
//   `,
//     operations: [
//       {
//         type: "standalone",
//         function:
//           ConnectorApi.functional.connector.github.repos.get_folder_structures
//             .getRepositoryFolderStructures,
//         required: true,
//       },
//       {
//         type: "union",
//         elements: [
//           ConnectorApi.functional.connector.github.repos.get_contents
//             .getFileContents,
//           ConnectorApi.functional.connector.github.repos.get_contents.bulk
//             .getBulkFileContents,
//         ].map((func) => ({
//           type: "standalone",
//           function: func,
//           required: true,
//         })),
//         required: true,
//       },
//       ...scenario_notion_page_operations(),
//     ],
//   });
