import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IRanker } from "@wrtn/connector-api/lib/structures/connector/sort/IRanker";

import { RankerProvider } from "../../../providers/connector/sort/RankerProvider";
import { Try, createResponseForm } from "../../../utils/createResponseForm";

@Controller("connector/rank")
export class RankController {
  constructor(private ranker: RankerProvider) {}

  /**
   * 주어진 아이템의 배열을 점수가 높은 순서대로 정렬합니다.
   *
   * @summary 조건 정렬
   *
   * @param input 정렬할 후보 정보
   *
   * @returns 정렬된 후보의 인덱스 배열
   *
   * @tag Sort Rank Ranking 정렬 순위 순서 랭킹 랭크
   */
  @core.TypedRoute.Post("rank")
  async rank(
    @core.TypedBody()
    input: IRanker.IRankInput,
  ): Promise<Try<IRanker.IRankOutput>> {
    const data = this.ranker.sortByRank(input);
    return createResponseForm(data);
  }
}
