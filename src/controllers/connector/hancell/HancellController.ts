import core, { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { IHancell } from "@wrtn/connector-api/lib/structures/connector/hancell/IHancell";

import { HancellProvider } from "../../../providers/connector/hancell/HancellProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/hancell")
export class HancellController {
  constructor(private readonly hancellProvider: HancellProvider) {}

  /**
   * Modify a Hansel sheet.
   *
   * If the sheet already exists, modify it, or add it if it did not exist before.
   *
   * @summary Modify Hansel
   * @param input Hansel information to modify
   * @returns Link to the newly created file after modification
   */
  @core.TypedRoute.Post("sheet")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Hancel_full.svg",
  )
  async upsertSheet(
    @TypedBody() input: IHancell.IUpsertSheetInput,
  ): Promise<IHancell.IUpsertSheetOutput> {
    return retry(() => this.hancellProvider.upsertSheet(input))();
  }

  /**
   * Read a Hansel file.
   *
   * @summary Read a Hansel file
   * @param input Hansel file information to read
   * @returns Hansel file information
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Hancel_full.svg",
  )
  @core.TypedRoute.Post("read")
  async read(
    @TypedBody() input: IHancell.IReadHancellInput,
  ): Promise<IHancell.IReadHancellOutput> {
    return retry(() => this.hancellProvider.getHancellData(input))();
  }
}
