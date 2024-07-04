/**
 * @packageDocumentation
 * @module api.functional.connector.kakao_talk.memo.list
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection, Primitive, Resolved } from "@nestia/fetcher";
import { NestiaSimulator } from "@nestia/fetcher/lib/NestiaSimulator";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia from "typia";

import type { Try } from "../../../../../../utils/createResponseForm";
import type { IKakaoTalk } from "../../../../../structures/connector/kakao_talk/IKakaoTalk";

/**
 * 카카오톡 내게 쓰기로 메시지를 보냅니다.
 *
 * @summary 카카오톡 내게 쓰기
 * @param input 메시지를 보내기 위한 조건
 * @returns 응답 코드
 * @tag 카카오톡
 *
 * @controller KakaoTalkController.listMemo
 * @path POST /connector/kakao-talk/memo/list
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function listMemo(
  connection: IConnection,
  input: listMemo.Input,
): Promise<listMemo.Output> {
  return !!connection.simulate
    ? listMemo.simulate(connection, input)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...listMemo.METADATA,
          template: listMemo.METADATA.path,
          path: listMemo.path(),
        },
        input,
      );
}
export namespace listMemo {
  export type Input = Primitive<IKakaoTalk.ISendKakaoTalkListInput>;
  export type Output = Primitive<Try<IKakaoTalk.IMemoOutput>>;

  export const METADATA = {
    method: "POST",
    path: "/connector/kakao-talk/memo/list",
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

  export const path = () => "/connector/kakao-talk/memo/list";
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<Primitive<Try<IKakaoTalk.IMemoOutput>>> =>
    typia.random<Primitive<Try<IKakaoTalk.IMemoOutput>>>(g);
  export const simulate = (
    connection: IConnection,
    input: listMemo.Input,
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
