import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IFigma } from "../../../../src/api/structures/connector/figma/IFigma";

export const test_api_connector_figma_get_projects_getProjects = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IFigma.IGetProejctOutput> =
    await api.functional.connector.figma.get_projects.getProjects(
      connection,
      typia.random<IFigma.IGetProjectInput>(),
    );
  typia.assert(output);
};
