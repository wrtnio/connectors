import ConnectorApi from "@wrtnio/connector-api";

import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";

export const scenario_github_readme = (): IFunctionCallBenchmarkScenario => ({
  title: "깃허브 코딩 스타일",
  prompt: `github에서 kakasoo 라는 사람의 최근 코드 스타일 좀 봐줘`,
  operations: [
    {
      type: "union",
      elements: [
        ConnectorApi.functional.connector.github.get_user_profile
          .getUserProfile,
        ConnectorApi.functional.connector.github.users.get_repositories
          .getUserRepositories,
      ].map((func) => ({
        type: "standalone",
        function: func,
        required: true,
      })),
      required: true,
    },
    // {
    //   type: "standalone",
    //   function:
    //     ConnectorApi.functional.connector.github.get_user_profile
    //       .getUserProfile,
    //   required: true,
    // },
  ],
});
