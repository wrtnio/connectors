import { Module } from "@nestjs/common";

import { GoogleController } from "./GoogleController";

@Module({
  controllers: [GoogleController],
})
export class GoogleModule {}
