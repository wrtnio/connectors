import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { test_api_connector_github_search_user } from "./test_api_connector_github_search_user";

export async function test_api_connector_github_get_user_profile(
  connection: CApi.IConnection,
) {
  const userList = await test_api_connector_github_search_user(connection);
  const user = userList.result.at(0);
  typia.assert(user);

  const res =
    await CApi.functional.connector.github.get_user_profile.getUserProfile(
      connection,
      {
        username: user?.login as string,
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assert(res);
}
