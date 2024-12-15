import { Prisma } from "@prisma/client";
import { ISpreadsheet } from "@wrtn/connector-api/lib/structures/connector/swal/spreadsheet/ISpreadsheet";
import { randomUUID } from "node:crypto";
import { tags } from "typia";

export namespace SpreadsheetSnapshotProvider {
  export namespace summary {
    export const select = () => {
      return {
        select: {
          id: true,
          title: true,
          description: true,
          created_at: true,
          spreadsheet_exports: {
            select: {
              id: true,
              spreadsheet_provider: {
                include: {},
              },
            },
          },
        },
      } satisfies Prisma.spreadsheet_snapshotsFindManyArgs;
    };
  }

  export const collect = (
    input: ISpreadsheet.ICreate,
    created_at: string & tags.Format<"date-time">,
  ) => {
    const id = randomUUID();
    return {
      id: id,
      created_at: created_at ?? new Date().toISOString(),
      title: input.title,
      description: input.description,
    } satisfies Prisma.spreadsheet_snapshotsCreateManyInput;
  };
}
