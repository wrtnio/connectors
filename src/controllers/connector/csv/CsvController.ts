import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtn/decorators";

import { ICsv } from "@wrtn/connector-api/lib/structures/connector/csv/ICsv";

import { CsvProvider } from "../../../providers/connector/csv/CsvProvider";

@Controller("connector/csv")
export class CsvController {
  /**
   * CSV 파일 내용을 읽어옵니다.
   *
   * @summary CSV 파일 읽기
   *
   * @param input CSV 파일을 읽어 오기 위한 정보
   *
   * @returns CSV 파일 내용.
   *
   * @tag CSV 텍스트 파일 형식
   */
  @core.TypedRoute.Post("read")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/light/csv.svg",
  )
  async read(
    @core.TypedBody() input: ICsv.IReadInput,
  ): Promise<ICsv.IReadOutput> {
    return await CsvProvider.read(input);
  }

  /**
   * CSV 파일을 생성합니다.
   *
   * @summary CSV 파일 생성
   *
   * @param input CSV 파일을 생성하기 위한 정보
   *
   * @tag CSV
   */
  @Standalone()
  @core.TypedRoute.Post("write")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/light/csv.svg",
  )
  async write(
    @core.TypedBody() input: ICsv.IWriteInput,
  ): Promise<ICsv.IWriteOutput> {
    return CsvProvider.write(input);
  }

  /**
   * CSV 파일을 엑셀 파일로 변환합니다.
   *
   * @summary CSV 파일 Excel 파일 변환
   *
   * @param input CSV 파일을 엑셀 파일로 변환하기 위한 정보
   *
   * @returns excel file url
   *
   * @tag CSV
   */
  @core.TypedRoute.Post("csv-to-excel")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/light/csv.svg",
  )
  async csvToExcel(
    @core.TypedBody() input: ICsv.ICsvToExcelInput,
  ): Promise<ICsv.ICsvToExcelOutput> {
    return await CsvProvider.convertCsvToExcel(input);
  }
}
