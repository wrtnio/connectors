import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon } from "@wrtnio/decorators";

import { IExcel } from "@wrtn/connector-api/lib/structures/connector/excel/IExcel";

import { ApiTags } from "@nestjs/swagger";
import { ExcelProvider } from "../../../providers/connector/excel/ExcelProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/excel")
export class ExcelController {
  constructor(private readonly excelProvider: ExcelProvider) {}
  /**
   * Based on the input file information, the headers of the corresponding Excel file are retrieved
   *
   * @summary Get the headers in the Excel file
   * @param {string[]} input
   */
  @core.TypedRoute.Post("read/headers")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/light/excel.svg",
  )
  @ApiTags("Excel")
  async readHeaders(
    @core.TypedBody() input: IExcel.IReadExcelInput,
  ): Promise<string[]> {
    return retry(() => this.excelProvider.readHeaders(input))();
  }

  /**
   * Get the contents of the corresponding Excel file based on the input file information
   *
   * @summary Get the contents of the Excel file
   * @param input Information on the Excel file to get the contents
   */
  @core.TypedRoute.Post("read")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/light/excel.svg",
  )
  @ApiTags("Excel")
  async read(
    @core.TypedBody() input: IExcel.IReadExcelInput,
  ): Promise<IExcel.IReadExcelOutput> {
    const workbook = await this.excelProvider.getExcelFile(input);
    const option = { workbook, sheetName: input.sheetName };
    return retry(() => this.excelProvider.getExcelData(option))();
  }

  /**
   * Get a list of Excel worksheets that exist in the input file url
   *
   * @summary Get a list of Excel worksheets
   * @param input The url of the Excel file from which to get the list of worksheets
   * @returns A list of Excel worksheets.
   */
  @core.TypedRoute.Post("worksheet")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/light/excel.svg",
  )
  @ApiTags("Excel")
  async worksheetList(
    @core.TypedBody() input: IExcel.IGetWorksheetListInput,
  ): Promise<IExcel.IWorksheetListOutput> {
    return retry(() => this.excelProvider.readSheets(input))();
  }

  /**
   * Upload an Excel file to add data to the file
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
   * It is a connector that allows users to upload files by drag and drop.
   *
   * @summary Create Excel and add data by uploading Excel files
   * @param input Information for adding new data to Excel files
   */
  @core.TypedRoute.Post("rows/upload")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/light/excel.svg",
  )
  @ApiTags("Excel")
  async insertRowsByUpload(
    @core.TypedBody() input: IExcel.IInsertExcelRowByUploadInput,
  ): Promise<IExcel.IExportExcelFileOutput> {
    return this.excelProvider.insertRows(input);
  }

  /**
   * Add data to the Excel file with an Excel file link
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
   * A connector that allows you to update a file without uploading it if you know the link to the file in the previous utterance, or if you receive a file link in the utterance from the user.
   *
   * Since a link to the Excel file generated immediately after the Excel file is generated, calling this connector is more advantageous in terms of user experience than adding data through upload.
   *
   * @summary 엑셀 파일 링크를 가지고 액셀 생성 및 데이터 추가
   * @param input 엑셀 파일에 새로운 데이터를 추가 하기 위한 정보
   */
  @core.TypedRoute.Post("rows")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/light/excel.svg",
  )
  @ApiTags("Excel")
  async insertRows(
    @core.TypedBody() input: IExcel.IInsertExcelRowInput,
  ): Promise<IExcel.IExportExcelFileOutput> {
    return this.excelProvider.insertRows(input);
  }

  /**
   * Add Excel files and sheet
   *
   * Create an Excel file and get the link back.
   * You can also forward this link to the following connector to reflect further modifications.
   * When creating a sheet with this feature, the default name 'Sheet1' is created if the sheet name is not provided.
   *
   * @deprecated
   *
   * @summary Add Excel files and sheet
   */
  @core.TypedRoute.Post()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/light/excel.svg",
  )
  @ApiTags("Excel")
  async createSheets(
    @core.TypedBody() input: IExcel.ICreateSheetInput,
  ): Promise<IExcel.IExportExcelFileOutput> {
    return retry(() => this.excelProvider.createSheets(input))();
  }
}
