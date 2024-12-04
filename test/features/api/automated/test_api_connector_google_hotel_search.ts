import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGoogleHotel } from "../../../../src/api/structures/connector/google_hotel/IGoogleHotel";

export const test_api_connector_google_hotel_search = async (
  connection: api.IConnection,
) => {
  const output: Primitive<Array<IGoogleHotel.IResponse>> =
    await api.functional.connector.google_hotel.search(
      connection,
      typia.random<IGoogleHotel.IRequest>(),
    );
  typia.assert(output);
};
