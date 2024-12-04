import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IFigma } from "../../../../src/api/structures/connector/figma/IFigma";

export const test_api_connector_figma_get_statistics_getStatistics = async (
  connection: api.IConnection,
) => {
  const output: Primitive<Array<IFigma.IGetStatisticsOutput>> =
    await api.functional.connector.figma.get_statistics.getStatistics(
      connection,
      typia.random<IFigma.IGetProjectStatisticsInput>(),
    );
  typia.assert(output);
};
