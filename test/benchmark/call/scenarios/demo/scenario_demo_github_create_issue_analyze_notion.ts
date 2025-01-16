import { GithubController } from "../../../../../src/controllers/connector/github/GithubController";
import { NotionController } from "../../../../../src/controllers/connector/notion/NotionController";
import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";

export const scenario_demo_github_create_issue_analyze_notion =
  (): IFunctionCallBenchmarkScenario => ({
    title: "노션 문서 분석 후 Github 이슈 등록 에이전트",
    prompt: `노션에서 PRD 문서 읽고 내가 해야할 것들을 깃허브 이슈로 등록해줘.`,
    expected: {
      type: "array",
      items: [
        {
          type: "standalone",
          function: NotionController.prototype.readPageContents,
        },
        {
          type: "standalone",
          function: GithubController.prototype.createIssue,
        },
      ],
    },
  });
