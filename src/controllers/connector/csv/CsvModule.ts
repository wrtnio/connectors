import { Module } from "@nestjs/common";
import { CsvController } from "./CsvController";
import { CsvProvider } from "../../../providers/connector/csv/CsvProvider";
import { AwsProvider } from "../../../providers/connector/aws/AwsProvider";

@Module({
  imports: [],
  controllers: [CsvController],
  providers: [CsvProvider],
})
export class CsvModule {}
