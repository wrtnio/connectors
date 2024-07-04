/**
 * @packageDocumentation
 * @module api.functional.connector.kakao_talk
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection, Primitive, Resolved } from "@nestia/fetcher";
import { NestiaSimulator } from "@nestia/fetcher/lib/NestiaSimulator";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia from "typia";

import type { Try } from "../../../../utils/createResponseForm";
import type { IKakaoTalk } from "../../../structures/connector/kakao_talk/IKakaoTalk";

export * as message from "./message";
export * as memo from "./memo";
export * as calendars from "./calendars";
export * as get_friends from "./get_friends";
export * as get_events from "./get_events";
export * as get_calendars from "./get_calendars";
export * as auth from "./auth";

/**
 * 카카오톡 액세스 토큰 갱신.
 *
 * @internal
 * @param input Refresh를 위한 요청 DTO.
 *
 * @controller KakaoTalkController.refresh
 * @path POST /connector/kakao-talk/refresh
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function refresh(
  connection: IConnection,
  input: refresh.Input,
): Promise<refresh.Output> {
  return !!connection.simulate
    ? refresh.simulate(connection, input)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...refresh.METADATA,
          template: refresh.METADATA.path,
          path: refresh.path(),
        },
        input,
      );
}
export namespace refresh {
  export type Input = Primitive<IKakaoTalk.IRefreshAccessTokenInput>;
  export type Output = Primitive<Try<IKakaoTalk.IRefreshAccessTokenOutput>>;

  export const METADATA = {
    method: "POST",
    path: "/connector/kakao-talk/refresh",
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

  export const path = () => "/connector/kakao-talk/refresh";
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<Primitive<Try<IKakaoTalk.IRefreshAccessTokenOutput>>> =>
    typia.random<Primitive<Try<IKakaoTalk.IRefreshAccessTokenOutput>>>(g);
  export const simulate = (
    connection: IConnection,
    input: refresh.Input,
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
