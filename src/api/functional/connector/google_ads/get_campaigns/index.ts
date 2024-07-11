/**
 * @packageDocumentation
 * @module api.functional.connector.google_ads.get_campaigns
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection, Primitive, Resolved } from "@nestia/fetcher";
import { NestiaSimulator } from "@nestia/fetcher/lib/NestiaSimulator";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia from "typia";

import type { IGoogleAds } from "../../../../structures/connector/google_ads/IGoogleAds";

/**
 * 구글 고객 계정의 캠페인 목록을 가져와요
 *
 * @param input 고객 정보
 * @summary 캠페인 목록을 조회합니다
 * @returns 캠페인 목록
 *
 * @controller GoogleAdsController.getCampaigns
 * @path POST /connector/google-ads/get-campaigns
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function getCampaigns(
  connection: IConnection,
  input: getCampaigns.Input,
): Promise<getCampaigns.Output> {
  return !!connection.simulate
    ? getCampaigns.simulate(connection, input)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...getCampaigns.METADATA,
          template: getCampaigns.METADATA.path,
          path: getCampaigns.path(),
        },
        input,
      );
}
export namespace getCampaigns {
  export type Input = Primitive<IGoogleAds.IGetCampaignsInput>;
  export type Output = Primitive<IGoogleAds.IGetCampaignsOutput>;

  export const METADATA = {
    method: "POST",
    path: "/connector/google-ads/get-campaigns",
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

  export const path = () => "/connector/google-ads/get-campaigns";
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<Primitive<IGoogleAds.IGetCampaignsOutput>> =>
    typia.random<Primitive<IGoogleAds.IGetCampaignsOutput>>(g);
  export const simulate = (
    connection: IConnection,
    input: getCampaigns.Input,
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
