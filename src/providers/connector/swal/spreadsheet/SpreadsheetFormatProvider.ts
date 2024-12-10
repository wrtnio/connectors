import { Prisma } from "@prisma/client";

export namespace SpreadsheetFormatProvider {
  export namespace summary {
    export const select = () => {
      return {
        select: {
          id: true,
          font_name: true,
          font_size: true,
          background_color: true,
          text_alignment: true,
          created_at: true,
          spreadsheet_ranges: {
            include: {},
          },
        },
        where: {
          deleted_at: null,
        },
      } satisfies Prisma.spreadsheet_formatsFindManyArgs;
    };
  }
}
