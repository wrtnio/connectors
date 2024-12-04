import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { ICalendly } from "../../../../src/api/structures/connector/calendly/ICalendly";

export const test_api_connector_calendly_events_invitees_getOneInvite = async (
  connection: api.IConnection,
) => {
  const output: Primitive<ICalendly.IGetOneScheduledEventInviteeOutput> =
    await api.functional.connector.calendly.events.invitees.getOneInvite(
      connection,
      typia.random<string>(),
      typia.random<string>(),
      typia.random<ICalendly.Secret>(),
    );
  typia.assert(output);
};
