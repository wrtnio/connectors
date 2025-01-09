import { GithubController } from "../../../../../src/controllers/connector/github/GithubController";
import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";

export const scenario_github_readme = (): IFunctionCallBenchmarkScenario => ({
  title: "깃허브 코딩 스타일",
  prompt: `github에서 kakasoo 라는 사람의 최근 코드 스타일 좀 봐줘`,
  expected: {
    type: "array",
    items: [
      {
        type: "anyOf",
        anyOf: [
          GithubController.prototype.getUserProfile,
          GithubController.prototype.getUserRepositories,
        ].map((func) => ({
          type: "standalone",
          function: func,
        })),
      },
    ],
  },
});
