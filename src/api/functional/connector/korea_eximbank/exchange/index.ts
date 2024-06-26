/**
 * @packageDocumentation
 * @module api.functional.connector.korea_eximbank.exchange
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection, Primitive, Resolved } from "@nestia/fetcher";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia from "typia";

import type { IKoreaEximbank } from "../../../../structures/connector/KoreaEximbank/IKoreaEximbank";

/**
 *
 * @summary 한국 수출입 은행 현재 환율 조회
 * @returns 환율 정보
 *
 * @controller KoreaEximbankController.getExchange
 * @path GET /connector/korea-eximbank/exchange
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function getExchange(
  connection: IConnection,
): Promise<getExchange.Output> {
  return !!connection.simulate
    ? getExchange.simulate(connection)
    : PlainFetcher.fetch(connection, {
        ...getExchange.METADATA,
        template: getExchange.METADATA.path,
        path: getExchange.path(),
      });
}
export namespace getExchange {
  export type Output = Primitive<IKoreaEximbank.IGetExchangeOutput>;

  export const METADATA = {
    method: "GET",
    path: "/connector/korea-eximbank/exchange",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: null,
  } as const;

  export const path = () => "/connector/korea-eximbank/exchange";
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<Primitive<IKoreaEximbank.IGetExchangeOutput>> =>
    typia.random<Primitive<IKoreaEximbank.IGetExchangeOutput>>(g);
  export const simulate = (connection: IConnection): Output => {
    return random(
      "object" === typeof connection.simulate && null !== connection.simulate
        ? connection.simulate
        : undefined,
    );
  };
}
