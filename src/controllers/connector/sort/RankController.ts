import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IRanker } from "@wrtn/connector-api/lib/structures/connector/sort/IRanker";

import { RankerProvider } from "../../../providers/connector/sort/RankerProvider";
import { RouteIcon } from "@wrtnio/decorators";

@Controller("connector/rank")
export class RankController {
  constructor(private ranker: RankerProvider) {}

  /**
   * Sorts the given array of items in order of highest score.
   *
   * @deprecated
   *
   * @summary Sort by condition
   *
   * @param input Candidate information to sort
   *
   * @returns Array of indices of sorted candidates
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Sort_full.svg",
  )
  @core.TypedRoute.Post("rank")
  async rank(
    @core.TypedBody()
    input: IRanker.IRankInput,
  ): Promise<IRanker.IRankOutput> {
    return this.ranker.sortByRank(input);
  }
}
