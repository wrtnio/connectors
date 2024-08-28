import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export async function test_api_connector_github_analyze(
  connection: CApi.IConnection,
) {
  const res = await CApi.functional.connector.github.analyze(connection, {
    owner: "wrtnio",
    repo: "connectors",
    secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
  });

  typia.assert(res);
}
