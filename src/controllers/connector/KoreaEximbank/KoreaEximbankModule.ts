import { Module } from "@nestjs/common";

import { KoreaEximbankController } from "./KoreaEximbankController";

@Module({
  controllers: [KoreaEximbankController],
  providers: [],
})
export class KoreaEximbankModule {}
