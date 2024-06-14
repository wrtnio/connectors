import core, { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IGoogleSlides } from "@wrtn/connector-api/lib/structures/connector/google_slides/IGoogleSlides";

import { GoogleSlidesProvider } from "../../../providers/connector/google_slides/GoogleSlidesProvider";

@Controller("connector/google-slides")
export class GoogleSlidesController {
  constructor(private readonly googleSlideProvider: GoogleSlidesProvider) {}

  @core.TypedRoute.Post("get-presentations")
  async getPresentation() {}

  /**
   * Google Slides 프레젠테이션을 생성합니다.
   *
   * @summary Google Slides 프레젠테이션 생성.
   *
   * @param input 프레젠테이션을 만들기 위한 조건 DTO.
   * @returns 생성된 프레젠테이션 정보 DTO.
   */
  @core.TypedRoute.Post("presentations")
  async createPresentation(
    @TypedBody() input: IGoogleSlides.ICreatePresentationInput,
  ): Promise<IGoogleSlides.Presentation> {
    return this.googleSlideProvider.createPresentation(input);
  }
}
