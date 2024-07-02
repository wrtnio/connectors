import { TypedBody, TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtn/decorators";

import { IKakaoMap } from "@wrtn/connector-api/lib/structures/connector/kakao_map/IKakaoMap";

import { KakaoMapProvider } from "../../../providers/connector/kakao_map/KakaoMapProvider";

@Controller("connector/kakao-map")
export class KakaoMapController {
  /**
   * 카카오맵으로 검색합니다
   *
   * @summary 카카오 맵 검색
   *
   * @param input 검색 조건
   * @returns 검색 결과
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/kakao-map.svg",
  )
  @TypedRoute.Post("search")
  async search(
    @TypedBody()
    input: IKakaoMap.SearchByKeywordInput,
  ): Promise<IKakaoMap.SearchByKeywordOutput> {
    return KakaoMapProvider.searchByKeyword(input);
  }
}
