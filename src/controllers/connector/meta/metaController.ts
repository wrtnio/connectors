import core from "@nestia/core";
import { Controller, Query } from "@nestjs/common";

@Controller("connector/meta")
export class MetaController {
  @core.TypedRoute.Get("auth")
  async authorization(@Query() query: { code: string; state: string }) {
    const authorizationCode = query.code;
  }
}
