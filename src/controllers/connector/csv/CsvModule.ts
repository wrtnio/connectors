import { Module } from "@nestjs/common";
import { CsvController } from "./CsvController";
import { AwsProvider } from "../../../providers/connector/aws/AwsProvider";
import { CsvProvider } from "../../../providers/connector/csv/CsvProvider";

@Module({
  controllers: [CsvController],
  providers: [AwsProvider, CsvProvider],
})
export class CsvModule {}
