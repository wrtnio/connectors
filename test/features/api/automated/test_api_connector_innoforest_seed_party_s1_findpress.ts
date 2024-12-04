import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IInnoforest } from "../../../../src/api/structures/connector/innoforest/IInnoforest";

export const test_api_connector_innoforest_seed_party_s1_findpress = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IInnoforest.IFindpressOutput> =
    await api.functional.connector.innoforest.seed.party.s1.findpress(
      connection,
      typia.random<IInnoforest.IFindpressInput>(),
    );
  typia.assert(output);
};
