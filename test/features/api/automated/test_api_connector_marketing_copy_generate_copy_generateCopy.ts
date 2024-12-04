import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type {
  IMarketingCopyGenerator,
  IMarketingCopyComponents,
} from "../../../../src/api/structures/connector/marketing/IMarketingCopyGenerator";
import type { MyPartial } from "../../../../src/api/structures/types/MyPartial";

export const test_api_connector_marketing_copy_generate_copy_generateCopy =
  async (connection: api.IConnection) => {
    const output: Primitive<MyPartial<IMarketingCopyComponents>> =
      await api.functional.connector.marketing_copy.generate_copy.generateCopy(
        connection,
        typia.random<IMarketingCopyGenerator.IGenerateMarketingCopyInput>(),
      );
    typia.assert(output);
  };
