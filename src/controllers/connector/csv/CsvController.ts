import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { ICsv } from "@wrtn/connector-api/lib/structures/connector/csv/ICsv";

import { CsvProvider } from "../../../providers/connector/csv/CsvProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/csv")
export class CsvController {
  /**
   * CSV 파일 내용을 읽어옵니다
   *
   * @summary CSV 파일 읽기
   * @param input CSV 파일을 읽어 오기 위한 정보
   * @returns CSV 파일 내용.
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
   * CSV 파일을 생성합니다
   *
   * @summary CSV 파일 생성
   * @param input CSV 파일을 생성하기 위한 정보
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
   * CSV 파일을 엑셀 파일로 변환합니다.
   *
   * @summary CSV 파일 Excel 파일 변환
   * @param input CSV 파일을 엑셀 파일로 변환하기 위한 정보
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