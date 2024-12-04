import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { ICalendly } from "../../../../src/api/structures/connector/calendly/ICalendly";

export const test_api_connector_calendly_get_events_getOneScheduledEvent =
  async (connection: api.IConnection) => {
    const output: Primitive<ICalendly.IGetOneScheduledEventOutput> =
      await api.functional.connector.calendly.get_events.getOneScheduledEvent(
        connection,
        typia.random<string>(),
        typia.random<ICalendly.Secret>(),
      );
    typia.assert(output);
  };
