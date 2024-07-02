/**
 * @packageDocumentation
 * @module api.functional.connector.hancell.sheet
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection, Primitive, Resolved } from "@nestia/fetcher";
import { NestiaSimulator } from "@nestia/fetcher/lib/NestiaSimulator";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia from "typia";

import type { IHancell } from "../../../../structures/connector/hancell/IHancell";

/**
 * 한셀 시트를 수정합니다.
 *
 * 만약 시트가 이미 존재한다면 시트를 수정하고 기존에 없던 시트라면 추가합니다.
 *
 * @summary 한셀 수정
 * @param input 수정할 한셀 정보
 * @returns 수정 후 새로 만들어진 파일 링크
 *
 * @controller HancellController.upsertSheet
 * @path POST /connector/hancell/sheet
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function upsertSheet(
  connection: IConnection,
  input: upsertSheet.Input,
): Promise<upsertSheet.Output> {
  return !!connection.simulate
    ? upsertSheet.simulate(connection, input)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...upsertSheet.METADATA,
          template: upsertSheet.METADATA.path,
          path: upsertSheet.path(),
        },
        input,
      );
}
export namespace upsertSheet {
  export type Input = Primitive<IHancell.IUpsertSheetInput>;
  export type Output = Primitive<IHancell.IUpsertSheetOutput>;

  export const METADATA = {
    method: "POST",
    path: "/connector/hancell/sheet",
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

  export const path = () => "/connector/hancell/sheet";
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<Primitive<IHancell.IUpsertSheetOutput>> =>
    typia.random<Primitive<IHancell.IUpsertSheetOutput>>(g);
  export const simulate = (
    connection: IConnection,
    input: upsertSheet.Input,
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
