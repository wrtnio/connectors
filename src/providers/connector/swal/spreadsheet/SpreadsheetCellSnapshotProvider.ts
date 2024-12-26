import { Prisma } from "@prisma/client";
import { ISpreadsheetCell } from "@wrtn/connector-api/lib/structures/connector/swal/spreadsheet/ISpreadsheetCell";
import { randomUUID } from "crypto";
import { tags } from "typia";
import { ConnectorGlobal } from "../../../../ConnectorGlobal";

export namespace SpreadsheetCellSnapshotProvider {
  export namespace summary {
    export const transform = (
      input: Prisma.spreadsheet_cell_snapshotsGetPayload<
        ReturnType<typeof summary.select>
      >,
    ): ISpreadsheetCell.ISnapshot => {
      return {
        id: input.id,
        type: input.type as any,
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

  export const collect = (
    input: ISpreadsheetCell.ISnapshot.ICreate,
    created_at: string & tags.Format<"date-time">,
  ): ISpreadsheetCell.ISnapshot => {
    return {
      id: randomUUID(),
      type: input.type,
      value: input.value,
      created_at,
    } satisfies Prisma.spreadsheet_cell_snapshotsCreateWithoutSpreadsheet_cellInput;
  };

  export const create =
    (spreadsheet_cell_id: ISpreadsheetCell["id"]) =>
    async (
      input: ISpreadsheetCell.ISnapshot.ICreate,
      created_at: string & tags.Format<"date-time">,
    ) => {
      const data = SpreadsheetCellSnapshotProvider.collect(input, created_at);
      return await ConnectorGlobal.prisma.spreadsheet_cell_snapshots.create({
        ...SpreadsheetCellSnapshotProvider.summary.select(),
        data: {
          spreadsheet_cell_id: spreadsheet_cell_id,
          ...data,
        },
      });
    };
}
