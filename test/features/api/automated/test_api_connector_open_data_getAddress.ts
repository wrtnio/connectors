import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IMSIT } from "../../../../src/api/structures/connector/open_data/MSIT";

export const test_api_connector_open_data_getAddress = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IMSIT.IGetAddressOutput> =
    await api.functional.connector.open_data.getAddress(
      connection,
      typia.random<IMSIT.IGetAddressInput>(),
    );
  typia.assert(output);
};
