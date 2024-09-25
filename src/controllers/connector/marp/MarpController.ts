import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon } from "@wrtnio/decorators";

import { IMarp } from "@wrtn/connector-api/lib/structures/connector/marp/IMarp";

import { MarpProvider } from "../../../providers/connector/marp/MarpProvider";
import { retry } from "../../../utils/retry";
import { ApiTags } from "@nestjs/swagger";

@Controller("connector/marp")
export class MarpController {
  constructor(private readonly marpProvider: MarpProvider) {}

  /**
   * Convert Marp markdown to PPT and store in S3.
   *
   * @summary Convert Marp markdown to PPT
   *
   * @param input The Marp markdown string
   *
   * @returns The S3 link of the converted PPT.
   */
  @core.TypedRoute.Post("/convert-to-ppt")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/MARP_full.svg",
  )
  @ApiTags("Marp")
  async convertToPpt(
    @core.TypedBody() input: IMarp.IConvertInput,
  ): Promise<IMarp.IConvertOutput> {
    return retry(() => this.marpProvider.convertToPpt(input))();
  }
}
