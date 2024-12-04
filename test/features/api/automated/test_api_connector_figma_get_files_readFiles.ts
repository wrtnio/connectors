import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IFigma } from "../../../../src/api/structures/connector/figma/IFigma";

export const test_api_connector_figma_get_files_readFiles = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IFigma.IReadFileOutput> =
    await api.functional.connector.figma.get_files.readFiles(
      connection,
      typia.random<IFigma.IReadFileInput>(),
    );
  typia.assert(output);
};
