import { tags } from "typia";

export namespace ISpreadsheetCell {
  export namespace ISnapshot {
    export interface ICreate {
      /**
       * @title Format type of this cell
       *
       * For example, date, datetime, bool, text an so on.
       * If you want add new type, please discuss within our team.
       */
      type: string; // text

      /**
       * If the value of the final cell is in the erased form, null.
       * A null value will be stored only when the value of this cell disappears after modification, and other than that, null can never be entered.
       * This is to indicate that the value has been explicitly deleted to prevent the cell value of the previous snapshot from being exposed when a cell is soft-delete.
       *
       * @title value
       */
      value: string | null;
    }
  }
  export interface ISnapshot extends ISpreadsheetCell.ISnapshot.ICreate {
    /**
     * @title Primary Key
     */
    id: string & tags.Format<"uuid">;

    /**
     * @title Creation time of spreadsheet cell snapshot
     */
    created_at: string & tags.Format<"date-time">;
  }

  export interface ICreate {
    /**
     * It counts from 1
     *
     * @title Column Number
     */
    column: number & tags.Type<"uint32"> & tags.Minimum<1>;

    /**
     * It counts from 1
     *
     * @title Row Number
     */
    row: number & tags.Type<"uint32"> & tags.Minimum<1>;

    /**
     * @title Last Snapshot
     */
    snapshot: ISpreadsheetCell.ISnapshot.ICreate;
  }
}

export interface ISpreadsheetCell extends ISpreadsheetCell.ICreate {
  /**
   * @title Primary Key
   */
  id: string & tags.Format<"uuid">;

  /**
   * @title Spreadsheet ID
   */
  spreadsheet_id: string & tags.Format<"uuid">;

  /**
   * @title Creation time of spreadsheet cell
   */
  created_at: string & tags.Format<"date-time">;
}
