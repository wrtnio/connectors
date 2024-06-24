import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IKoreaEximbank } from "@wrtn/connector-api/lib/structures/connector/korea_eximbank/IKoreaEximbank";

import { KoreaEximbankProvider } from "../../../providers/connector/korea_eximbank/KoreaEximbankProvider";

@Controller("connector/korea-eximbank")
export class KoreaEximbankController {
  /**
   * @summary 한국 수출입 은행 현재 환율 조회
   * @returns 환율 정보
   */
  @core.TypedRoute.Get("exchange")
  async getExchange(): Promise<IKoreaEximbank.IGetExchangeOutput> {
    return KoreaEximbankProvider.getExchange();
  }
}
