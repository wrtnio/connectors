import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { test_api_connector_calendly_users_get_me } from "./test_api_connector_calendly_users_get_me";

export const test_api_connector_calendly_create_one_off_event_type = async (
  connection: CApi.IConnection,
) => {
  await ConnectorGlobal.reload();

  const me = await test_api_connector_calendly_users_get_me(connection);

  await new Promise((res) => setTimeout(res, 10000));
  const res =
    await CApi.functional.connector.calendly.one_off_event_types.createOneOffEventType(
      connection,
      {
        host: me.resource.uri as string,
        date_setting: {
          start_date: "2030-01-01",
          end_date: "2030-01-02",
          type: "date_range",
        },
        duration: 60,
        location: {
          kind: "custom",
          location: "wrtn office",
        },
        name: "2030 WRTN NEXT PLAN",
        secretKey: ConnectorGlobal.env.CALENDLY_TEST_SECRET,
      },
    );

  typia.assert(res);
  return res;
};
