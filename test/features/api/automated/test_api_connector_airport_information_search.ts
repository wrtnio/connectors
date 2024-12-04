import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IAirportInformation } from "../../../../src/api/structures/connector/airport_information/IAirportInformation";

export const test_api_connector_airport_information_search = async (
  connection: api.IConnection,
) => {
  const output: Primitive<Array<IAirportInformation.IResponse>> =
    await api.functional.connector.airport_information.search(
      connection,
      typia.random<IAirportInformation.IRequest>(),
    );
  typia.assert(output);
};
