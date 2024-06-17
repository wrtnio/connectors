/**
 * @packageDocumentation
 * @module api.functional.connector.notion.get_page_by_title
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection, Primitive, Resolved } from "@nestia/fetcher";
import { NestiaSimulator } from "@nestia/fetcher/lib/NestiaSimulator";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia from "typia";

import type { INotion } from "../../../../structures/connector/notion/INotion";

/**
 * Get Page By Title.
 *
 * @param input page title
 * @returns Page Output
 * @tag Notion
 *
 * @controller NotionController.getPageByTitle
 * @path POST /connector/notion/get-page-by-title
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function getPageByTitle(
  connection: IConnection,
  input: getPageByTitle.Input,
): Promise<getPageByTitle.Output> {
  return !!connection.simulate
    ? getPageByTitle.simulate(connection, input)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...getPageByTitle.METADATA,
          path: getPageByTitle.path(),
        },
        input,
      );
}
export namespace getPageByTitle {
  export type Input = Primitive<INotion.IFindPageOrDatabaseItemInput>;
  export type Output = Primitive<INotion.IFindPageByTitleOutput>;

  export const METADATA = {
    method: "POST",
    path: "/connector/notion/get-page-by-title",
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

  export const path = () => "/connector/notion/get-page-by-title";
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<Primitive<INotion.IFindPageByTitleOutput>> =>
    typia.random<Primitive<INotion.IFindPageByTitleOutput>>(g);
  export const simulate = (
    connection: IConnection,
    input: getPageByTitle.Input,
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
