import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IInnoforest } from "../../../../src/api/structures/connector/innoforest/IInnoforest";

export const test_api_connector_innoforest_unify = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IInnoforest.IUnifyOutput> =
    await api.functional.connector.innoforest.unify(
      connection,
      typia.random<IInnoforest.IUnifyInput>(),
    );
  typia.assert(output);
};
