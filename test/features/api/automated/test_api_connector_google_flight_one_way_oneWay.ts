import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGoogleFlight } from "../../../../src/api/structures/connector/google_flight/IGoogleFlight";

export const test_api_connector_google_flight_one_way_oneWay = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IGoogleFlight.IFinalResponse> =
    await api.functional.connector.google_flight.one_way.oneWay(
      connection,
      typia.random<IGoogleFlight.IRequest>(),
    );
  typia.assert(output);
};
