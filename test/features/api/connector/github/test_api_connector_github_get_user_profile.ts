import CApi from "@wrtn/connector-api/lib/index";
import { test_api_connector_github_search_user } from "./test_api_connector_github_search_user";
import typia from "typia";

export async function test_api_connector_github_get_user_profile(
  connection: CApi.IConnection,
) {
  const userList = await test_api_connector_github_search_user(connection);
  const user = userList.result.at(0);
  typia.assertEquals(user);
}
