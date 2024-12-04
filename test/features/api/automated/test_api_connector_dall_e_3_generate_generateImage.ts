import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IDallE3 } from "../../../../src/api/structures/connector/dall_e_3/IDallE3";

export const test_api_connector_dall_e_3_generate_generateImage = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IDallE3.IResponse> =
    await api.functional.connector.dall_e_3.generate.generateImage(
      connection,
      typia.random<IDallE3.IRequest>(),
    );
  typia.assert(output);
};
