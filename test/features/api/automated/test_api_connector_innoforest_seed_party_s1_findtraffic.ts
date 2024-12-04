import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IInnoforest } from "../../../../src/api/structures/connector/innoforest/IInnoforest";

export const test_api_connector_innoforest_seed_party_s1_findtraffic = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IInnoforest.IFindtrafficOutput> =
    await api.functional.connector.innoforest.seed.party.s1.findtraffic(
      connection,
      typia.random<IInnoforest.IFindtrafficInput>(),
    );
  typia.assert(output);
};
