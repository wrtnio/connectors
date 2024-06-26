/**
 * @packageDocumentation
 * @module api.functional.connector.kakao_talk.message.text
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection, Primitive, Resolved } from "@nestia/fetcher";
import { NestiaSimulator } from "@nestia/fetcher/lib/NestiaSimulator";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia from "typia";

import type { IKakaoTalk } from "../../../../../structures/connector/kakao_talk/IKakaoTalk";

/**
 * 친구에게 메시지를 카카오톡 메시지를 보냅니다
 *
 * @summary 카카오톡 친구에게 메시지 쓰기
 * @param input 메시지를 보내기 위한 조건
 * @returns 응답 및 실패 정보
 * @tag 카카오톡
 *
 * @controller KakaoTalkController.send
 * @path POST /connector/kakao-talk/message/text
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function send(
  connection: IConnection,
  input: send.Input,
): Promise<send.Output> {
  return !!connection.simulate
    ? send.simulate(connection, input)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...send.METADATA,
          template: send.METADATA.path,
          path: send.path(),
        },
        input,
      );
}
export namespace send {
  export type Input = Primitive<IKakaoTalk.ISendKakaoTalkToFriendsInput>;
  export type Output = Primitive<IKakaoTalk.ISendKakaoTalkToFriendsOutput>;

  export const METADATA = {
    method: "POST",
    path: "/connector/kakao-talk/message/text",
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

  export const path = () => "/connector/kakao-talk/message/text";
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<Primitive<IKakaoTalk.ISendKakaoTalkToFriendsOutput>> =>
    typia.random<Primitive<IKakaoTalk.ISendKakaoTalkToFriendsOutput>>(g);
  export const simulate = (
    connection: IConnection,
    input: send.Input,
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
