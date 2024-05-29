import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon } from "@wrtn/decorators";

import { IDaum } from "@wrtn/connector-api/lib/structures/connector/daum/IDaum";

import { DaumProvider } from "../../../providers/connector/daum/DaumProvider";

@Controller("connector/daum")
export class DaumController {
  /**
   * 다음 블로그 컨텐츠를 검색합니다.
   *
   * @summary 다음 블로그 검색
   *
   * @param input 다음 블로그 검색을 위한 조건
   *
   * @tag Daum 다음 포털 사이트
   */
  @core.TypedRoute.Post("blog")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/light/daum.svg",
  )
  async searchBlog(
    @core.TypedBody() input: IDaum.ISearchDaumInput,
  ): Promise<IDaum.IBlogDaumOutput> {
    return await DaumProvider.searchBlog(input);
  }

  /**
   * 다음 카페 컨텐츠를 검색합니다.
   *
   * @summary 다음 카페 검색
   *
   * @param input 다음 카페 검색을 위한 조건
   *
   * @tag Daum 다음 포털 사이트
   */
  @core.TypedRoute.Post("cafe")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/light/daum.svg",
  )
  async searchCafe(
    @core.TypedBody() input: IDaum.ISearchDaumInput,
  ): Promise<IDaum.ICafeDaumOutput> {
    return await DaumProvider.searchCafe(input);
  }
}
