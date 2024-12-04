import typia from "typia";

import api from "../../../../src/api";
import type { IGoogleCalendar } from "../../../../src/api/structures/connector/google_calendar/IGoogleCalendar";

export const test_api_connector_google_calendar_quick_event_createQuickEvent =
  async (connection: api.IConnection) => {
    const output =
      await api.functional.connector.google_calendar.quick_event.createQuickEvent(
        connection,
        typia.random<string>(),
        typia.random<IGoogleCalendar.ICreateQuickEventInput>(),
      );
    typia.assert(output);
  };
