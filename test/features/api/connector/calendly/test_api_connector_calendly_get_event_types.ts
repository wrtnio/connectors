import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { test_api_connector_calendly_users_get_me } from "./test_api_connector_calendly_users_get_me";

export const test_api_connector_calendly_get_event_types = async (
  connection: CApi.IConnection,
) => {
  await ConnectorGlobal.reload();
  const user = await test_api_connector_calendly_users_get_me(connection);

  await new Promise((res) => setTimeout(res, 2000));
  const res =
    await CApi.functional.connector.calendly.get_event_types.getEventTypes(
      connection,
      {
        secretKey: ConnectorGlobal.env.CALENDLY_TEST_SECRET,
        user: user.resource.uri as unknown as string,
      },
    );

  typia.assert(res);
  return res;
};
