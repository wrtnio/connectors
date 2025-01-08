import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";
import { GithubController } from "../../../../../src/controllers/connector/github/GithubController";

export const scenario_github_readme = (): IFunctionCallBenchmarkScenario => ({
  title: "깃허브 리드미",
  prompt: `깃허브 저장소 samchon/prisma-markdown 의 README 를 요약해줘`,
  expected: {
    type: "standalone",
    function: GithubController.prototype.getReadmeFile,
  },
});
