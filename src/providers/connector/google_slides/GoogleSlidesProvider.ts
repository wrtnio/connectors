import axios from "axios";

import { IGoogleSlides } from "@wrtn/connector-api/lib/structures/connector/google_slides/IGoogleSlides";

export namespace GoogleSlidesProvider {
  export async function createPresentation(
    input: IGoogleSlides.ICreatePresentationInput,
  ): Promise<IGoogleSlides.Presentation> {
    try {
      await axios.post(
        "https://slides.googleapis.com/v1/presentations",
        {},
        {},
      );

      return null!;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
