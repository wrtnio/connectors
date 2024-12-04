import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { ICalendly } from "../../../../src/api/structures/connector/calendly/ICalendly";

export const test_api_connector_calendly_one_off_event_types_createOneOffEventType =
  async (connection: api.IConnection) => {
    const output: Primitive<ICalendly.ICreateOneOffEventTypeOutput> =
      await api.functional.connector.calendly.one_off_event_types.createOneOffEventType(
        connection,
        typia.random<ICalendly.ICreateOneOffEventTypeInput>(),
      );
    typia.assert(output);
  };
