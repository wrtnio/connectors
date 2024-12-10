import { Prisma } from "@prisma/client";

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
}
