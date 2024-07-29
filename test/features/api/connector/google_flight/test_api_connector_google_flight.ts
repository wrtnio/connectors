import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IGoogleFlight } from "@wrtn/connector-api/lib/structures/connector/google_flight/IGoogleFlight";

export const test_api_connector_google_flight = async (
  connection: CApi.IConnection,
) => {
  const params: IGoogleFlight.IRequest = {
    departure_id: "ICN",
    arrival_id: "FUK",
    type: "1",
    outbound_date: "2024-09-07",
    return_date: "2024-09-10",
    travel_class: "1",
    adults: 1,
    children: 0,
    stop: "1",
  };

  const departureResult =
    await CApi.functional.connector.google_flight.departure(connection, params);
  typia.assert<IGoogleFlight.IResponse>(departureResult);

  const arrivalResult = await CApi.functional.connector.google_flight.arrival(
    connection,
    params,
    departureResult.best_flights[0]?.departure_token!,
  );
  typia.assert<IGoogleFlight.IResponse>(arrivalResult);

  const finalResult = await CApi.functional.connector.google_flight.final(
    connection,
    params,
    arrivalResult.best_flights[0]?.booking_token!,
  );
  typia.assert<IGoogleFlight.IFinalResponse>(finalResult);
};
