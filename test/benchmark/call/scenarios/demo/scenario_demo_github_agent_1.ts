import { GithubController } from "../../../../../src/controllers/connector/github/GithubController";
import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";

export const scenario_demo_github_agent_1 =
  (): IFunctionCallBenchmarkScenario => ({
    title: "Github 에이전트",
    prompt: `
오늘 올린 프로젝트 PR을 보고 코드 리뷰해서 댓글 달아줘.`,
    expected: {
      type: "array",
      items: [
        {
          type: "standalone",
          function: GithubController.prototype.getRepositoryPullRequest,
        },
        {
          type: "standalone",
          function: GithubController.prototype.reviewPullRequest,
        },
      ],
    },
  });
