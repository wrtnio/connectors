import core, { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { Standalone } from "@wrtn/decorators";

import { IHancell } from "@wrtn/connector-api/lib/structures/connector/hancell/IHancell";

import { HancellProvider } from "../../../providers/connector/hancell/HancellProvider";

@Controller("connector/hancell")
export class HancellController {
  /**
   * 한셀 파일을 읽습니다.
   *
   * @summary 한셀 파일 읽기
   * @param input 읽을 한셀 파일 정보
   * @returns 한셀 파일 정보
   */
  @Standalone()
  @core.TypedRoute.Post("read")
  async read(
    @TypedBody() input: IHancell.IReadHancellInput,
  ): Promise<IHancell.IReadHancellOutput> {
    return HancellProvider.getHancellData(input);
  }
}
