import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IOpenData } from "../../../../src/api/structures/connector/open_data/IOpenData";

export const test_api_connector_open_data_getStockPriceInfo = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IOpenData.FinancialServicesCommission.IGetStockPriceInfoOutput> =
    await api.functional.connector.open_data.getStockPriceInfo(
      connection,
      typia.random<IOpenData.FinancialServicesCommission.IGetStockPriceInfoInput>(),
    );
  typia.assert(output);
};
