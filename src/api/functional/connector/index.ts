/**
 * @packageDocumentation
 * @module api.functional.connector
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection, Primitive, Resolved } from "@nestia/fetcher";
import { NestiaSimulator } from "@nestia/fetcher/lib/NestiaSimulator";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia from "typia";

import type { IRanker } from "../../structures/connector/sort/IRanker";

export * as arxiv_search from "./arxiv_search";
export * as daum from "./daum";
export * as naver from "./naver";
export * as youtube_search from "./youtube_search";
export * as typeform from "./typeform";
export * as google_scholar from "./google_scholar";
export * as csv from "./csv";
export * as notion from "./notion";
export * as extract from "./extract";
export * as marketing_copy from "./marketing_copy";
export * as aws from "./aws";
export * as student_report_generator from "./student_report_generator";
export * as rag from "./rag";
export * as hwp from "./hwp";
export * as excel from "./excel";
export * as google_docs from "./google_docs";
export * as google_sheet from "./google_sheet";
export * as google_calendar from "./google_calendar";
export * as google_drive from "./google_drive";
export * as llm from "./llm";
export * as gmail from "./gmail";
export * as tool from "./tool";
export * as chatbot from "./chatbot";
export * as figma from "./figma";
export * as zoom from "./zoom";
export * as sweet_tacker from "./sweet_tacker";
export * as kakao_talk from "./kakao_talk";
export * as imweb from "./imweb";

/**
 * 주어진 아이템의 배열을 점수가 높은 순서대로 정렬합니다.
 *
 * @summary 조건 정렬
 * @param input 정렬할 후보 정보
 * @returns 정렬된 후보의 인덱스 배열
 * @tag Sort Rank Ranking 정렬 순위 순서 랭킹 랭크
 *
 * @controller RankController.rank
 * @path POST /connector/rank/rank
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function rank(
  connection: IConnection,
  input: rank.Input,
): Promise<rank.Output> {
  return !!connection.simulate
    ? rank.simulate(connection, input)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...rank.METADATA,
          path: rank.path(),
        },
        input,
      );
}
export namespace rank {
  export type Input = Primitive<IRanker.IRankInput>;
  export type Output = Primitive<IRanker.IRankOutput>;

  export const METADATA = {
    method: "POST",
    path: "/connector/rank/rank",
    request: {
      type: "application/json",
      encrypted: false,
    },
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: null,
  } as const;

  export const path = () => "/connector/rank/rank";
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<Primitive<IRanker.IRankOutput>> =>
    typia.random<Primitive<IRanker.IRankOutput>>(g);
  export const simulate = (
    connection: IConnection,
    input: rank.Input,
  ): Output => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: path(),
      contentType: "application/json",
    });
    assert.body(() => typia.assert(input));
    return random(
      "object" === typeof connection.simulate && null !== connection.simulate
        ? connection.simulate
        : undefined,
    );
  };
}
