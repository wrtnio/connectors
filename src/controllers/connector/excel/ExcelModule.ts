import { Module } from "@nestjs/common";

import { ExcelController } from "./ExcelController";

import { AwsModule } from "../aws/AwsModule";

@Module({
  imports: [AwsModule],
  controllers: [ExcelController],
  providers: [],
  exports: [],
})
export class ExcelModule {}
