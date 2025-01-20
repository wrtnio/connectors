import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export async function test_api_connector_github_repository_issues_get_comments(
  connection: CApi.IConnection,
) {
  const { pullRequests } =
    await CApi.functional.connector.github.repositories.get_pull_requests.getRepositoryPullRequest(
      connection,
      {
        owner: "wrtnio",
        repo: "connectors",
        direction: "ASC",
        sort: "CREATED_AT",
        per_page: 10,
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assert(pullRequests);

  for await (const pullRequest of pullRequests) {
    const comment =
      await CApi.functional.connector.github.repositories.issues.get_comments.getIssueComments(
        connection,
        {
          owner: "wrtnio",
          repo: "connectors",
          issue_number: pullRequest.number as number,
          secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
        },
      );

    typia.assert(comment);

    // pull_request의 댓글을 조회하는 커넥터와 issue의 댓글을 보는 커넥터는 사실 같다.
    const comment_2 =
      await CApi.functional.connector.github.repositories.pull_requests.get_comments.getPullRequestComments(
        connection,
        {
          owner: "wrtnio",
          repo: "connectors",
          pull_number: pullRequest.number as number,
          secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
        },
      );

    typia.assert(comment_2);
  }

  const res =
    await CApi.functional.connector.github.repositories.get_issues.getRepositoryIssues(
      connection,
      {
        owner: "wrtnio",
        repo: "connectors",
        direction: "ASC",
        sort: "CREATED_AT",
        per_page: 10,
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  if ("error_message" in res) {
    // 에러로 인한 실패
    throw new Error(res.error_message);
  }

  const fetchedIssues = res.fetchedIssues;

  for await (const issue of fetchedIssues) {
    const comment =
      await CApi.functional.connector.github.repositories.issues.get_comments.getIssueComments(
        connection,
        {
          owner: "wrtnio",
          repo: "connectors",
          issue_number: issue.number as number,
          secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
        },
      );

    typia.assert(comment);

    // pull_request의 댓글을 조회하는 커넥터와 issue의 댓글을 보는 커넥터는 사실 같다.
    const comment_2 =
      await CApi.functional.connector.github.repositories.pull_requests.get_comments.getPullRequestComments(
        connection,
        {
          owner: "wrtnio",
          repo: "connectors",
          pull_number: issue.number as number,
          secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
        },
      );

    typia.assert(comment_2);
  }
}

// 댓글과 리뷰는 다른지 테스트하였고, 확인 결과 댓글 조회 시 리뷰의 코멘트는 보이지 않는다.
export async function test_api_connector_github_repository_issues_get_comments_2(
  connection: CApi.IConnection,
) {
  const comment =
    await CApi.functional.connector.github.repositories.issues.get_comments.getIssueComments(
      connection,
      {
        owner: "wrtnio",
        repo: "connectors",
        issue_number: 18 as const,
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assert(comment);
}
