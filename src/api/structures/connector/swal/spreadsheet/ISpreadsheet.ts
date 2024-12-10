import { tags } from "typia";
import { StrictOmit } from "../../../types/strictOmit";
import { ISpreadsheetExport } from "./ISpreadsheetExport";

export namespace ISpreadsheet {
  export interface ISummary
    extends StrictOmit<
      ISpreadsheet,
      "external_user_id" | "password" | "snapshots" | "deleted_at"
    > {
    /**
     * @title Total count of cells
     */
    cell_count: number & tags.Type<"uint64">;
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
   * @title password
   */
  password: string;

  /**
   *  It is created for the first time when an spreadsheet is created, and is
   *  accumulated every time the spreadsheet is modified.
   *
   *  @title List of snapshot contents
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
