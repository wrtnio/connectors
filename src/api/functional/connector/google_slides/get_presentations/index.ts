/**
 * @packageDocumentation
 * @module api.functional.connector.google_slides.get_presentations
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection, Primitive, Resolved } from "@nestia/fetcher";
import { NestiaSimulator } from "@nestia/fetcher/lib/NestiaSimulator";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia from "typia";

import type { IGoogleSlides } from "../../../../structures/connector/google_slides/IGoogleSlides";

/**
 * Google Slides 프레젠테이션을 조회합니다.
 *
 * @summary Google Slides 프레젠테이션 조회.
 * @param input 프레젠테이션을 조회하기 위한 조건 DTO.
 * @returns 조회된 프레젠테이션 정보 DTO.
 *
 * @controller GoogleSlidesController.getPresentation
 * @path POST /connector/google-slides/get-presentations
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function getPresentation(
  connection: IConnection,
  input: getPresentation.Input,
): Promise<getPresentation.Output> {
  return !!connection.simulate
    ? getPresentation.simulate(connection, input)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...getPresentation.METADATA,
          template: getPresentation.METADATA.path,
          path: getPresentation.path(),
        },
        input,
      );
}
export namespace getPresentation {
  export type Input = Primitive<IGoogleSlides.IGetPresentationInput>;
  export type Output = Primitive<IGoogleSlides.Presentation>;

  export const METADATA = {
    method: "POST",
    path: "/connector/google-slides/get-presentations",
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

  export const path = () => "/connector/google-slides/get-presentations";
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<Primitive<IGoogleSlides.Presentation>> =>
    typia.random<Primitive<IGoogleSlides.Presentation>>(g);
  export const simulate = (
    connection: IConnection,
    input: getPresentation.Input,
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
