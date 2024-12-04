import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { KoreaCopyrightCommission } from "../../../../src/api/structures/connector/open_data/KoreaCopyrightCommission";

export const test_api_connector_open_data_getCopyRight = async (
  connection: api.IConnection,
) => {
  const output: Primitive<KoreaCopyrightCommission.IGetCopyRightOutput> =
    await api.functional.connector.open_data.getCopyRight(
      connection,
      typia.random<KoreaCopyrightCommission.IGetCopyRightInput>(),
    );
  typia.assert(output);
};
