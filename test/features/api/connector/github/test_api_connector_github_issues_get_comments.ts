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
  }

  const { fetchedIssues } =
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
  }
}
