import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { ICalendly } from "../../../../src/api/structures/connector/calendly/ICalendly";

export const test_api_connector_calendly_events_get_invitees_getInvitees =
  async (connection: api.IConnection) => {
    const output: Primitive<ICalendly.IGetScheduledEventInviteeOutput> =
      await api.functional.connector.calendly.events.get_invitees.getInvitees(
        connection,
        typia.random<ICalendly.IGetScheduledEventInviteeInput>(),
      );
    typia.assert(output);
  };
