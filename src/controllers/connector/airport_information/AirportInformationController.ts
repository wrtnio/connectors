import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { retry } from "../../../utils/retry";
import { IAirportInformation } from "@wrtn/connector-api/lib/structures/connector/airport_information/IAirportInformation";
import { AirportInformationProvider } from "../../../providers/connector/airport_information/AirportInformationProvider";

@Controller("connector/airport-information")
export class AirportInformationController {
  constructor(
    private readonly airportInformationProvider: AirportInformationProvider,
  ) {}

  /**
   * 입력된 검색어를 사용하여 공항 정보를 검색합니다.
   *
   * @summary 공항 정보 검색
   *
   * @param input 공항 정보 검색을 위한 조건
   * @returns 공항 정보 검색 결과
   */
  @Standalone()
  @core.TypedRoute.Post("search")
  // @RouteIcon(
  //   "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/musinsa.svg",
  // )
  async search(
    @core.TypedBody() input: IAirportInformation.IRequest,
  ): Promise<IAirportInformation.IResponse[]> {
    return retry(() => this.airportInformationProvider.search(input))();
  }
}
