import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IFigma } from "../../../../src/api/structures/connector/figma/IFigma";

export const test_api_connector_figma_projects_get_canvas_getProjectCanvas =
  async (connection: api.IConnection) => {
    const output: Primitive<IFigma.IGetProjectFileOutput> =
      await api.functional.connector.figma.projects.get_canvas.getProjectCanvas(
        connection,
        typia.random<string>(),
        typia.random<IFigma.Secret>(),
      );
    typia.assert(output);
  };
