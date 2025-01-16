import { Module } from "@nestjs/common";

import { ExcelController } from "./ExcelController";

@Module({
  imports: [],
  controllers: [ExcelController],
  providers: [],
  exports: [],
})
export class ExcelModule {}
