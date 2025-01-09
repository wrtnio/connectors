// import ConnectorApi from "@wrtnio/connector-api";

// import { IFuntionCallBenchmarkScenario } from "../../structures/IFuntionCallBenchmarkScenario";
// import { scenario_notion_page_operations } from "../internal/scenario_notion_page_operations";

// export const scenario_nextjs_study_to_notion = (): IFuntionCallBenchmarkScenario => ({
//   title: "Next.js 스터디 노션 정리",
//   prompt: `
//     Nextjs 를 처음 공부하는 사람에게 뭘 공부하면 좋을지
//     Notion 문서에 정리해줘`,
//   operations: [
//     {
//       type: "standalone",
//       function: ConnectorApi.functional.connector.google_search.search,
//       required: true,
//     },
//     ...scenario_notion_page_operations(),
//   ],
// });
