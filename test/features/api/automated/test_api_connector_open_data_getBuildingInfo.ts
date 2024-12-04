import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IMOLIT } from "../../../../src/api/structures/connector/open_data/IMOLIT";

export const test_api_connector_open_data_getBuildingInfo = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IMOLIT.GetBuildingInfoOutput> =
    await api.functional.connector.open_data.getBuildingInfo(
      connection,
      typia.random<IMOLIT.GetBuildingInfoInput>(),
    );
  typia.assert(output);
};
