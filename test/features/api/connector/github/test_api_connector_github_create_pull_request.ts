import CApi from "@wrtn/connector-api/lib/index";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import typia from "typia";

export async function test_api_connector_github_create_pull_requests(
  connection: CApi.IConnection,
) {
  const created =
    await CApi.functional.connector.github.repositories.pull_requests.createPullRequest(
      connection,
      {
        owner: "studio-pro",
        repo: "github_connector",
        draft: true,
        body: "TEST BODY!",
        title: "TEST TITLE!",
        base: "main",
        head: "kakasoo",
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assert(created);

  const updated =
    await CApi.functional.connector.github.repositories.pull_requests.updatePullRequest(
      connection,
      {
        owner: "studio-pro",
        repo: "github_connector",
        pull_number: created.number as number,
        title: "[UPDATE] TEST TITLE!",
        body: "[UPDATED] TEST BODY!",
        state: "closed",
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assert(updated);
}
