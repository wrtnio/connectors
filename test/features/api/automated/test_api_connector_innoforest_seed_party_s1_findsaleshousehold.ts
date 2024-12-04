import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IInnoforest } from "../../../../src/api/structures/connector/innoforest/IInnoforest";

export const test_api_connector_innoforest_seed_party_s1_findsaleshousehold =
  async (connection: api.IConnection) => {
    const output: Primitive<IInnoforest.IFindsaleshouseholdOutput> =
      await api.functional.connector.innoforest.seed.party.s1.findsaleshousehold(
        connection,
        typia.random<IInnoforest.IFindsaleshouseholdInput>(),
      );
    typia.assert(output);
  };
