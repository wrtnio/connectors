import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { ApiTags } from "@nestjs/swagger";
import { IAISearch } from "@wrtn/connector-api/lib/structures/connector/ai_search/IAISearch";
import { AISearchProvider } from "../../../providers/connector/ai_search/AISearchProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/ai-search")
export class AISearchController {
  constructor(private readonly aiSearchProvider: AISearchProvider) {}
  /**
   * Returns search results via AI search
   *
   * @summary AI search
   * @hidden
   * @param input Conditions required for search
   * @returns
   */
  @ApiTags("AI Search")
  @core.TypedRoute.Post("")
  // @RouteIcon(
  //   "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleMap_full.svg",
  // )
  async search(@core.TypedBody() input: IAISearch.IRequest): Promise<any> {
    return retry(() => this.aiSearchProvider.search(input))();
  }
}
