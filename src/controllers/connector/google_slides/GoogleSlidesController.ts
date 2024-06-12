import core from "@nestia/core";
import { Controller } from "@nestjs/common";

@Controller("connector/google-slides")
export class GoogleSlidesController {
  @core.TypedRoute.Post("get-presentations")
  async getPresentation() {}

  @core.TypedRoute.Post("presentations")
  async createPresentation() {}
}
