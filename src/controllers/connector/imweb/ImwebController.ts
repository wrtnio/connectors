import core, { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IImweb } from "@wrtn/connector-api/lib/structures/connector/imweb/IImweb";

@Controller("connector/imweb")
export class ImwebController {
  @core.TypedRoute.Get("auth")
  async authorization(
    @TypedBody() input: IImweb.Credential,
  ): Promise<IImweb.IGetAccessTokenOutput> {
    return null!;
  }
}
