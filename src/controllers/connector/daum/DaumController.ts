import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon } from "@wrtnio/decorators";

import { IDaum } from "@wrtn/connector-api/lib/structures/connector/daum/IDaum";

import { ApiTags } from "@nestjs/swagger";
import { DaumProvider } from "../../../providers/connector/daum/DaumProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/daum")
export class DaumController {
  /**
   * Search the following blog content
   *
   * @summary Search the following blog
   * @param input Conditions for searching the following blog
   */
  @core.TypedRoute.Post("blog")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/DaumBlog_full.svg",
  )
  @ApiTags("Daum")
  async searchBlog(
    @core.TypedBody() input: IDaum.ISearchDaumInput,
  ): Promise<IDaum.IBlogDaumOutput> {
    return retry(() => DaumProvider.searchBlog(input))();
  }

  /**
   * Search for the following cafe content
   *
   * @summary Search for the following cafe
   * @param input Conditions for searching the following cafe
   */
  @core.TypedRoute.Post("cafe")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/DaumCafe_full.svg",
  )
  @ApiTags("Daum")
  async searchCafe(
    @core.TypedBody() input: IDaum.ISearchDaumInput,
  ): Promise<IDaum.ICafeDaumOutput> {
    return retry(() => DaumProvider.searchCafe(input))();
  }
}
