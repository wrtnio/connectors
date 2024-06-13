import core, { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IGoogleSlides } from "@wrtn/connector-api/lib/structures/connector/google_slides/IGoogleSlides";

import { GoogleSlidesProvider } from "../../../providers/connector/google_slides/GoogleSlidesProvider";

@Controller("connector/google-slides")
export class GoogleSlidesController {
  constructor(private readonly googleSlideProvider: GoogleSlidesProvider) {}

  @core.TypedRoute.Post("get-presentations")
  async getPresentation() {}

  @core.TypedRoute.Post("presentations")
  async createPresentation(
    @TypedBody() input: IGoogleSlides.ICreatePresentationInput,
  ): Promise<IGoogleSlides.Presentation> {
    return this.googleSlideProvider.createPresentation(input);
  }
}
