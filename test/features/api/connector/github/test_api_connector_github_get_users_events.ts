import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_github_get_repos_events = async (
  connection: CApi.IConnection,
) => {
  const res =
    await CApi.functional.connector.github.users.get_events.getUserEvents(
      connection,
      {
        username: "samchon",
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assert(res);
};
