import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon } from "@wrtnio/decorators";

import { IHwp } from "@wrtn/connector-api/lib/structures/connector/hwp/IHwp";

import { HwpProvider } from "../../../providers/connector/hwp/HwpProvider";
import { retry } from "../../../utils/retry";
import { ApiTags } from "@nestjs/swagger";

@Controller("connector/hwp")
export class HwpController {
  constructor(private readonly hwpProvider: HwpProvider) {}

  /**
   * Parse the hwp file.
   *
   * @summary Parse the Hwp file
   *
   * @param input The hwp file to parse
   *
   * @returns The parsed hwp file text data.
   */
  @core.TypedRoute.Post("/parse")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/HWP_full.svg",
  )
  @ApiTags("Hwp")
  async parseHwp(
    @core.TypedBody() input: IHwp.IParseInput,
  ): Promise<IHwp.IParseOutput> {
    return retry(() => this.hwpProvider.parseHwp(input))();
  }
}
