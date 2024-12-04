import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGoogleSlides } from "../../../../src/api/structures/connector/google_slides/IGoogleSlides";

export const test_api_connector_google_slides_get_presentations_getPresentation =
  async (connection: api.IConnection) => {
    const output: Primitive<IGoogleSlides.ISimplePresentationIdOutput> =
      await api.functional.connector.google_slides.get_presentations.getPresentation(
        connection,
        typia.random<IGoogleSlides.IGetPresentationInput>(),
      );
    typia.assert(output);
  };
