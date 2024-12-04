import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { ICalendly } from "../../../../src/api/structures/connector/calendly/ICalendly";

export const test_api_connector_calendly_get_scheduled_events_getScheduledEvents =
  async (connection: api.IConnection) => {
    const output: Primitive<ICalendly.IGetScheduledEventOutput> =
      await api.functional.connector.calendly.get_scheduled_events.getScheduledEvents(
        connection,
        typia.random<ICalendly.IGetScheduledEventInput>(),
      );
    typia.assert(output);
  };
