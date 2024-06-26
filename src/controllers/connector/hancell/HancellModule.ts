import { Module } from "@nestjs/common";

import { HancellController } from "./HancellController";

@Module({
  controllers: [HancellController],
})
export class HancellModule {}
