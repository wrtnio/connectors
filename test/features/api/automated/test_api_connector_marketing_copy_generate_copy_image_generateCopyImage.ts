import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type {
  IMarketingCopyGenerator,
  IMarketingCopyImage,
} from "../../../../src/api/structures/connector/marketing/IMarketingCopyGenerator";

export const test_api_connector_marketing_copy_generate_copy_image_generateCopyImage =
  async (connection: api.IConnection) => {
    const output: Primitive<IMarketingCopyImage> =
      await api.functional.connector.marketing_copy.generate_copy_image.generateCopyImage(
        connection,
        typia.random<IMarketingCopyGenerator.IGenerateMarketingCopyImageInput>(),
      );
    typia.assert(output);
  };
