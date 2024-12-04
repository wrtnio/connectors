import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { ICalendly } from "../../../../src/api/structures/connector/calendly/ICalendly";

export const test_api_connector_calendly_scheduling_links_createSchedulingLink =
  async (connection: api.IConnection) => {
    const output: Primitive<ICalendly.CreateSchedulingLinkOutput> =
      await api.functional.connector.calendly.scheduling_links.createSchedulingLink(
        connection,
        typia.random<ICalendly.CreateSchedulingLinkInput>(),
      );
    typia.assert(output);
  };
