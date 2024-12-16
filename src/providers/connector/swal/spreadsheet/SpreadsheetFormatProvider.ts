import { Prisma } from "@prisma/client";
import { ISpreadsheetFormat } from "@wrtn/connector-api/lib/structures/connector/swal/spreadsheet/ISpreadsheetFormat";
import { StrictOmit } from "@wrtn/connector-api/lib/structures/types/strictOmit";

export namespace SpreadsheetFormatProvider {
  export namespace summary {
    export const transform = (
      input: Prisma.spreadsheet_formatsGetPayload<
        ReturnType<typeof summary.select>
      >,
    ): StrictOmit<ISpreadsheetFormat, "deleted_at" | "spreadsheet_id"> => {
      return {
        id: input.id,
        background_color: input.background_color as `#${string}`,
        font_name: input.font_name,
        text_alignment: input.text_alignment,
        font_size: input.font_size.toNumber(),
        created_at: input.created_at.toISOString(),
      };
    };

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
