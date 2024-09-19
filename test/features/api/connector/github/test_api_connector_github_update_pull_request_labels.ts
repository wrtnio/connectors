import CApi from "@wrtn/connector-api/lib/index";
import assert from "assert";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

// create pull request 테스트 코드에 리뷰 요청을 추가하여 작성
export async function test_api_connector_github_update_pull_request_labels(
  connection: CApi.IConnection,
) {
  const created =
    await CApi.functional.connector.github.repositories.pull_requests.createPullRequest(
      connection,
      {
        owner: "studio-pro",
        repo: "github_connector",
        draft: true,
        body: "TEST UPDATE LABELS BODY!",
        title: "TEST UPDATE LABELS TITLE!",
        base: "main",
        head: "kakasoo",
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  const res = await CApi.functional.connector.github.issues.updateIssue(
    connection,
    {
      owner: "studio-pro",
      repo: "github_connector",
      issue_number: created.number as number,
      labels: ["kakasoo"],
      secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
    },
  );

  typia.assert(res);

  const label = res.labels.at(0);
  if (typeof label !== "string") {
    assert(label?.name === "kakasoo");
  }

  await CApi.functional.connector.github.repositories.pull_requests.updatePullRequest(
    connection,
    {
      owner: "studio-pro",
      repo: "github_connector",
      pull_number: created.number as number,
      title: "[UPDATE] TEST UPDATE LABELS TITLE!",
      body: "[UPDATED] TEST UPDATE LABELS BODY!",
      state: "closed",
      secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
    },
  );
}
