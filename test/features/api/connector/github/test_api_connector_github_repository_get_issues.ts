import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export async function test_api_connector_github_repositories_get_issues(
  connection: CApi.IConnection,
) {
  const res =
    await CApi.functional.connector.github.repositories.get_issues.getRepositoryIssues(
      connection,
      {
        owner: "samchon",
        repo: "nestia",
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assertEquals(res);
  return res;
}
