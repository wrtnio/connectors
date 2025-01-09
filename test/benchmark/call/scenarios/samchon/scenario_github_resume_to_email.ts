import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";
import { GithubController } from "../../../../../src/controllers/connector/github/GithubController";
import { GmailController } from "../../../../../src/controllers/connector/gmail/GmailController";

export const scenario_github_resume_to_email =
  (): IFunctionCallBenchmarkScenario => ({
    title: "깃허브 이력서",
    prompt: `
나의 다음 깃허브 저장소들의 README 및 소스코드 일체를 둘러봐. 

  - samchon/typia
  - samchon/nestia 
  - samchon/openapi
  - samchon/tgrid
        
그리고 나의 코딩 스타일이 어떠한지, 또한 무엇을 개선하면 좋을지 이야기해줘.
        
이를 각각 저장소에 대하여 조언해주고, 마지막으로 전부 다 묶어서 총평도 해 줘.

마지막으로 위 저장소들을 토대로, 나의 이력서를 써다오.

모든 것을 정리하고 요약한 내용을 내 G-Mail 을 통해 studio-test-2024@wrtn.io 로 보내줘`,
    expected: {
      type: "anyOf",
      anyOf: [
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
        // {
        //   type: "anyOf",
        //   anyOf: [
        //     {
        //       type: "standalone",
        //       function: GithubController.prototype.getBulkFileContents,
        //     },
        //     {
        //       type: "standalone",
        //       function: GithubController.prototype.getFileContents,
        //     },
        //   ],
        // },
        {
          type: "standalone",
          function: GmailController.prototype.send,
        },
      ],
    },
  });
