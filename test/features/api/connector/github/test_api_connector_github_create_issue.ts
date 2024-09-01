import CApi from "@wrtn/connector-api/lib/index";
import { randomUUID } from "crypto";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export async function test_api_connector_github_create_issue(
  connection: CApi.IConnection,
) {
  const randomString = randomUUID();
  const res = await CApi.functional.connector.github.issue.createIssue(
    connection,
    {
      title: randomString,
      body: '```ts\nconsole.log("Hello, Issue!");\n```',
      labels: [],
      owner: "studio-pro",
      repo: "github_connector",
      secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
    },
  );

  typia.assert(res);
}
