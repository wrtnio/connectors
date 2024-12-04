import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGoogleCalendar } from "../../../../src/api/structures/connector/google_calendar/IGoogleCalendar";

export const test_api_connector_google_calendar_event_attendees_addAttendeesToEvent =
  async (connection: api.IConnection) => {
    const output: Primitive<IGoogleCalendar.IGoogleCalendarEvent> =
      await api.functional.connector.google_calendar.event.attendees.addAttendeesToEvent(
        connection,
        typia.random<string>(),
        typia.random<string>(),
        typia.random<IGoogleCalendar.IAddAttendeesToEventInput>(),
      );
    typia.assert(output);
  };
