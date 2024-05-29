import { Module } from "@nestjs/common";

import { SwaggerProvider } from "../../providers/swagger/SwaggerProvider";
import { SwaggerController } from "./SwaggerController";

@Module({
  providers: [SwaggerProvider],
  exports: [SwaggerProvider],
  controllers: [SwaggerController],
})
export class SwaggerModule {}
