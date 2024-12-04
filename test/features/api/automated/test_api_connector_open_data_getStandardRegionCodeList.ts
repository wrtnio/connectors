import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IOpenData } from "../../../../src/api/structures/connector/open_data/IOpenData";

export const test_api_connector_open_data_getStandardRegionCodeList = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IOpenData.MinistryOfTheInteriorAndSafety.IGetStandardRegionCodeListOutput> =
    await api.functional.connector.open_data.getStandardRegionCodeList(
      connection,
      typia.random<IOpenData.MinistryOfTheInteriorAndSafety.IGetStandardRegionCodeListInput>(),
    );
  typia.assert(output);
};
