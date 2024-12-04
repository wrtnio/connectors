import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGoogleCalendar } from "../../../../src/api/structures/connector/google_calendar/IGoogleCalendar";

export const test_api_connector_google_calendar_createCalendar = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IGoogleCalendar.IGoogleCalendarOutput> =
    await api.functional.connector.google_calendar.createCalendar(
      connection,
      typia.random<IGoogleCalendar.ICreateCalendarInput>(),
    );
  typia.assert(output);
};
