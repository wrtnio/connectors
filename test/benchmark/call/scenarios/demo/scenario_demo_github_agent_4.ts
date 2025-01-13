import { GithubController } from "../../../../../src/controllers/connector/github/GithubController";
import { NotionController } from "../../../../../src/controllers/connector/notion/NotionController";
import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";

export const scenario_demo_github_agent_4 =
  (): IFunctionCallBenchmarkScenario => ({
    title: "Github 에이전트 4",
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
