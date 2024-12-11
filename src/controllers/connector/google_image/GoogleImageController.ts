import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { ApiTags } from "@nestjs/swagger";
import { retry } from "../../../utils/retry";
import { IGoogleImage } from "@wrtn/connector-api/lib/structures/connector/google_image/IGoogleImage";
import { GoogleImageProvider } from "../../../providers/google_image/GoogleImageProvider";

@Controller("connector/google-image")
export class GoogleImageController {
  constructor(private readonly googleImageProvider: GoogleImageProvider) {}

  /**
   * Search Google for images based on the search terms you enter
   *
   * @summary Search Google Image
   * @param input
   * @returns
   */
  @core.TypedRoute.Post("")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleImage_full.svg",
  )
  @ApiTags("Google Image")
  async search(
    @core.TypedBody() input: IGoogleImage.IRequest,
  ): Promise<IGoogleImage.IResponse[]> {
    return retry(() => this.googleImageProvider.search(input))();
  }
}
