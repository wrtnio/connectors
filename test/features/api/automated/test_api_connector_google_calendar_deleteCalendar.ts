import typia from "typia";

import api from "../../../../src/api";
import type { IGoogleCalendar } from "../../../../src/api/structures/connector/google_calendar/IGoogleCalendar";

export const test_api_connector_google_calendar_deleteCalendar = async (
  connection: api.IConnection,
) => {
  const output = await api.functional.connector.google_calendar.deleteCalendar(
    connection,
    typia.random<string>(),
    typia.random<IGoogleCalendar.ISecret>(),
  );
  typia.assert(output);
};
