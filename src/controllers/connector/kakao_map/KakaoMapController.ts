import { TypedBody, TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { IKakaoMap } from "@wrtn/connector-api/lib/structures/connector/kakao_map/IKakaoMap";

import { KakaoMapProvider } from "../../../providers/connector/kakao_map/KakaoMapProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/kakao-map")
export class KakaoMapController {
  /**
   * Search with Kakao Map
   *
   * In addition to the place name company, category, and phone number,
   * it also provides lot number and road name addresses in the Korean address system.
   * It can be used with public data or other address-based connectors.
   *
   * @summary Kakao Map Search
   *
   * @param input Search condition
   * @returns Search result
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/KakaoMap_full.svg",
  )
  @TypedRoute.Post("search")
  async search(
    @TypedBody()
    input: IKakaoMap.SearchByKeywordInput,
  ): Promise<IKakaoMap.SearchByKeywordOutput> {
    return retry(() => KakaoMapProvider.searchByKeyword(input))();
  }
}
