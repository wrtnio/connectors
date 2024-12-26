import { Prisma } from "@prisma/client";
import { ISpreadsheet } from "@wrtn/connector-api/lib/structures/connector/swal/spreadsheet/ISpreadsheet";
import { ISpreadsheetCell } from "@wrtn/connector-api/lib/structures/connector/swal/spreadsheet/ISpreadsheetCell";
import { StrictOmit } from "@wrtn/connector-api/lib/structures/types/strictOmit";
import { randomUUID } from "node:crypto";
import { tags } from "typia";
import { ConnectorGlobal } from "../../../../ConnectorGlobal";
import { SpreadsheetCellSnapshotProvider } from "./SpreadsheetCellSnapshotProvider";

export namespace SpreadsheetCellProvider {
  export namespace summary {
    export const transform = (
      input: Prisma.spreadsheet_cellsGetPayload<
        ReturnType<typeof summary.select>
      >,
    ): StrictOmit<ISpreadsheetCell, "spreadsheet_id"> => {
      return {
        id: input.id,
        column: input.column,
        row: input.row,
        created_at: input.created_at.toISOString(),
        mv_last: {
          snapshot: SpreadsheetCellSnapshotProvider.summary.transform(
            input.mv_last?.snapshot!,
          ),
        },
        spreadsheet_cell_snapshots: input.spreadsheet_cell_snapshots.map(
          (snapshot) => {
            return SpreadsheetCellSnapshotProvider.summary.transform(snapshot);
          },
        ),
      };
    };

    export const select = () => {
      const snapshot_select = SpreadsheetCellSnapshotProvider.summary.select();
      return {
        select: {
          id: true,
          column: true,
          row: true,
          created_at: true,
          mv_last: {
            select: {
              snapshot: snapshot_select,
            },
          },
          spreadsheet_cell_snapshots: snapshot_select,
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
        input: ISpreadsheetCell.ISnapshot.ICreate,
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

  export async function at(input: ISpreadsheetCell.IAt) {
    return await ConnectorGlobal.prisma.spreadsheet_cells.findFirst({
      ...SpreadsheetCellProvider.summary.select(),
      where: {
        ...("id" in input === true && { id: input.id }),
        ...("id" in input === false && {
          spreadsheet_id: input.spreadsheet_id,
          column: input.column,
          row: input.row,
        }),
      },
    });
  }

  export const connect =
    (cell_id: ISpreadsheetCell["id"]) =>
    async (snapshot_id: ISpreadsheetCell.ISnapshot["id"]) => {
      await ConnectorGlobal.prisma.spreadsheet_cell_last_snapshots.upsert({
        create: {
          spreadsheet_cell_id: cell_id,
          spreadsheet_cell_snapshot_id: snapshot_id,
        },
        update: {
          spreadsheet_cell_snapshot_id: snapshot_id,
        },
        where: {
          spreadsheet_cell_id: cell_id,
        },
      });
    };

  export const create =
    (spreadsheet_id: ISpreadsheet["id"]) =>
    async (
      cell: ISpreadsheetCell.ICreate,
      created_at: string & tags.Format<"date-time">,
    ) => {
      return await ConnectorGlobal.prisma.spreadsheet_cells.create({
        data: {
          spreadsheet_id: spreadsheet_id,
          ...SpreadsheetCellProvider.collect()(
            cell,
            SpreadsheetCellSnapshotProvider.collect,
            created_at,
          ),
          created_at,
        },
      });
    };
}
