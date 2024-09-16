import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { IGoogleScholar } from "@wrtn/connector-api/lib/structures/connector/google_scholar/IGoogleScholar";

import { GoogleScholarProvider } from "../../../providers/connector/google_scholar/GoogleScholarProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/google-scholar")
export class GoogleScholarController {
  /**
   * 구글 스콜라에 있는 논문 목록을 가져옵니다.
   *
   * @summary 구글 스콜라 논문 목록 검색
   *
   * @param input 구글 스콜라 논문 검색 조건
   *
   * @returns 구글 스콜라 논문 목록
   */
  @Standalone()
  @core.TypedRoute.Post()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleScholar_full.svg",
  )
  async search(
    @core.TypedBody() input: IGoogleScholar.ISearchInput,
  ): Promise<IGoogleScholar.ISearchOutput[]> {
    return retry(() => GoogleScholarProvider.search(input))();
  }
}
