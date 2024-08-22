import CApi from "@wrtn/connector-api/lib/index";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import typia from "typia";

export async function test_api_connector_github_get_followees(
  connection: CApi.IConnection,
) {
  const res = await CApi.functional.connector.github.get_followees.getFollowees(
    connection,
    {
      username: "samchon",
      secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
    },
  );

  typia.assert(res);
}

export async function test_api_connector_github_get_followers(
  connection: CApi.IConnection,
) {
  const res = await CApi.functional.connector.github.get_followees.getFollowees(
    connection,
    {
      username: "samchon",
      secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
    },
  );

  typia.assert(res);
}
