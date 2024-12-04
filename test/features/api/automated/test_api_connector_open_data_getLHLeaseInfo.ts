import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { ILH } from "../../../../src/api/structures/connector/open_data/ILH";

export const test_api_connector_open_data_getLHLeaseInfo = async (
  connection: api.IConnection,
) => {
  const output: Primitive<ILH.IGetLHLeaseInfoOutput> =
    await api.functional.connector.open_data.getLHLeaseInfo(
      connection,
      typia.random<ILH.IGetLHLeaseInfoInput>(),
    );
  typia.assert(output);
};
