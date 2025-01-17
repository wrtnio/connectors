import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, SelectBenchmark } from "@wrtnio/decorators";

import { ApiTags } from "@nestjs/swagger";
import { IGoogleImage } from "@wrtn/connector-api/lib/structures/connector/google_image/IGoogleImage";
import { GoogleImageProvider } from "../../../providers/google_image/GoogleImageProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/google-image")
export class GoogleImageController {
  constructor(private readonly googleImageProvider: GoogleImageProvider) {}

  /**
   * Search Google for images based on the search terms you enter
   *
   * @summary Search Google Image
   * @param input Image Search conditions
   * @returns Image search results
   */
  @SelectBenchmark("구글에서 이미지 좀 검색해줘")
  @core.TypedRoute.Patch("")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icons/google_search_image.svg",
  )
  @ApiTags("Google Image")
  async search(
    @core.TypedBody() input: IGoogleImage.IRequest,
  ): Promise<IGoogleImage.IResponse[]> {
    return retry(() => this.googleImageProvider.search(input))();
  }
}
