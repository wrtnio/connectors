import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon } from "@wrtnio/decorators";

import { IExcel } from "@wrtn/connector-api/lib/structures/connector/excel/IExcel";

import { ExcelProvider } from "../../../providers/connector/excel/ExcelProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/excel")
export class ExcelController {
  /**
   * 입력된 파일 정보를 바탕으로 해당 엑셀 파일의 내용을 가져옵니다.
   *
   * @summary 엑셀 파일 안의 내용 가져오기
   * @param input 내용을 가져올 엑셀 파일 정보
   */
  @core.TypedRoute.Post("/read")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/light/excel.svg",
  )
  async read(
    @core.TypedBody() input: IExcel.IReadExcelInput,
  ): Promise<IExcel.IReadExcelOutput> {
    const workbook = await ExcelProvider.getExcelFile(input);
    const option = { workbook, sheetName: input.sheetName };
    return retry(() => ExcelProvider.getExcelData(option))();
  }

  /**
   * 입력된 파일 url에 존재하는 엑셀 워크 시트 목록을 가져옵니다.
   *
   * @summary 액셀 워크 시트 목록 가져오기
   * @param input 워크 시트 목록을 가져올 엑셀 파일 url
   * @returns 엑셀 워크 시트 목록.
   */
  @core.TypedRoute.Post("/worksheet")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/light/excel.svg",
  )
  async worksheetList(
    @core.TypedBody() input: IExcel.IGetWorksheetListInput,
  ): Promise<IExcel.IWorksheetListOutput> {
    return retry(() => ExcelProvider.readSheets(input))();
  }

  /**
   * 데이터를 엑셀 시트에 추가합니다.
   *
   * When adding data to Excel, sheet creation precedes if it is a sheet that does not exist yet.
   * Therefore, this feature can also be used for sheet creation.
   * If you want to create a sheet only and create an empty file without any data,
   * you just need to specify the name of the sheet without any data.
   *
   * When adding rows to an already existing sheet,
   * it is supposed to be added to the lower line, so it is recommended to check the data before adding it.
   * If you provide fileUrl, you can modify it after you work on it. After modification, the file will be issued as a new link.
   *
   * @summary 액셀 생성 및 데이터 추가
   * @param input 엑셀 파일에 새로운 데이터를 추가 하기 위한 정보
   */
  @core.TypedRoute.Post("/rows")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/light/excel.svg",
  )
  async insertRows(
    @core.TypedBody() input: IExcel.IInsertExcelRowInput,
  ): Promise<IExcel.IExportExcelFileOutput> {
    return ExcelProvider.insertRows(input);
  }

  /**
   * Add Excel files and sheet
   *
   * Create an Excel file and get the link back.
   * You can also forward this link to the following connector to reflect further modifications.
   * When creating a sheet with this feature, the default name 'Sheet1' is created if the sheet name is not provided.
   *
   * @summary Add Excel files and sheet
   */
  @core.TypedRoute.Post()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/light/excel.svg",
  )
  async createSheets(
    @core.TypedBody() input: IExcel.ICreateSheetInput,
  ): Promise<IExcel.IExportExcelFileOutput> {
    return retry(() => ExcelProvider.createSheets(input))();
  }
}
