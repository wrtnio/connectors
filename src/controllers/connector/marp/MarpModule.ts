import { Module } from "@nestjs/common";

import { MarpProvider } from "../../../providers/connector/marp/MarpProvider";
import { MarpController } from "./MarpController";

@Module({
  providers: [MarpProvider],
  controllers: [MarpController],
  exports: [MarpProvider],
})
export class MarpModule {}
