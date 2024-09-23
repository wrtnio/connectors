import CApi from "@wrtn/connector-api/lib/index";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { test_api_connector_calendly_get_scheduled_events } from "./test_api_connector_calendly_get_scheduled_events";

export const test_api_connector_calendly_events_get_invitees = async (
  connection: CApi.IConnection,
) => {
  await ConnectorGlobal.reload();

  const events =
    await test_api_connector_calendly_get_scheduled_events(connection);

  const scheduled_event = events.collection.find(
    (event) => event.invitees_counter.active > 0,
  );

  await new Promise((res) => setTimeout(res, 2000));
  const res =
    await CApi.functional.connector.calendly.events.get_invitees.getInvitees(
      connection,
      {
        scheduled_event_uuid: scheduled_event?.uuid as string,
        secretKey: ConnectorGlobal.env.CALENDLY_TEST_SECRET,
      },
    );

  return res;
};
