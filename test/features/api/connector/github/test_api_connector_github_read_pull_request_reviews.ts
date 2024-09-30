import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import assert from "assert";

export async function test_api_connector_github_repository_read_pull_request_reviews(
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
    const reviews =
      await CApi.functional.connector.github.repositories.pull_requests.get_reviews.readReviews(
        connection,
        {
          owner: "wrtnio",
          repo: "connectors",
          pull_number: pullRequest.number as number,
          secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
        },
      );

    typia.assert(reviews);
  }
}

export async function test_api_connector_github_repository_read_pull_request_reviews_2(
  connection: CApi.IConnection,
) {
  const reviews =
    await CApi.functional.connector.github.repositories.pull_requests.get_reviews.readReviews(
      connection,
      {
        owner: "wrtnio",
        repo: "connectors",
        pull_number: 18 as const,
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assert(reviews);

  const requested_reviewers =
    await CApi.functional.connector.github.repositories.pull_requests.get_requested_reviewers.readPullRequestRequestedReviewers(
      connection,
      {
        owner: "wrtnio",
        repo: "connectors",
        pull_number: 18 as const,
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assert(requested_reviewers);

  assert(reviews.result.length === 1);
  assert(requested_reviewers.users.length === 0);
  assert(requested_reviewers.teams.length === 0);
}
