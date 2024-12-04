import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IX } from "../../../../src/api/structures/connector/x/IX";

export const test_api_connector_x_get_influencers_getPreDefinedInfluencers =
  async (connection: api.IConnection) => {
    const output: Primitive<Array<IX.IUserOutput>> =
      await api.functional.connector.x.get_influencers.getPreDefinedInfluencers(
        connection,
        typia.random<IX.ISecret>(),
      );
    typia.assert(output);
  };
