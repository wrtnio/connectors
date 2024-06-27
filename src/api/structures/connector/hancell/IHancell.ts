import { IExcel } from "../excel/IExcel";

export namespace IHancell {
  export interface IInsertRowsInput extends IReadHancellInput {
    sheetName: string;

    cells: Cells;
  }

  export interface IInsertRowsOutput {
    fileUrl: string;
  }

  /**
   * @title 한셀 읽기 조건
   */
  export type IReadHancellInput = Pick<IExcel.IReadExcelInput, "fileUrl">;

  /**
   * @title 한셀 읽기 응답
   */
  export type IReadHancellOutput = {
    [sheetName: string]: Cells;
  };

  export type Cells = {
    [K: string]: any;
  };
}
