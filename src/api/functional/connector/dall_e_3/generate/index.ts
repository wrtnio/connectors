/**
 * @packageDocumentation
 * @module api.functional.connector.dall_e_3.generate
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection, Primitive, Resolved } from "@nestia/fetcher";
import { NestiaSimulator } from "@nestia/fetcher/lib/NestiaSimulator";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia from "typia";

import type { IDallE3 } from "../../../../structures/connector/dall_e_3/IDallE3";

/**
 * dall-e-3 모델을 이용하여 이미지를 생성합니다.
 *
 * @summary dall-e-3 이미지 생성기 노드
 * @param input 이미지 생성을 위한 정보
 * @returns 생성된 이미지 URL
 *
 * @controller DallE3Controller.generateImage
 * @path POST /connector/dall-e-3/generate
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function generateImage(
  connection: IConnection,
  input: generateImage.Input,
): Promise<generateImage.Output> {
  return !!connection.simulate
    ? generateImage.simulate(connection, input)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...generateImage.METADATA,
          template: generateImage.METADATA.path,
          path: generateImage.path(),
        },
        input,
      );
}
export namespace generateImage {
  export type Input = Primitive<IDallE3.IRequest>;
  export type Output = Primitive<IDallE3.IResponse>;

  export const METADATA = {
    method: "POST",
    path: "/connector/dall-e-3/generate",
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

  export const path = () => "/connector/dall-e-3/generate";
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<Primitive<IDallE3.IResponse>> =>
    typia.random<Primitive<IDallE3.IResponse>>(g);
  export const simulate = (
    connection: IConnection,
    input: generateImage.Input,
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
