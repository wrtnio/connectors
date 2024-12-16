import { Prisma } from "@prisma/client";
import { ISpreadsheetCell } from "@wrtn/connector-api/lib/structures/connector/swal/spreadsheet/ISpreadsheetCell";
import { StrictOmit } from "@wrtn/connector-api/lib/structures/types/strictOmit";
import { randomUUID } from "node:crypto";
import { tags } from "typia";
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

  export const collect =
    () =>
    <
      Input extends ISpreadsheetCell.ICreate,
      CreatedAt extends string & tags.Format<"date-time">,
    >(
      input: Input,
      snapshotFactory: (
        input: Input["snapshot"],
        created_at: CreatedAt,
      ) => ISpreadsheetCell.ISnapshot,
      created_at: CreatedAt,
    ) => {
      const snapshot = snapshotFactory(input.snapshot, created_at);
      return {
        id: randomUUID(),
        column: input.column,
        row: input.row,
        created_at: created_at,
        spreadsheet_cell_snapshots: {
          create: [snapshot],
        },
        mv_last: {
          create: {
            snapshot: {
              connect: { id: snapshot.id },
            },
          },
        },
      } satisfies Prisma.spreadsheet_cellsCreateWithoutSpreadsheetInput;
    };
}
