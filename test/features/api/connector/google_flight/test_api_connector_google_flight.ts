import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IGoogleFlight } from "@wrtn/connector-api/lib/structures/connector/google_flight/IGoogleFlight";

export const test_api_connector_google_flight = async (
  connection: CApi.IConnection,
) => {
  const params: IGoogleFlight.IRequest = {
    departure_id: "ICN",
    arrival_id: "KIX",
    type: "1",
    outbound_date: "2024-09-07",
    travel_class: "1",
    adults: 1,
    children: 0,
    stop: "1",
  };

  const oneWayResult =
    await CApi.functional.connector.google_flight.one_way.oneWay(
      connection,
      params,
    );
  typia.assert<IGoogleFlight.IFinalResponse>(oneWayResult);

  const roundTripResult =
    await CApi.functional.connector.google_flight.round_trip.roundTrip(
      connection,
      {
        ...params,
        return_date: "2024-09-10",
      },
    );
  typia.assert<IGoogleFlight.IFinalResponse>(roundTripResult);
};
