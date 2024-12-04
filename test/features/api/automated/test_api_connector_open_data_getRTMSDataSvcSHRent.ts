import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IMOLIT } from "../../../../src/api/structures/connector/open_data/IMOLIT";

export const test_api_connector_open_data_getRTMSDataSvcSHRent = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IMOLIT.IgetRTMSDataSvcSHRentOutput> =
    await api.functional.connector.open_data.getRTMSDataSvcSHRent(
      connection,
      typia.random<IMOLIT.IGetRTMSDataSvcAptRentInput>(),
    );
  typia.assert(output);
};
