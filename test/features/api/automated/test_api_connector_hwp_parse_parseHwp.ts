import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IHwp } from "../../../../src/api/structures/connector/hwp/IHwp";

export const test_api_connector_hwp_parse_parseHwp = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IHwp.IParseOutput> =
    await api.functional.connector.hwp.parse.parseHwp(
      connection,
      typia.random<IHwp.IParseInput>(),
    );
  typia.assert(output);
};
