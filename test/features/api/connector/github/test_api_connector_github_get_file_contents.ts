import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export async function test_api_connector_github_get_followees(
  connection: CApi.IConnection,
) {
  const res =
    await CApi.functional.connector.github.repos.get_contents.getFileContents(
      connection,
      {
        owner: "samchon",
        repo: "nestia",
        path: "README.md",
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assert(res);
}
