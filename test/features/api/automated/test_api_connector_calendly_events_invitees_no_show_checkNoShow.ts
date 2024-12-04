import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { ICalendly } from "../../../../src/api/structures/connector/calendly/ICalendly";

export const test_api_connector_calendly_events_invitees_no_show_checkNoShow =
  async (connection: api.IConnection) => {
    const output: Primitive<ICalendly.ICheckNoShowOutput> =
      await api.functional.connector.calendly.events.invitees.no_show.checkNoShow(
        connection,
        typia.random<string>(),
        typia.random<string>(),
        typia.random<ICalendly.Secret>(),
      );
    typia.assert(output);
  };
