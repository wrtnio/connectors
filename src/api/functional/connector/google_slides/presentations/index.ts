/**
 * @packageDocumentation
 * @module api.functional.connector.google_slides.presentations
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection, Primitive, Resolved } from "@nestia/fetcher";
import { NestiaSimulator } from "@nestia/fetcher/lib/NestiaSimulator";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia from "typia";

import type { Try } from "../../../../../utils/createResponseForm";
import type { IGoogleSlides } from "../../../../structures/connector/google_slides/IGoogleSlides";

export * as $export from "./$export";
export * as image_slide from "./image_slide";

/**
 * Google Slides 프레젠테이션을 생성합니다.
 *
 * @summary Google Slides 프레젠테이션 생성.
 * @param input 프레젠테이션을 만들기 위한 조건 DTO.
 * @returns 생성된 프레젠테이션 정보 DTO.
 *
 * @controller GoogleSlidesController.createPresentation
 * @path POST /connector/google-slides/presentations
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function createPresentation(
  connection: IConnection,
  input: createPresentation.Input,
): Promise<createPresentation.Output> {
  return !!connection.simulate
    ? createPresentation.simulate(connection, input)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...createPresentation.METADATA,
          template: createPresentation.METADATA.path,
          path: createPresentation.path(),
        },
        input,
      );
}
export namespace createPresentation {
  export type Input = Primitive<IGoogleSlides.ICreatePresentationInput>;
  export type Output = Primitive<Try<IGoogleSlides.Presentation>>;

  export const METADATA = {
    method: "POST",
    path: "/connector/google-slides/presentations",
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

  export const path = () => "/connector/google-slides/presentations";
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<Primitive<Try<IGoogleSlides.Presentation>>> =>
    typia.random<Primitive<Try<IGoogleSlides.Presentation>>>(g);
  export const simulate = (
    connection: IConnection,
    input: createPresentation.Input,
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
