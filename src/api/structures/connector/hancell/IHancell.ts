import { IExcel } from "../excel/IExcel";

export namespace IHancell {
  /**
   * @title 한셀 읽기 조건
   */
  export type IReadHancellInput = Pick<IExcel.IReadExcelInput, "fileUrl">;

  /**
   * @title 한셀 읽기 응답
   */
  export type IReadHancellOutput = {
    [sheetName: string]: CSV;
  };

  export type CSV = string;
}
