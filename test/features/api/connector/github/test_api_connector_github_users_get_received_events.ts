import CApi from "@wrtn/connector-api/lib/index";
import assert from "assert";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export async function test_api_connector_github_users_get_received_events_1(
  connection: CApi.IConnection,
) {
  const res =
    await CApi.functional.connector.github.users.get_received_events.getReceivedEvents(
      connection,
      {
        username: "samchon",
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assert(res);
}

export async function test_api_connector_github_users_get_received_events_2(
  connection: CApi.IConnection,
) {
  const res =
    await CApi.functional.connector.github.users.get_received_events.getReceivedEvents(
      connection,
      {
        username: "kakasoo",
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assert(res);
}

export async function test_api_connector_github_users_get_received_events_pagination(
  connection: CApi.IConnection,
) {
  const res =
    await CApi.functional.connector.github.users.get_received_events.getReceivedEvents(
      connection,
      {
        page: 1,
        per_page: 1,
        username: "kakasoo",
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assert(res);
  assert(res.result.length === 1);
}
