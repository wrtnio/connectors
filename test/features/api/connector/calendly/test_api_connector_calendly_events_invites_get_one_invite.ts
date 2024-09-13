import CApi from "@wrtn/connector-api/lib/index";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { test_api_connector_calendly_events_get_invitees } from "./test_api_connector_calendly_events_get_invitees";

export const test_api_connector_calendly_events_invitees_get_invitees_get_one_invitee =
  async (connection: CApi.IConnection) => {
    await ConnectorGlobal.reload();

    const invitees =
      await test_api_connector_calendly_events_get_invitees(connection);

    const invitee = invitees.collection[0];
    const searchText = "https://api.calendly.com/scheduled_events";
    const eventId = invitee.event.replace(searchText, "");

    const res =
      await CApi.functional.connector.calendly.events.invitees.getOneInvite(
        connection,
        eventId,
        invitee.uuid,
        {
          secretKey: ConnectorGlobal.env.CALENDLY_TEST_SECRET,
        },
      );
    return res;
  };
