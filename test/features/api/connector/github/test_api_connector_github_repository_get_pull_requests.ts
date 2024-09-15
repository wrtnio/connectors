import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import assert from "assert";

export async function test_api_connector_github_repository_get_pull_requests(
  connection: CApi.IConnection,
) {
  const res1 =
    await CApi.functional.connector.github.repositories.get_pull_requests.getRepositoryPullRequest(
      connection,
      {
        owner: "samchon",
        repo: "nestia",
        direction: "DESC",
        sort: "CREATED_AT",
        per_page: 10,
        state: "OPEN",
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assert(res1);

  const res2 =
    await CApi.functional.connector.github.repositories.get_pull_requests.getRepositoryPullRequest(
      connection,
      {
        owner: "samchon",
        repo: "nestia",
        direction: "DESC",
        sort: "UPDATED_AT",
        per_page: 10,
        state: "OPEN",
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assert(res2);

  const res3 =
    await CApi.functional.connector.github.repositories.get_pull_requests.getRepositoryPullRequest(
      connection,
      {
        owner: "samchon",
        repo: "nestia",
        direction: "ASC",
        sort: "CREATED_AT",
        per_page: 10,
        state: "OPEN",
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assert(res3);

  const res4 =
    await CApi.functional.connector.github.repositories.get_pull_requests.getRepositoryPullRequest(
      connection,
      {
        owner: "samchon",
        repo: "nestia",
        direction: "ASC",
        sort: "UPDATED_AT",
        per_page: 10,
        state: "OPEN",
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assert(res4);

  const res5 =
    await CApi.functional.connector.github.repositories.get_pull_requests.getRepositoryPullRequest(
      connection,
      {
        owner: "samchon",
        repo: "nestia",
        direction: "ASC",
        sort: "UPDATED_AT",
        per_page: 10,
        state: "CLOSED",
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assert(res5);
  assert(res5.pullRequests.every((el) => el.state === "CLOSED"));
}
