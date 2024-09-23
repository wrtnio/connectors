import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { test_api_connector_calendly_get_scheduled_events } from "./test_api_connector_calendly_get_scheduled_events";

export const test_api_connector_calendly_get_events_get_one_schduled_event =
  async (connection: CApi.IConnection) => {
    await ConnectorGlobal.reload();

    const events =
      await test_api_connector_calendly_get_scheduled_events(connection);
    const eventUuid = events.collection?.[0].uuid;

    await new Promise((res) => setTimeout(res, 2000));
    const res =
      await CApi.functional.connector.calendly.get_events.getOneScheduledEvent(
        connection,
        eventUuid,
        {
          secretKey: ConnectorGlobal.env.CALENDLY_TEST_SECRET,
        },
      );

    typia.assert(res);
    return res;
  };
