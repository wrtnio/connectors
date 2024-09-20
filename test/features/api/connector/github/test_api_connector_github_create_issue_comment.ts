import CApi from "@wrtn/connector-api/lib/index";
import { randomUUID } from "crypto";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export async function test_api_connector_github_create_issue_comment(
  connection: CApi.IConnection,
) {
  const randomString = randomUUID();
  const res = await CApi.functional.connector.github.issues.createIssue(
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

  const comment =
    await CApi.functional.connector.github.repositories.issues.comments.createIssueComments(
      connection,
      {
        body: '```ts\nconsole.log("Hello, Issue!");\n```',
        owner: "studio-pro",
        repo: "github_connector",
        issue_number: res.number as number,
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assert(comment);
  return res;
}
