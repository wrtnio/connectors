import { Module } from "@nestjs/common";

import { MiroController } from "./MiroController";

@Module({
  controllers: [MiroController],
  providers: [],
})
export class MiroModule {}
