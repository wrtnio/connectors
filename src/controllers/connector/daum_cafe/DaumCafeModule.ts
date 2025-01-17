import { Module } from "@nestjs/common";
import { DaumCafeController } from "./DaumCafeController";

@Module({
  controllers: [DaumCafeController],
  providers: [],
})
export class DaumCafeModule {}
