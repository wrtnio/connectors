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
   * 한셀 시트를 수정합니다.
   *
   * 만약 시트가 이미 존재한다면 시트를 수정하고 기존에 없던 시트라면 추가합니다.
   *
   * @summary 한셀 수정
   * @param input 수정할 한셀 정보
   * @returns 수정 후 새로 만들어진 파일 링크
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
   * 한셀 파일을 읽습니다.
   *
   * @summary 한셀 파일 읽기
   * @param input 읽을 한셀 파일 정보
   * @returns 한셀 파일 정보
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
