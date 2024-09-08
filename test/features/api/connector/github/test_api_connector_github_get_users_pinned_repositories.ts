import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import assert from "assert";

export async function test_api_connector_github_get_users_pinned_repositories(
  connection: CApi.IConnection,
) {
  const res =
    await CApi.functional.connector.github.users.get_pinned_repositories.getUserPinnedRepositories(
      connection,
      {
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
        username: "kakasoo",
      },
    );

  typia.assert(res);
}

/**
 * 핀 꽂은 레포지토리가 없는 유저를 조회한 경우
 */
export async function test_api_connector_github_get_users_pinned_repositories_2(
  connection: CApi.IConnection,
) {
  const res =
    await CApi.functional.connector.github.users.get_pinned_repositories.getUserPinnedRepositories(
      connection,
      {
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
        username: "studio-pro",
      },
    );

  typia.assert(res);
  assert(res.length === 0);
}
