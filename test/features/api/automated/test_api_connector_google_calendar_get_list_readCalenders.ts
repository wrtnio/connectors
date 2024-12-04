import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGoogleCalendar } from "../../../../src/api/structures/connector/google_calendar/IGoogleCalendar";

export const test_api_connector_google_calendar_get_list_readCalenders = async (
  connection: api.IConnection,
) => {
  const output: Primitive<Array<IGoogleCalendar.IGoogleCalendarOutput>> =
    await api.functional.connector.google_calendar.get_list.readCalenders(
      connection,
      typia.random<IGoogleCalendar.ISecret>(),
    );
  typia.assert(output);
};
