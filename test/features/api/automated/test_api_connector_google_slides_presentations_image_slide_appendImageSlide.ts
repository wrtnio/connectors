import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGoogleSlides } from "../../../../src/api/structures/connector/google_slides/IGoogleSlides";

export const test_api_connector_google_slides_presentations_image_slide_appendImageSlide =
  async (connection: api.IConnection) => {
    const output: Primitive<IGoogleSlides.ISimplePresentationIdOutput> =
      await api.functional.connector.google_slides.presentations.image_slide.appendImageSlide(
        connection,
        typia.random<string>(),
        typia.random<IGoogleSlides.AppendSlideInput>(),
      );
    typia.assert(output);
  };
