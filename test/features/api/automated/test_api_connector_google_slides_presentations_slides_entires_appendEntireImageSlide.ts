import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGoogleSlides } from "../../../../src/api/structures/connector/google_slides/IGoogleSlides";

export const test_api_connector_google_slides_presentations_slides_entires_appendEntireImageSlide =
  async (connection: api.IConnection) => {
    const output: Primitive<IGoogleSlides.ISimplePresentationIdOutput> =
      await api.functional.connector.google_slides.presentations.slides.entires.appendEntireImageSlide(
        connection,
        typia.random<string>(),
        typia.random<IGoogleSlides.AppendEntireSlideInput>(),
      );
    typia.assert(output);
  };
