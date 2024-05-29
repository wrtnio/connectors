import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon } from "@wrtn/decorators";

import { IHwp } from "@wrtn/connector-api/lib/structures/connector/hwp/IHwp";

import { HwpProvider } from "../../../providers/connector/hwp/HwpProvider";

@Controller("connector/hwp")
export class HwpController {
  constructor(private readonly hwpProvider: HwpProvider) {}

  /**
   * hwp 파일을 파싱합니다.
   *
   * @summary Hwp 파일 파싱
   *
   * @param input 파싱할 hwp 파일
   *
   * @returns 파싱된 hwp 파일 텍스트 데이터.
   *
   * @tag Hwp 한글 워드 프로세서
   */
  @core.TypedRoute.Post("/parse")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/light/hwp.svg",
  )
  async parseHwp(
    @core.TypedBody() input: IHwp.IParseInput,
  ): Promise<IHwp.IParseOutput> {
    return await this.hwpProvider.parseHwp(input);
  }
}
