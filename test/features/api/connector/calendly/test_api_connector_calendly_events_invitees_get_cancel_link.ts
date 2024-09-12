import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { test_api_connector_calendly_events_invitees_get_invitees_get_one_invitee } from "./test_api_connector_calendly_events_invites_get_one_invite";

export const test_api_connector_calendly_events_invitees_get_cancel_link =
  async (connection: CApi.IConnection) => {
    await ConnectorGlobal.reload();

    const invitee =
      await test_api_connector_calendly_events_invitees_get_invitees_get_one_invitee(
        connection,
      );

    const searchText = "https://api.calendly.com/scheduled_events";
    const eventId = invitee.resource.event.replace(searchText, "");

    const res =
      await CApi.functional.connector.calendly.events.invitees.get_cancel_link.cancel(
        connection,
        eventId,
        invitee.resource.uuid,
        {
          secretKey: ConnectorGlobal.env.CALENDLY_TEST_SECRET,
        },
      );

    typia.assert(res);
  };
