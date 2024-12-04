import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IMOLIT } from "../../../../src/api/structures/connector/open_data/IMOLIT";

export const test_api_connector_open_data_getRTMSDataSvcAptRent = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IMOLIT.IGetRTMSDataSvcAptRentOutput> =
    await api.functional.connector.open_data.getRTMSDataSvcAptRent(
      connection,
      typia.random<IMOLIT.IGetRTMSDataSvcAptRentInput>(),
    );
  typia.assert(output);
};
