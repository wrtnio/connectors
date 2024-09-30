import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_calendly = async (
  connection: CApi.IConnection,
) => {
  await ConnectorGlobal.reload();

  // get_me
  const me = await CApi.functional.connector.calendly.users.get_me.getUserInfo(
    connection,
    {
      secretKey: ConnectorGlobal.env.CALENDLY_TEST_SECRET,
    },
  );
  typia.assert(me);

  // create one off event type
  const oneOffEventType =
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
  typia.assert(oneOffEventType);

  // get_event_types
  const event_types =
    await CApi.functional.connector.calendly.get_event_types.getEventTypes(
      connection,
      {
        secretKey: ConnectorGlobal.env.CALENDLY_TEST_SECRET,
        user: me.resource.uri as unknown as string,
      },
    );

  typia.assert(event_types);

  // get_scheduled_events
  const scheduledEvents =
    await CApi.functional.connector.calendly.get_scheduled_events.getScheduledEvents(
      connection,
      {
        secretKey: ConnectorGlobal.env.CALENDLY_TEST_SECRET,
        who: {
          user: me.resource.uri,
        },
      },
    );
  typia.assert(scheduledEvents);

  // get_one_scheduled_event
  const eventUuid = scheduledEvents.collection?.[0].uuid;
  const res =
    await CApi.functional.connector.calendly.get_events.getOneScheduledEvent(
      connection,
      eventUuid,
      {
        secretKey: ConnectorGlobal.env.CALENDLY_TEST_SECRET,
      },
    );

  typia.assert(res);

  // get invitees
  const scheduled_event = scheduledEvents.collection.find(
    (event) => event.invitees_counter.active > 0,
  );
  const invitees =
    await CApi.functional.connector.calendly.events.get_invitees.getInvitees(
      connection,
      {
        scheduled_event_uuid: scheduled_event?.uuid as string,
        secretKey: ConnectorGlobal.env.CALENDLY_TEST_SECRET,
      },
    );
  typia.assert(invitees);

  // get one invitee
  const invitee = invitees.collection[0];
  const searchText = "https://api.calendly.com/scheduled_events";
  const eventId = invitee.event.replace(searchText, "");

  const inviteeDetail =
    await CApi.functional.connector.calendly.events.invitees.getOneInvite(
      connection,
      eventId,
      invitee.uuid,
      {
        secretKey: ConnectorGlobal.env.CALENDLY_TEST_SECRET,
      },
    );
  typia.assert(inviteeDetail);

  // get cancel link
  await new Promise((res) => setTimeout(res, 10000));
  const cancelLink =
    await CApi.functional.connector.calendly.events.invitees.get_cancel_link.cancel(
      connection,
      eventId,
      invitee.uuid,
      {
        secretKey: ConnectorGlobal.env.CALENDLY_TEST_SECRET,
      },
    );
  typia.assert(cancelLink);

  // create scheduling link
  const eventTypeUri = event_types.collection?.[0].uri;
  const scheduling_link =
    await CApi.functional.connector.calendly.scheduling_links.createSchedulingLink(
      connection,
      {
        owner: eventTypeUri,
        secretKey: ConnectorGlobal.env.CALENDLY_TEST_SECRET,
      },
    );
  typia.assert(scheduling_link);

  // create schduiling link of one off event type
  const scheduling_link_of_one_off_event_type =
    await CApi.functional.connector.calendly.scheduling_links.createSchedulingLink(
      connection,
      {
        owner: oneOffEventType.resource.uri,
        secretKey: ConnectorGlobal.env.CALENDLY_TEST_SECRET,
      },
    );
  typia.assert(scheduling_link_of_one_off_event_type);
};
