import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export async function test_api_connector_github_get_branches(
  connection: CApi.IConnection,
) {
  const res =
    await CApi.functional.connector.github.get_branches.getRepositoryBranches(
      connection,
      {
        owner: "samchon",
        repo: "nestia",
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assert(res);
  return res;
}
