import CApi from "@wrtn/connector-api/lib/index";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import typia from "typia";
import { randomUUID } from "crypto";

export async function test_api_connector_github_create_branch(
  connection: CApi.IConnection,
) {
  const commits =
    await CApi.functional.connector.github.get_commit_list.getCommitList(
      connection,
      {
        owner: "studio-pro",
        repo: "github_connector",
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
        page: 1,
        per_page: 1,
        order: "desc",
      },
    );

  const uuid = randomUUID();
  const res = await CApi.functional.connector.github.branches.createBranches(
    connection,
    {
      owner: "studio-pro",
      repo: "github_connector",
      ref: `refs/heads/${uuid}`,
      sha: commits.result?.[0].sha, // 메인 브랜치를 기준으로 브랜치 새로 만들기
      secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
    },
  );

  typia.assert(res);
}
