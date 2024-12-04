import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGoogleSlides } from "../../../../src/api/structures/connector/google_slides/IGoogleSlides";

export const test_api_connector_google_slides_presentations_slides_landscapes_appendLandscapeImageSlide =
  async (connection: api.IConnection) => {
    const output: Primitive<IGoogleSlides.ISimplePresentationIdOutput> =
      await api.functional.connector.google_slides.presentations.slides.landscapes.appendLandscapeImageSlide(
        connection,
        typia.random<string>(),
        typia.random<IGoogleSlides.AppendLandscapeSlideInput>(),
      );
    typia.assert(output);
  };
