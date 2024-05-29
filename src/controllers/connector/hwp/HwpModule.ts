import { Module } from "@nestjs/common";

import { HwpProvider } from "../../../providers/connector/hwp/HwpProvider";
import { HwpController } from "./HwpController";

@Module({
  providers: [HwpProvider],
  controllers: [HwpController],
  exports: [HwpProvider],
})
export class HwpModule {}
