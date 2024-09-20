import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_github_get_networks_events = async (
  connection: CApi.IConnection,
) => {
  const res =
    await CApi.functional.connector.github.networks.get_events.getNetworkRepoEvents(
      connection,
      {
        username: "samchon",
        repo: "typia",
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assert(res);
};
