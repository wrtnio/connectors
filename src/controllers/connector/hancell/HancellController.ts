import core, { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IHancell } from "@wrtn/connector-api/lib/structures/connector/hancell/IHancell";

import { HancellProvider } from "../../../providers/connector/hancell/HancellProvider";

@Controller("connector/hancell")
export class HancellController {
  @core.TypedRoute.Post("read")
  async read(
    @TypedBody() input: IHancell.IReadHancellInput,
  ): Promise<IHancell.IReadHancellOutput> {
    return HancellProvider.getHancellData(input);
  }
}
