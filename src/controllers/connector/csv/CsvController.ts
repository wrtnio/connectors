import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, SelectBenchmark } from "@wrtnio/decorators";

import { ICsv } from "@wrtn/connector-api/lib/structures/connector/csv/ICsv";

import { ApiTags } from "@nestjs/swagger";
import { CsvProvider } from "../../../providers/connector/csv/CsvProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/csv")
export class CsvController {
  constructor(private readonly csvProvider: CsvProvider) {}

  /**
   * Read CSV file contents
   *
   * @summary Read CSV file
   * @param input Information for reading CSV file
   * @returns CSV file contents.
   */
  @SelectBenchmark("CSV 파일 좀 읽어줘")
  @SelectBenchmark("CSV 좀 읽어줘")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/CSV_full.svg",
  )
  @core.TypedRoute.Post("read")
  @ApiTags("CSV")
  async read(
    @core.TypedBody() input: ICsv.IReadInput,
  ): Promise<ICsv.IReadOutput> {
    return retry(() => this.csvProvider.read(input))();
  }

  /**
   * Create a CSV file
   *
   * @summary Create a CSV file
   * @param input Information to create a CSV file
   */
  @SelectBenchmark("CSV 파일 좀 만들어줘")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/CSV_full.svg",
  )
  @core.TypedRoute.Post("write")
  @ApiTags("CSV")
  async write(
    @core.TypedBody() input: ICsv.IWriteInput,
  ): Promise<ICsv.IWriteOutput> {
    return retry(() => this.csvProvider.write(input))();
  }

  /**
   * Convert CSV file to Excel file.
   *
   * @summary Convert CSV file to Excel file
   * @param input Information to convert CSV file to Excel file
   * @returns excel file url
   */
  @SelectBenchmark("CSV 파일 엑셀로 변환해줘")
  @core.TypedRoute.Post("csv-to-excel")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/CSV_full.svg",
  )
  @ApiTags("CSV")
  async csvToExcel(
    @core.TypedBody() input: ICsv.ICsvToExcelInput,
  ): Promise<ICsv.ICsvToExcelOutput> {
    return retry(() => this.csvProvider.convertCsvToExcel(input))();
  }
}
