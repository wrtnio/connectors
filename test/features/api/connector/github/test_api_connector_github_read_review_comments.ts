import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export async function test_api_connector_github_repository_read_review_comments(
  connection: CApi.IConnection,
) {
  const { result: reviews } =
    await CApi.functional.connector.github.repositories.pull_requests.get_reviews.readReviews(
      connection,
      {
        owner: "wrtnio",
        repo: "connectors",
        pull_number: 45,
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  for await (const review of reviews) {
    const reviewComments =
      await CApi.functional.connector.github.repositories.pull_requests.reviews.get_comments.readReviewComments(
        connection,
        {
          owner: "wrtnio",
          repo: "connectors",
          pull_number: 45,
          review_id: review.id as number,
          secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
        },
      );

    typia.assert(reviewComments);
  }
}
