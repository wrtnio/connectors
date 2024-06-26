/**
 * @packageDocumentation
 * @module api.functional.connector.kakao_talk.calendars.events
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection, Primitive, Resolved } from "@nestia/fetcher";
import { NestiaSimulator } from "@nestia/fetcher/lib/NestiaSimulator";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia from "typia";

import type { IKakaoTalk } from "../../../../../structures/connector/kakao_talk/IKakaoTalk";

/**
 * 카카오톡 캘린더에 일정을 추가합니다.
 *
 * @summary 카카오톡 캘린더 일정 추가.
 * @param input 일정 생성을 위한 입력 DTO.
 * @returns 생성된 일정 ID DTO.
 * @tag 카카오톡
 *
 * @controller KakaoTalkController.createEvent
 * @path POST /connector/kakao-talk/calendars/events
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function createEvent(
  connection: IConnection,
  input: createEvent.Input,
): Promise<createEvent.Output> {
  return !!connection.simulate
    ? createEvent.simulate(connection, input)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...createEvent.METADATA,
          template: createEvent.METADATA.path,
          path: createEvent.path(),
        },
        input,
      );
}
export namespace createEvent {
  export type Input = Primitive<IKakaoTalk.ICreateEventInput>;
  export type Output = Primitive<IKakaoTalk.ICreateEventOutput>;

  export const METADATA = {
    method: "POST",
    path: "/connector/kakao-talk/calendars/events",
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

  export const path = () => "/connector/kakao-talk/calendars/events";
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<Primitive<IKakaoTalk.ICreateEventOutput>> =>
    typia.random<Primitive<IKakaoTalk.ICreateEventOutput>>(g);
  export const simulate = (
    connection: IConnection,
    input: createEvent.Input,
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
