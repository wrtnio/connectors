import typia from "typia";

import CApi from "@wrtn/connector-api";
import { IStableDiffusionBeta } from "@wrtn/connector-api/lib/structures/connector/stable_diffustion_beta/IStableDiffusionBeta";

export const test_api_connector_stable_diffusion_beta = async (
  connection: CApi.IConnection,
) => {
  const requestBody: IStableDiffusionBeta.IRequest = {
    prompt: `손들고 있는 고양이 그려줘`,
    image_ratio: "square",
    style_preset: "digital-art",
  };
  const output =
    await CApi.functional.connector.stable_diffusion_beta.generate.generateImage(
      connection,
      requestBody,
    );
  console.log(output);
  typia.assertEquals<IStableDiffusionBeta.IResponse>(output);
};
