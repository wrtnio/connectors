import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";
import { GithubController } from "../../../../../src/controllers/connector/github/GithubController";

export const scenario_github_resume_to_email =
  (): IFunctionCallBenchmarkScenario => ({
    title: "깃허브 이력서",
    prompt: `
    나의 깃허브 저장소 samchon/typia, samchon/nestia 와 
    samchon/openapi 및 samchon/tgrid 를 리뷰해봐.
           
    그리고 본인의 코딩 스타일이 어떠한지, 그리고 무엇을 개선하면 좋을지 이야기해줘.
           
    이를 각각 저장소에 대하여 조언해주고, 마지막으로 전부 다 묶어서 총평도 해 줘.

    마지막으로 위 저장소들을 토대로, 나의 이력서를 써다오.
    
    모든 것을 정리하고 요약한 내용을 studio-test-2024@wrtn.io 로 보내줘`,
    expected: {
      type: "allOf",
      allOf: [
        {
          type: "array",
          items: [
            {
              type: "standalone",
              function: GithubController.prototype.getReadmeFile,
            },
            {
              type: "standalone",
              function:
                GithubController.prototype.getRepositoryFolderStructures,
            },
          ],
        },
        {
          type: "anyOf",
          anyOf: [
            {
              type: "standalone",
              function: GithubController.prototype.getBulkFileContents,
            },
            {
              type: "standalone",
              function: GithubController.prototype.getBulkFileContents,
            },
          ],
        },
      ],
    },
  });
