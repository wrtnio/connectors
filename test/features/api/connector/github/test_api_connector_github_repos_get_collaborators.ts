import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export async function test_api_connector_github_repos_get_collaborators_1(
  connection: CApi.IConnection,
) {
  const res =
    await CApi.functional.connector.github.repos.get_collaborators.getCollaborators(
      connection,
      {
        owner: "studio-pro",
        repo: "github_connector",
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assert(res);
}

export async function test_api_connector_github_repos_get_collaborators_2(
  connection: CApi.IConnection,
) {
  const res =
    await CApi.functional.connector.github.repos.get_collaborators.getCollaborators(
      connection,
      {
        owner: "wrtnio",
        repo: "connectors",
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assert(res);
}
