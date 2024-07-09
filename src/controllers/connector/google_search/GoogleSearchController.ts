import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtn/decorators";

import { IGoogleSearch } from "@wrtn/connector-api/lib/structures/connector/google_search/IGoogleSearch";

import { GoogleSearchProvider } from "../../../providers/connector/google_search/GoogleSearchProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/google-search")
export class GoogleSearchController {
  constructor(private readonly googleSearchProvider: GoogleSearchProvider) {}

  /**
   * 입력한 검색어를 구글에서 검색합니다.
   *
   * @summary 구글 검색
   *
   * @param input 구글 검색 조건
   *
   * @returns 구글 검색 결과
   */
  @Standalone()
  @core.TypedRoute.Post("")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google.svg",
  )
  async search(
    @core.TypedBody() input: IGoogleSearch.IRequest,
  ): Promise<IGoogleSearch.IResponse[]> {
    return retry(() => this.googleSearchProvider.search(input))();
  }

  /**
   * 원티드에서 채용 공고를 검색합니다.
   *
   * @summary 원티드 채용 공고 검색
   *
   * @param input 검색 조건
   *
   * @returns 원티드 채용 공고 검색 결과
   */
  @Standalone()
  @core.TypedRoute.Post("wanted")
  // @RouteIcon(
  //   "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google.svg",
  // )
  async searchForWanted(
    @core.TypedBody() input: IGoogleSearch.IRequest,
  ): Promise<IGoogleSearch.IResponse[]> {
    return retry(() => this.googleSearchProvider.searchForWanted(input))();
  }

  /**
   * 인크루트에서 채용 공고를 검색합니다.
   *
   * @summary 인크루트 채용 공고 검색
   *
   * @param input 검색 조건
   *
   * @returns 인크루트 채용 공고 검색 결과
   */
  @Standalone()
  @core.TypedRoute.Post("incruit")
  // @RouteIcon(
  //   "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google.svg",
  // )
  async searchForIncruit(
    @core.TypedBody() input: IGoogleSearch.IRequest,
  ): Promise<IGoogleSearch.IResponse[]> {
    return retry(() => this.googleSearchProvider.searchForIncruit(input))();
  }

  /**
   * 사람인에서 채용 공고를 검색합니다.
   *
   * @summary 사람인 채용 공고 검색
   *
   * @param input 검색 조건
   *
   * @returns 사람인 채용 공고 검색 결과
   */
  @Standalone()
  @core.TypedRoute.Post("saramin")
  // @RouteIcon(
  //   "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google.svg",
  // )
  async searchForSaramin(
    @core.TypedBody() input: IGoogleSearch.IRequest,
  ): Promise<IGoogleSearch.IResponse[]> {
    return retry(() => this.googleSearchProvider.searchForSaramin(input))();
  }

  /**
   * 점핏에서 채용 공고를 검색합니다.
   *
   * @summary 점핏 채용 공고 검색
   *
   * @param input 검색 조건
   *
   * @returns 점핏 채용 공고 검색 결과
   */
  @Standalone()
  @core.TypedRoute.Post("jumpit")
  // @RouteIcon(
  //   "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google.svg",
  // )
  async searchForJumpit(
    @core.TypedBody() input: IGoogleSearch.IRequest,
  ): Promise<IGoogleSearch.IResponse[]> {
    return retry(() => this.googleSearchProvider.searchForJumpit(input))();
  }

  /**
   * 커리어리에서 게시물을 검색합니다.
   *
   * @summary 커리어리 검색
   *
   * @param input 검색 조건
   *
   * @returns 커리어리 게시물 검색 결과
   */
  @Standalone()
  @core.TypedRoute.Post("careerly")
  // @RouteIcon(
  //   "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google.svg",
  // )
  async searchForCareerly(
    @core.TypedBody() input: IGoogleSearch.IRequest,
  ): Promise<IGoogleSearch.IResponse[]> {
    return retry(() => this.googleSearchProvider.searchForCareerly(input))();
  }
}
