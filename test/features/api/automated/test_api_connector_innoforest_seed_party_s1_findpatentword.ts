import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IInnoforest } from "../../../../src/api/structures/connector/innoforest/IInnoforest";

export const test_api_connector_innoforest_seed_party_s1_findpatentword =
  async (connection: api.IConnection) => {
    const output: Primitive<IInnoforest.IFindpatentwordOutput> =
      await api.functional.connector.innoforest.seed.party.s1.findpatentword(
        connection,
        typia.random<IInnoforest.IFindpatentwordInput>(),
      );
    typia.assert(output);
  };
