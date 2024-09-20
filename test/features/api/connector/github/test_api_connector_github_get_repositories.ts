import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { test_api_connector_github_search_user } from "./test_api_connector_github_search_user";

export async function test_api_connector_github_get_repositories(
  connection: CApi.IConnection,
) {
  const userList = await test_api_connector_github_search_user(connection);
  const user = userList.result.at(0);

  const res =
    await CApi.functional.connector.github.users.get_repositories.getUserRepositories(
      connection,
      {
        username: user?.login as string,
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assertEquals(res);
  return res;
}

export async function test_api_connector_github_get_repositories_with_too_many_contents(
  connection: CApi.IConnection,
) {
  const res =
    await CApi.functional.connector.github.users.get_repositories.getUserRepositories(
      connection,
      {
        username: "samchon",
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assertEquals(res);
  return res;
}
