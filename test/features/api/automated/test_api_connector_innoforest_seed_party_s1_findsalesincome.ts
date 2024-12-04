import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IInnoforest } from "../../../../src/api/structures/connector/innoforest/IInnoforest";

export const test_api_connector_innoforest_seed_party_s1_findsalesincome =
  async (connection: api.IConnection) => {
    const output: Primitive<IInnoforest.IFindsalesincomeOutput> =
      await api.functional.connector.innoforest.seed.party.s1.findsalesincome(
        connection,
        typia.random<IInnoforest.IFindsalesincomeInput>(),
      );
    typia.assert(output);
  };
