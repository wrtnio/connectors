import { Prisma } from "@prisma/client";
import { ISpreadsheet } from "@wrtn/connector-api/lib/structures/connector/swal/spreadsheet/ISpreadsheet";
import { randomUUID } from "node:crypto";
import { tags } from "typia";

export namespace SpreadsheetSnapshotProvider {
  export namespace json {
    export const transform = (
      input: Prisma.spreadsheet_snapshotsGetPayload<
        ReturnType<typeof json.select>
      >,
    ): ISpreadsheet.ISnapshot => {
      return {
        id: input.id,
        title: input.title,
        description: input.description ?? null,
        spreadsheet_exports: input.spreadsheet_exports.map((el) => {
          return {
            id: el.id,
            uid: el.uid,
            url: el.url,
            created_at: el.created_at.toISOString(),
            provider: el.spreadsheet_provider.name,
          };
        }),
        created_at: input.created_at.toISOString(),
      };
    };

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
              uid: true,
              url: true,
              created_at: true,
              deleted_at: true,
              spreadsheet_provider: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
            where: {
              deleted_at: null,
            },
          },
        },
      } satisfies Prisma.spreadsheet_snapshotsFindManyArgs;
    };
  }

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
              uid: true,
              url: true,
              created_at: true,
              deleted_at: true,
              spreadsheet_provider: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
            where: {
              deleted_at: null,
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
