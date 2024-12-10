import { tags } from "typia";
import { IPage } from "../../../common/IPage";
import { StrictOmit } from "../../../types/strictOmit";
import { ISpreadsheetCell } from "./ISpreadsheetCell";
import { ISpreadsheetExport } from "./ISpreadsheetExport";

export namespace ISpreadsheet {
  export namespace IRequest {
    /**
     * If an attribute exists,
     * it returns only the result of 'AND' calculations of all the attributes.
     *
     * @title Search Conditions
     */
    export interface ISearch {
      /**
       * Spreadsheet IDs, not Spreadsheet Snapshot ID
       * It is Spreadsheet's ID, Not Spreadsheet Snapshot ID and {@link ISpreadsheetExport spreadsheet_exports} ID.
       *
       * @title Spreadsheet IDs
       */
      ids?: Array<ISpreadsheet["id"]>;

      /**
       * @title Last Snapshot
       */
      snapshot: {
        /**
         * This property is not a complete match, but a feature
         * that allows you to search for a title that contains that character.
         *
         * @title Title of spreadsheet
         */
        title?: string;

        /**
         * This property is not a complete match, but a feature
         * that allows you to search for a title that contains that character.
         *
         * @title Description of spreadsheet
         */
        description?: string;

        /**
         * It means the number of cells you wish to have at least.
         * You can adjust this value when you want to look up a lot of written sheets.
         *
         * @title minimum count of cells
         */
        minimum_cell_count?: number & tags.Type<"uint64">;
      };
    }

    export type SortableColumns =
      | "created_at"
      | "snapshot.created_at"
      | "snapshot.title";
  }

  /**
   * If you want to look up the list of sheets you created,
   * you can use this to check.
   *
   * @title Request
   */
  export interface IRequest extends IPage.IRequest {
    /**
     * @title Search
     */
    search?: IRequest.ISearch;

    /**
     * @title Sort
     */
    sort?: IPage.Sort<IRequest.SortableColumns>;
  }

  export interface ISummary
    extends StrictOmit<
      ISpreadsheet,
      "external_user_id" | "snapshots" | "deleted_at"
    > {
    /**
     * @title Total count of cells
     */
    total_cell_count: number & tags.Type<"uint64">;
  }

  export interface ICreate {
    /**
     * @title title
     */
    title: string;

    /**
     * If user want to export this sheet to an external service,
     * the description may not be exposed depending on the service user want to export.
     * However, because it may be difficult to find out what this sheet was intended by looking at the title alone,
     * an explanatory property is placed.
     *
     * @title description
     */
    description?: string;
  }

  export interface ISnapshot extends ISpreadsheet.ICreate {
    /**
     * @title Primary Key
     */
    id: string & tags.Format<"uuid">;

    /**
     *  In other words, creation time or update time or spreadsheet
     *
     *  @title Creation time of snapshot record
     */
    created_at: string & tags.Format<"date-time">;

    /**
     * If it has been exported,
     * the location of the export will be recorded in the properties.
     *
     * @title History of this snapshot being exported
     */
    spreadsheet_exports: ISpreadsheetExport[];
  }
}

export interface ISpreadsheet<
  Snapshot extends ISpreadsheet.ISnapshot = ISpreadsheet.ISnapshot,
> {
  /**
   * @title Primary Key
   */
  id: string & tags.Format<"uuid">;

  /**
   * @title External User ID
   */
  external_user_id: string & tags.Format<"uuid">;

  /**
   * @title cells
   */
  spreadsheet_cells: ISpreadsheetCell[];

  /**
   * It is created for the first time when an spreadsheet is created, and is
   * accumulated every time the spreadsheet is modified.
   *
   * @title List of snapshot contents
   */
  snapshots: Snapshot[] & tags.MinItems<1>;

  /**
   * The most recent snapshot made is the higher version,
   * and in fact, this time value can serve as the version.
   *
   * @title Creation time of spreadsheet
   */
  created_at: string & tags.Format<"date-time">;

  /**
   * @title Deletion time of spreadsheet
   */
  deleted_at: (string & tags.Format<"date-time">) | null;
}
