/**
 * @packageDocumentation
 * @module api.functional.connector.prompt
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection, Primitive, Resolved } from "@nestia/fetcher";
import { NestiaSimulator } from "@nestia/fetcher/lib/NestiaSimulator";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia from "typia";

import type { IPrompt } from "../../../structures/connector/prompt/IPrompt";

/**
 * @controller PromptController.generate
 * @path POST /connector/prompt/generate
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function generate(
  connection: IConnection,
  input: generate.Input,
): Promise<generate.Output> {
  return !!connection.simulate
    ? generate.simulate(connection, input)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...generate.METADATA,
          path: generate.path(),
        },
        input,
      );
}
export namespace generate {
  export type Input = Primitive<IPrompt.IRequest>;
  export type Output = Primitive<IPrompt.IResponse>;

  export const METADATA = {
    method: "POST",
    path: "/connector/prompt/generate",
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

  export const path = () => "/connector/prompt/generate";
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<Primitive<IPrompt.IResponse>> =>
    typia.random<Primitive<IPrompt.IResponse>>(g);
  export const simulate = (
    connection: IConnection,
    input: generate.Input,
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
