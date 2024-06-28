/**
 * @packageDocumentation
 * @module api.functional.connector.kakao_talk.memo.location
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection, Primitive, Resolved } from "@nestia/fetcher";
import { NestiaSimulator } from "@nestia/fetcher/lib/NestiaSimulator";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia from "typia";

import type { IKakaoTalk } from "../../../../../structures/connector/kakao_talk/IKakaoTalk";

/**
 * 카카오톡 내게 쓰기로 메시지를 보냅니다.
 *
 * @summary 카카오톡 내게 쓰기
 * @param input 메시지를 보내기 위한 조건
 * @returns 응답 코드
 * @tag 카카오톡
 *
 * @controller KakaoTalkController.locationMemo
 * @path POST /connector/kakao-talk/memo/location
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function locationMemo(
  connection: IConnection,
  input: locationMemo.Input,
): Promise<locationMemo.Output> {
  return !!connection.simulate
    ? locationMemo.simulate(connection, input)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...locationMemo.METADATA,
          template: locationMemo.METADATA.path,
          path: locationMemo.path(),
        },
        input,
      );
}
export namespace locationMemo {
  export type Input = Primitive<IKakaoTalk.ISendKakaoTalkLocationInput>;
  export type Output = Primitive<IKakaoTalk.IMemoOutput>;

  export const METADATA = {
    method: "POST",
    path: "/connector/kakao-talk/memo/location",
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

  export const path = () => "/connector/kakao-talk/memo/location";
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<Primitive<IKakaoTalk.IMemoOutput>> =>
    typia.random<Primitive<IKakaoTalk.IMemoOutput>>(g);
  export const simulate = (
    connection: IConnection,
    input: locationMemo.Input,
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
