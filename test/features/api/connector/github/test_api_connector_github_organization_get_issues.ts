import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export async function test_api_connector_github_organizations_get_issues(
  connection: CApi.IConnection,
) {
  const res =
    await CApi.functional.connector.github.organizations.get_issues.getOrganizationIssues(
      connection,
      {
        organization: "wrtnio",
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assert(res);
  return res;
}
