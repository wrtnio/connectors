import CApi from "@wrtn/connector-api/lib/index";
import assert from "assert";
import { randomUUID } from "crypto";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

// 이슈 수정 기능을 사용하여 PR의 라벨이 업데이트되는지를 테스트
export async function test_api_connector_github_update_pull_request_labels_by_update_issue_connector(
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

// PR 수정 기능을 사용하여 PR의 라벨이 업데이트되는지를 테스트
export async function test_api_connector_github_update_pull_request_labels_by_update_pull_request_connector(
  connection: CApi.IConnection,
) {
  // 동일한 commit_sha에 대해서는 100개 까지만 PR을 만들 수 있기 때문에 하나를 추가한다.
  const randomString = randomUUID();
  await CApi.functional.connector.github.repos.commits.contents.createFileContents(
    connection,
    {
      owner: "studio-pro",
      repo: "github_connector",
      branch: "kakasoo",
      content: "hello, studio-pro!",
      message: `create src/${randomString}.ts`,
      path: `src/${randomString}.ts`,
      secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
    },
  );

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

  await CApi.functional.connector.github.repositories.pull_requests.updatePullRequest(
    connection,
    {
      owner: "studio-pro",
      repo: "github_connector",
      pull_number: created.number as number,
      title: "[UPDATE] TEST UPDATE LABELS TITLE!",
      body: "[UPDATED] TEST UPDATE LABELS BODY!",
      state: "closed",
      labels: ["kakasoo_2"],
      secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
    },
  );

  const detail =
    await CApi.functional.connector.github.repositories.pull_requests.get_detail.readPullRequestDetail(
      connection,
      {
        owner: "studio-pro",
        repo: "github_connector",
        pull_number: created.number as number,
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  const label = detail.labels.at(0);
  if (typeof label === "string") {
    assert(label === "kakasoo_2");
  } else {
    assert(label?.name === "kakasoo_2");
  }
}
