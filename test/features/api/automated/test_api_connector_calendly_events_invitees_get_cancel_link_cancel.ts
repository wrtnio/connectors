import typia from "typia";
import type { Primitive } from "typia";
import type { Format } from "typia/lib/tags/Format";

import api from "../../../../src/api";
import type { ICalendly } from "../../../../src/api/structures/connector/calendly/ICalendly";

export const test_api_connector_calendly_events_invitees_get_cancel_link_cancel =
  async (connection: api.IConnection) => {
    const output: Primitive<string & Format<"iri">> =
      await api.functional.connector.calendly.events.invitees.get_cancel_link.cancel(
        connection,
        typia.random<string>(),
        typia.random<string>(),
        typia.random<ICalendly.Secret>(),
      );
    typia.assert(output);
  };
