import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { retry } from "../../../utils/retry";
import { AISearchProvider } from "../../../providers/connector/ai_search/AISearchProvider";
import { IAISearch } from "@wrtn/connector-api/lib/structures/connector/ai_search/IAISearch";

@Controller("connector/ai-search")
export class AISearchController {
  constructor(private readonly aiSearchProvider: AISearchProvider) {}
  @core.TypedRoute.Post("")
  // @RouteIcon(
  //   "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleMap_full.svg",
  // )
  async search(@core.TypedBody() input: IAISearch.IRequest): Promise<any> {
    return this.aiSearchProvider.search(input);
  }
}
