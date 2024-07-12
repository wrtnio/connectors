import { Module } from "@nestjs/common";
import { CsvController } from "./CsvController";

@Module({
  controllers: [CsvController],
  providers: [],
})
export class CsvModule {}
