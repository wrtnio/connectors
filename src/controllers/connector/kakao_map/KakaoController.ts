import { TypedBody, TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { Standalone } from "@wrtn/decorators";

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
  @TypedRoute.Post("search")
  async search(
    @TypedBody()
    input: IKakaoMap.SearchByKeywordInput,
  ): Promise<IKakaoMap.SearchByKeywordOutput> {
    return KakaoMapProvider.searchByKeyword(input);
  }
}
