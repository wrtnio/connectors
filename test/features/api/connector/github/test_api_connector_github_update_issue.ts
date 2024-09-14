import CApi from "@wrtn/connector-api/lib/index";
import { test_api_connector_github_create_issue } from "./test_api_connector_github_create_issue";
import { randomUUID } from "crypto";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import typia from "typia";

export async function test_api_connector_github_update_issue(
  connection: CApi.IConnection,
) {
  const created = await test_api_connector_github_create_issue(connection);
  const randomString = randomUUID();

  console.log(created);

  /**
   * @title 변경점 없는 이슈 변경 요청
   */
  await CApi.functional.connector.github.issues.updateIssue(connection, {
    owner: "studio-pro",
    repo: "github_connector",
    issue_number: created.number as number,
    secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
  });

  /**
   * @title 제목 변경 요청
   */
  const res1 = await CApi.functional.connector.github.issues.updateIssue(
    connection,
    {
      owner: "studio-pro",
      repo: "github_connector",
      issue_number: created.number as number,
      title: `[UPDATED] ${randomString}`,
      secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
    },
  );
  typia.assert(res1);

  /**
   * @title 담당자 변경 요청
   */
  const res2 = await CApi.functional.connector.github.issues.updateIssue(
    connection,
    {
      owner: "studio-pro",
      repo: "github_connector",
      issue_number: created.number as number,
      title: `[UPDATED] ${randomString}`,
      assignees: ["studio-pro"],
      secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
    },
  );
  typia.assert(res2);

  /**
   * @title label 변경 요청
   */
  const res3 = await CApi.functional.connector.github.issues.updateIssue(
    connection,
    {
      owner: "studio-pro",
      repo: "github_connector",
      issue_number: created.number as number,
      title: `[UPDATED] ${randomString}`,
      assignees: ["studio-pro"],
      labels: ["enhancement"],
      secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
    },
  );
  typia.assert(res3);
}
