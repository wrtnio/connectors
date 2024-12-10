import { Prisma } from "@prisma/client";

export namespace SpreadsheetCellProvider {
  export namespace summary {
    export const select = () => {
      return {
        select: {
          id: true,
          column: true,
          row: true,
          mv_last: {
            select: {
              snapshot: {
                select: {
                  id: true,
                  type: true,
                  value: true,
                  created_at: true,
                },
              },
            },
          },
        },
      } satisfies Prisma.spreadsheet_cellsFindManyArgs;
    };
  }
}
