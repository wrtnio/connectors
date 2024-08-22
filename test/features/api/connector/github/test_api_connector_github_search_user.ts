import CApi from "@wrtn/connector-api/lib/index";
import assert from "assert";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export async function test_api_connector_github_search_user(
  connection: CApi.IConnection,
) {
  const res = await CApi.functional.connector.github.get_users.searchUser(
    connection,
    {
      q: "kakasoo",
      secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
    },
  );

  typia.assert(res);

  assert(res.result.length > 1);
  assert(res.nextPage === false);
  return res;
}

export async function test_api_connector_github_search_user_with_options(
  connection: CApi.IConnection,
) {
  const res = await CApi.functional.connector.github.get_users.searchUser(
    connection,
    {
      q: "kakasoo",
      page: 1,
      per_page: 1,
      order: "desc",
      sort: "followers",
      secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
    },
  );

  assert(res.result.length === 1);
  assert(res.nextPage === true);
  typia.assert(res);
}
