import { Prisma } from "@prisma/client";
import { ISpreadsheetCell } from "@wrtn/connector-api/lib/structures/connector/swal/spreadsheet/ISpreadsheetCell";

export namespace SpreadsheetCellSnapshotProvider {
  export namespace summary {
    export const transform = (
      input: Prisma.spreadsheet_cell_snapshotsGetPayload<
        ReturnType<typeof summary.select>
      >,
    ): ISpreadsheetCell.ISnapshot => {
      return {
        id: input.id,
        type: input.type,
        value: input.value,
        created_at: input.created_at.toISOString(),
      };
    };

    export const select = () => {
      return {
        select: {
          id: true,
          type: true,
          value: true,
          created_at: true,
        },
      } satisfies Prisma.spreadsheet_cell_snapshotsFindManyArgs;
    };
  }
}
