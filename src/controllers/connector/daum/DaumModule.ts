import { Module } from "@nestjs/common";
import { DaumController } from "./DaumController";

@Module({
  controllers: [DaumController],
  providers: [],
})
export class DaumModule {}
