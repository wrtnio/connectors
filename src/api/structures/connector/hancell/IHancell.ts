import { IExcel } from "../excel/IExcel";

export namespace IHancell {
  export interface IUpsertSheetInput extends IReadHancellInput {
    /**
     * @title Sheet name
     * @description If the sheet does not exist, it will be added, and if it does exist, it will be modified.
     */
    sheetName: string;

    /**
     * @title Sheet Information
     * @description Information contained in each cell of the sheet.
     */
    cells: Cells;
  }

  export interface IUpsertSheetOutput {
    /**
     * @title New Hansel File Link
     */
    fileUrl: string;
  }

  /**
   * @title Hansel reading conditions
   */
  export type IReadHancellInput = Pick<IExcel.IReadExcelInput, "fileUrl">;

  /**
   * @title Hansel Read Response
   */
  export type IReadHancellOutput = {
    [sheetName: string]: Cells;
  };

  /**
   * @Todo cell type needs to be specified
   */
  // export type CellName = string & tags.Pattern<"/^[A-Z]+[1-9][0-9]*$/">;

  /**
   * @title Information contained in the cell
   */
  export type Cells = Record<string, string | number>;
}
