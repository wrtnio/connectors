import { Placeholder } from "@wrtnio/decorators";
import { tags } from "typia";
import { ContentMediaType } from "typia/lib/tags/ContentMediaType";

export namespace IExcel {
  /**
   * @title file information
   */
  export interface IReadExcelInput {
    /**
     * Excel file to read
     *
     * @title Excel file
     */
    fileUrl: string &
      tags.Format<"uri"> &
      ContentMediaType<"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">;

    /**
     * Sheet name to read
     *
     * @title sheet name
     */
    sheetName?: (string & Placeholder<"Sheet1">) | null;
  }

  /**
   * @title Read Excel row data
   */
  interface IReadExcelRowData {
    /**
     * Object where key is header name and value is value of that row
     *
     * @title Read Excel row data
     */
    [key: string]: any;
  }

  /**
   * @title Excel file reading result
   */
  export interface IReadExcelOutput {
    /**
     * @title headers of this sheet
     */
    headers: string[];

    /**
     * @title Excel sheet data
     */
    data: IReadExcelRowData[];
  }

  /**
   * @title file information
   */
  export interface IGetWorksheetListInput {
    /**
     * File to import list of Excel worksheets
     *
     * @title Excel file
     */
    fileUrl: string &
      tags.Format<"uri"> &
      ContentMediaType<"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">;
  }

  /**
   * @title List of imported worksheets
   */
  export interface IWorksheetListOutput {
    /**
     * @title sheet list data
     */
    data: {
      /**
       * Name of the imported worksheet
       *
       * @title sheet name
       */
      sheetName: string;

      /**
       * The id of the imported worksheet.
       *
       * @title sheet id
       */
      id: number;
    }[];
  }

  /**
   * @title Information for adding data
   */
  export interface IInsertExcelRowByUploadInput extends ICreateSheetInput {
    /**
     * 엑셀 행을 추가할 파일
     *
     * If you have this address, take an Excel file from that path and modify it.
     * The modified file is saved as a new link and does not modify the original file in this path.
     * If this address does not exist, create a new file immediately.
     *
     * @title 엑셀 파일
     */
    fileUrl?: string &
      tags.Format<"uri"> &
      ContentMediaType<"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">;

    /**
     * An array of objects where the key is the header name and the value is the value of the corresponding row
     *
     * @title Excel row data to add
     */
    data: Record<string, any>[];
  }

  /**
   * @title Information for adding data
   */
  export interface IInsertExcelRowInput extends ICreateSheetInput {
    /**
     * 엑셀 행을 추가할 파일
     *
     * If you have this address, take an Excel file from that path and modify it.
     * The modified file is saved as a new link and does not modify the original file in this path.
     * If this address does not exist, create a new file immediately.
     *
     * @title 엑셀 파일
     */
    fileUrl?: string & tags.Format<"iri">;

    /**
     * An array of objects where the key is the header name and the value is the value of the corresponding row
     *
     * @title Excel row data to add
     */
    data: Record<string, any>[];
  }

  export interface ICreateSheetInput {
    /**
     * Sheet name to add Excel rows to
     * If no input is entered, the first sheet is used as the default.
     *
     * @title Excel sheet name
     */
    sheetName?: (string & Placeholder<"Sheet1">) | null;
  }

  /**
   * @title Excel row addition result
   */
  export interface IExportExcelFileOutput {
    /**
     * @title Generated Excel file url
     */
    fileUrl: string &
      tags.Format<"uri"> &
      ContentMediaType<"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">;
  }
}
