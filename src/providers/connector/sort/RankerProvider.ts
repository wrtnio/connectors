import { Injectable } from "@nestjs/common";

import { IRanker } from "@wrtn/connector-api/lib/structures/connector/sort/IRanker";

interface IScoredItemWithIndex {
  score: number;
  index: number;
}

@Injectable()
export class RankerProvider {
  sortByRank(input: IRanker.IRankInput): IRanker.IRankOutput {
    const indices = input.items
      .map<IScoredItemWithIndex>((item, index) => ({
        score: item.score,
        index,
      }))
      .sort(rank)
      .map((item) => item.index);

    return {
      rankedIndices: indices,
    };
  }
}

function rank(a: IScoredItemWithIndex, b: IScoredItemWithIndex): number {
  // Sort by score in descending order
  return b.score - a.score;
}
