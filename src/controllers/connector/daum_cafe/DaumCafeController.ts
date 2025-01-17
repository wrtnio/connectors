import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, SelectBenchmark } from "@wrtnio/decorators";

import { ApiTags } from "@nestjs/swagger";
import { retry } from "../../../utils/retry";
import { IDaumCafe } from "@wrtn/connector-api/lib/structures/connector/daum_cafe/IDaumCafe";
import { DaumCafeProvider } from "../../../providers/connector/daum_cafe/DaumProvider";

@Controller("connector/daum-cafe")
export class DaumCafeController {
  /**
   * Search for the following cafe content
   *
   * @summary Search for the following cafe
   * @param input Conditions for searching the following cafe
   */
  @SelectBenchmark("다음 카페 검색 해줘")
  @core.TypedRoute.Patch("")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icons/daum.svg",
  )
  @ApiTags("Daum")
  async searchCafe(
    @core.TypedBody() input: IDaumCafe.ISearchInput,
  ): Promise<IDaumCafe.ICafeOutput> {
    return retry(() => DaumCafeProvider.search(input))();
  }
}
