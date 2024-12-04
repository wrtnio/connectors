import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { ICalendly } from "../../../../src/api/structures/connector/calendly/ICalendly";

export const test_api_connector_calendly_get_event_types_getEventTypes = async (
  connection: api.IConnection,
) => {
  const output: Primitive<ICalendly.IGetEventTypeOutput> =
    await api.functional.connector.calendly.get_event_types.getEventTypes(
      connection,
      typia.random<ICalendly.IGetEventTypeInput>(),
    );
  typia.assert(output);
};
