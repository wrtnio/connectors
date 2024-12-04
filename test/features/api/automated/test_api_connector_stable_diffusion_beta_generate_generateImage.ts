import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IStableDiffusionBeta } from "../../../../src/api/structures/connector/stable_diffustion_beta/IStableDiffusionBeta";

export const test_api_connector_stable_diffusion_beta_generate_generateImage =
  async (connection: api.IConnection) => {
    const output: Primitive<IStableDiffusionBeta.IResponse> =
      await api.functional.connector.stable_diffusion_beta.generate.generateImage(
        connection,
        typia.random<IStableDiffusionBeta.IRequest>(),
      );
    typia.assert(output);
  };
