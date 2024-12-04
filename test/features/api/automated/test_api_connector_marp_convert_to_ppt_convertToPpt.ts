import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IMarp } from "../../../../src/api/structures/connector/marp/IMarp";

export const test_api_connector_marp_convert_to_ppt_convertToPpt = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IMarp.IConvertOutput> =
    await api.functional.connector.marp.convert_to_ppt.convertToPpt(
      connection,
      typia.random<IMarp.IConvertInput>(),
    );
  typia.assert(output);
};
