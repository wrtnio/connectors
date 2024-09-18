import CApi from "@wrtn/connector-api/lib/index";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import typia from "typia";

// create pull request 테스트 코드에 리뷰 요청을 추가하여 작성
export async function test_api_connector_github_request_review(
  connection: CApi.IConnection,
) {
  const created =
    await CApi.functional.connector.github.repositories.pull_requests.createPullRequest(
      connection,
      {
        owner: "studio-pro",
        repo: "github_connector",
        draft: true,
        body: "TEST REQUEST REVIEW BODY!",
        title: "TEST REQUEST REVIEW TITLE!",
        base: "main",
        head: "kakasoo",
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assert(created);

  await CApi.functional.connector.github.repositories.pull_requests.requested_reviewers.requestReviewers(
    connection,
    {
      owner: "studio-pro",
      repo: "github_connector",
      pull_number: created.number as number,
      reviewers: ["kakasoo"],
      secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
    },
  );

  const updated =
    await CApi.functional.connector.github.repositories.pull_requests.updatePullRequest(
      connection,
      {
        owner: "studio-pro",
        repo: "github_connector",
        pull_number: created.number as number,
        title: "[UPDATE] TEST REQUEST REVIEW TITLE!",
        body: "[UPDATED] TEST REQUEST REVIEW BODY!",
        state: "closed",
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assert(updated);
}
