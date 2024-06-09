import core from "@nestia/core";
import { Controller, Query } from "@nestjs/common";

@Controller("connector/cafe24")
export class Cafe24Controller {
  @core.TypedRoute.Get("auth")
  async authorization(@Query() query: object) {
    console.log(query);
  }
}
