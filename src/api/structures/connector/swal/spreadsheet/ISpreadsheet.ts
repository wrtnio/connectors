import { Prerequisite } from "@wrtnio/decorators";
import { tags } from "typia";
import { IPage } from "../../../common/IPage";
import { StrictOmit } from "../../../types/strictOmit";
import { ISpreadsheetCell } from "./ISpreadsheetCell";
import { ISpreadsheetExport } from "./ISpreadsheetExport";

export namespace ISpreadsheet {
  export namespace ISync {
    /**
     * @title Spreadsheet information
     */
    export interface SnapshotOutput {
      /**
       * @title spreadsheet information
       */
      spreadsheet: ISpreadsheet;
    }

    export interface SnapshotInput {
      /**
       * @title snapshot information for synchronization
       */
      snapshot: {
        /**
         * The user synchronizes the text associated with that snapshot.
         *
         * For example, when you have v1 and v2,
         * if you pass v1 by ID,
         * you replace the exported document in snapshot v1 with the exported document
         * in v2 and update the properties,
         * including the title and content of the exported document.
         *
         * If you want to synchronize the notion documents linked to the snapshot at once,
         * please only forward the snapshot's ID (=`from` property).
         * If you want to synchronize only some of the documents exported from that snapshot, pass only the ID of spreadsheet_exports.
         * spreadsheet_exports is the point of connection between snapshots and documents exported from those snapshots.
         *
         * @title ID of the snapshot to be previously synchronized
         */
        from: ISpreadsheet.ISnapshot["id"] &
          Prerequisite<{
            method: "patch";
            path: "/connector/spreadsheets/:id";
            jmesPath: "snapshot[].{ value: id, label: ['created_at ', created_at].join(':', @) }";
          }>;

        /**
         * @title The ID of the snapshot that will be after synchronization
         */
        to: ISpreadsheet.ISnapshot["id"] &
          Prerequisite<{
            method: "patch";
            path: "/connector/spreadsheets/:id";
            jmesPath: "snapshot[].{ value: id, label: ['created_at ', created_at].join(':', @) }";
          }>;

        /**
         * @@title Exported Document's information
         */
        spreadsheet_snapshot_exports?: {
          /**
           * IDs of {@link ISpreadsheetExport spreadsheet_exports}
           *
           * If you want to synchronize the notion documents linked to the snapshot at once,
           * please only forward the snapshot's ID (=`from` property).
           * If you want to synchronize only some of the documents exported from that snapshot, pass only the ID of spreadsheet_exports.
           * spreadsheet_exports is the point of connection between snapshots and documents exported from those snapshots.
           *
           * If it is to be specified, it must be an array of at least one size.
           *
           * @title IDs of ISpreadsheetExport
           */
          ids?: Array<ISpreadsheetExport["id"]> & tags.MinItems<1>;
        };
      };
    }

    /**
     * @title result of exporting spreadsheet to excel
     */
    export interface ToExcelToOutput extends SnapshotOutput {
      /**
       * Indicates whether synchronization is successful or not
       *
       * @title response
       */
      isSuccess: boolean;
    }

    /**
     * @title Information to export to excel file
     */
    export type ToExcelToInput = SnapshotInput;
  }

  export namespace IExport {
    export interface SnapshotOutput {
      /**
       * @title Exporting infomation
       */
      spreadsheet_exports: StrictOmit<ISpreadsheetExport, "deleted_at">;
    }

    export interface SnapshotInput {
      /**
       * @title snapshot information to export
       */
      snapshot: {
        /**
         * @title Snapshot ID of the spreadsheet you want to export to another service
         */
        id: string &
          Prerequisite<{
            method: "patch";
            path: "/connector/swal/spreadsheets/:id";
            jmesPath: "data[].{ value: id, label: ['created_at ', created_at].join(':', @) }";
          }>;
      };
    }

    export interface ToExcelToOutput extends IExport.SnapshotOutput {
      excel: {
        /**
         * @title Created excel spreadsheet ID
         */
        id: string;

        /**
         * @title Title of Created excel spreadsheet
         */
        title: string;

        /**
         * @title File URL
         */
        link: string;
      };
    }

    export type ToExcelToInput = IExport.SnapshotInput;
  }

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
     * It is the summarized cell content, and only up to 100 are searched.
     * You can check the whole thing by searching in detail.
     *
     * @title Summarized Cell Contents
     */
    spreadsheet_cells: Array<StrictOmit<ISpreadsheetCell, "spreadsheet_id">> &
      tags.MinItems<0> &
      tags.MaxItems<100>;
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
    description?: string | null;

    /**
     * @title cells
     */
    cells?: ISpreadsheetCell.ICreate[];
  }

  export interface ISnapshot extends StrictOmit<ISpreadsheet.ICreate, "cells"> {
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
    spreadsheet_exports: ISpreadsheetExport.ISummary[];
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
   * @title Title of Sheet
   */
  title: string;

  /**
   * @title Description of Sheet
   */
  description: string | null;

  /**
   * @title cells
   */
  spreadsheet_cells: StrictOmit<ISpreadsheetCell, "spreadsheet_id">[];

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

  /**
   * @title Total count of cells
   */
  total_cell_count: number & tags.Type<"uint64">;
}
