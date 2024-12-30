import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { IKoreaEximbank } from "@wrtn/connector-api/lib/structures/connector/korea_eximbank/IKoreaEximbank";

import { KoreaEximbankProvider } from "../../../providers/connector/korea_eximbank/KoreaEximbankProvider";
import { retry } from "../../../utils/retry";
import { ApiTags } from "@nestjs/swagger";

@Controller("connector/korea-eximbank")
export class KoreaEximbankController {
  /**
   * @summary Korea Export-Import Bank Current Exchange Rate Inquiry
   * @returns Exchange Rate Information
   *
   * @internal
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/ExchangeRate_full.svg",
  )
  @ApiTags("Korea Eximbank")
  @core.TypedRoute.Patch("exchange")
  async getExchange(): Promise<IKoreaEximbank.IGetExchangeOutput> {
    return retry(() => KoreaEximbankProvider.getExchange())();
  }
}
