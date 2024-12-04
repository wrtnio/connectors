import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGoogleFlight } from "../../../../src/api/structures/connector/google_flight/IGoogleFlight";

export const test_api_connector_google_flight_round_trip_roundTrip = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IGoogleFlight.IFinalResponse> =
    await api.functional.connector.google_flight.round_trip.roundTrip(
      connection,
      typia.random<IGoogleFlight.IRequest>(),
    );
  typia.assert(output);
};
