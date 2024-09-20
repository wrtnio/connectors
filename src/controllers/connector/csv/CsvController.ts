import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { ICsv } from "@wrtn/connector-api/lib/structures/connector/csv/ICsv";

import { CsvProvider } from "../../../providers/connector/csv/CsvProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/csv")
export class CsvController {
  /**
   * Read CSV file contents
   *
   * @summary Read CSV file
   * @param input Information for reading CSV file
   * @returns CSV file contents.
   */
  @core.TypedRoute.Post("read")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/CSV_full.svg",
  )
  async read(
    @core.TypedBody() input: ICsv.IReadInput,
  ): Promise<ICsv.IReadOutput> {
    return retry(() => CsvProvider.read(input))();
  }

  /**
   * Create a CSV file
   *
   * @summary Create a CSV file
   * @param input Information to create a CSV file
   */
  @Standalone()
  @core.TypedRoute.Post("write")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/CSV_full.svg",
  )
  async write(
    @core.TypedBody() input: ICsv.IWriteInput,
  ): Promise<ICsv.IWriteOutput> {
    return retry(() => CsvProvider.write(input))();
  }

  /**
   * Convert CSV file to Excel file.
   *
   * @summary Convert CSV file to Excel file
   * @param input Information to convert CSV file to Excel file
   * @returns excel file url
   */
  @core.TypedRoute.Post("csv-to-excel")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/CSV_full.svg",
  )
  async csvToExcel(
    @core.TypedBody() input: ICsv.ICsvToExcelInput,
  ): Promise<ICsv.ICsvToExcelOutput> {
    return retry(() => CsvProvider.convertCsvToExcel(input))();
  }
}
