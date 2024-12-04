import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGoogleCalendar } from "../../../../src/api/structures/connector/google_calendar/IGoogleCalendar";

export const test_api_connector_google_calendar_get_events_readEvents = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IGoogleCalendar.IReadGoogleCalendarEventOutput> =
    await api.functional.connector.google_calendar.get_events.readEvents(
      connection,
      typia.random<string>(),
      typia.random<IGoogleCalendar.IReadGoogleCalendarEventInput>(),
    );
  typia.assert(output);
};
