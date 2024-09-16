import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IRanker } from "@wrtn/connector-api/lib/structures/connector/sort/IRanker";

import { RankerProvider } from "../../../providers/connector/sort/RankerProvider";
import { RouteIcon } from "@wrtnio/decorators";

@Controller("connector/rank")
export class RankController {
  constructor(private ranker: RankerProvider) {}

  /**
   * 주어진 아이템의 배열을 점수가 높은 순서대로 정렬합니다.
   *
   * @deprecated
   *
   * @summary 조건 정렬
   *
   * @param input 정렬할 후보 정보
   *
   * @returns 정렬된 후보의 인덱스 배열
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
