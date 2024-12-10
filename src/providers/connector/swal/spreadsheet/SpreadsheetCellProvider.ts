import { Prisma } from "@prisma/client";
import { ISpreadsheetCell } from "@wrtn/connector-api/lib/structures/connector/swal/spreadsheet/ISpreadsheetCell";
import { StrictOmit } from "@wrtn/connector-api/lib/structures/types/strictOmit";
import { SpreadsheetCellSnapshotProvider } from "./SpreadsheetCellSnapshotProvider";

export namespace SpreadsheetCellProvider {
  export namespace summary {
    export const transform = (
      input: Prisma.spreadsheet_cellsGetPayload<
        ReturnType<typeof summary.select>
      >,
    ): StrictOmit<ISpreadsheetCell, "spreadsheet_id"> => {
      const snapshot = input.mv_last?.snapshot!;
      return {
        id: input.id,
        column: input.column,
        row: input.row,
        created_at: input.created_at.toISOString(),
        snapshot: SpreadsheetCellSnapshotProvider.summary.transform(snapshot),
      };
    };

    export const select = () => {
      return {
        select: {
          id: true,
          column: true,
          row: true,
          created_at: true,
          mv_last: {
            select: {
              snapshot: SpreadsheetCellSnapshotProvider.summary.select(),
            },
          },
        },
      } satisfies Prisma.spreadsheet_cellsFindManyArgs;
    };
  }
}
