import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export async function test_api_connector_github_repository_read_pull_request_requested_reviewers(
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
    const requestedReviewers =
      await CApi.functional.connector.github.repositories.pull_requests.get_requested_reviewers.readPullRequestRequestedReviewers(
        connection,
        {
          owner: "wrtnio",
          repo: "connectors",
          pull_number: pullRequest.number as number,
          secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
        },
      );

    console.log(JSON.stringify(requestedReviewers, null, 2));
    typia.assert(requestedReviewers);
  }
}
