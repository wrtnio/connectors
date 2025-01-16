import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { ApiTags } from "@nestjs/swagger";
import { retry } from "../../../utils/retry";
import { INaverCafe } from "@wrtn/connector-api/lib/structures/connector/naver_cafe/INaverCafe";
import { NaverCafeProvider } from "../../../providers/connector/naver_cafe/NaverCafeProvider";

@Controller("connector/naver-cafe")
export class NaverCafeController {
  /**
   * Search Naver Cafe contents
   *
   * @summary Naver Cafe search
   * @param input Conditions for Naver Cafe search
   */
  @core.TypedRoute.Patch("")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/NaverCafe_full.svg",
  )
  @ApiTags("Naver")
  async cafeList(
    @core.TypedBody() input: INaverCafe.INaverKeywordInput,
  ): Promise<INaverCafe.ICafeNaverOutput> {
    return retry(() => NaverCafeProvider.getCafe(input))();
  }
}
