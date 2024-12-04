import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGoogleSlides } from "../../../../src/api/structures/connector/google_slides/IGoogleSlides";

export const test_api_connector_google_slides_presentations_$export_hanshow =
  async (connection: api.IConnection) => {
    const output: Primitive<IGoogleSlides.IExportHanshowOutput> =
      await api.functional.connector.google_slides.presentations.$export.hanshow(
        connection,
        typia.random<string>(),
        typia.random<IGoogleSlides.IExportPresentationInput>(),
      );
    typia.assert(output);
  };
