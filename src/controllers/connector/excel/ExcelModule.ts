import { Module } from "@nestjs/common";

import { ExcelController } from "./ExcelController";

@Module({
  controllers: [ExcelController],
  providers: [],
  exports: [],
})
export class ExcelModule {}
