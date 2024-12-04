import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { INIA } from "../../../../src/api/structures/connector/open_data/INIA";

export const test_api_connector_open_data_getParkingLot = async (
  connection: api.IConnection,
) => {
  const output: Primitive<INIA.IGetParkingLotOutput> =
    await api.functional.connector.open_data.getParkingLot(
      connection,
      typia.random<INIA.IGetParkingLotInput>(),
    );
  typia.assert(output);
};
