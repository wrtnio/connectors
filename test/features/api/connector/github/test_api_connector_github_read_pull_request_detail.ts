import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export async function test_api_connector_github_repository_read_pull_request_detail(
  connection: CApi.IConnection,
) {
  const { pullRequests } =
    await CApi.functional.connector.github.repositories.get_pull_requests.getRepositoryPullRequest(
      connection,
      {
        owner: "samchon",
        repo: "nestia",
        direction: "DESC",
        sort: "CREATED_AT",
        per_page: 30,
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assert(pullRequests);

  for await (const pullRequest of pullRequests) {
    const detail =
      await CApi.functional.connector.github.repositories.pull_requests.get_detail.readPullRequestDetail(
        connection,
        {
          owner: "samchon",
          repo: "nestia",
          pull_number: pullRequest.number as number,
          secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
        },
      );

    typia.assert(detail);
  }
}