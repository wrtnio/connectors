import { Module } from "@nestjs/common";
import { CsvController } from "./CsvController";
import { CsvProvider } from "../../../providers/connector/csv/CsvProvider";
import { AwsModule } from "../aws/AwsModule";

@Module({
  imports: [AwsModule],
  controllers: [CsvController],
  providers: [CsvProvider],
})
export class CsvModule {}
