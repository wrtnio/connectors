import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { test_api_connector_calendly_users_get_me } from "./test_api_connector_calendly_users_get_me";

export const test_api_connector_calendly_get_scheduled_events = async (
  connection: CApi.IConnection,
) => {
  await ConnectorGlobal.reload();
  const me = await test_api_connector_calendly_users_get_me(connection);

  await new Promise((res) => setTimeout(res, 2000));
  const res =
    await CApi.functional.connector.calendly.get_scheduled_events.getScheduledEvents(
      connection,
      {
        secretKey: ConnectorGlobal.env.CALENDLY_TEST_SECRET,
        who: {
          user: me.resource.uri,
        },
      },
    );

  typia.assert(res);
  return res;
};
