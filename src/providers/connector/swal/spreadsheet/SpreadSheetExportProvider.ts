import { Prisma } from "@prisma/client";
import { ISpreadsheet } from "@wrtn/connector-api/lib/structures/connector/swal/spreadsheet/ISpreadsheet";
import { ISpreadsheetExport } from "@wrtn/connector-api/lib/structures/connector/swal/spreadsheet/ISpreadsheetExport";
import { MyPick } from "@wrtn/connector-api/lib/structures/types/MyPick";
import { randomUUID } from "crypto";
import { tags } from "typia";
import { ConnectorGlobal } from "../../../../ConnectorGlobal";

export namespace SpreadSheetExportProvider {
  export namespace json {
    export function transform(
      input: Prisma.spreadsheet_exportsGetPayload<
        ReturnType<typeof json.select>
      >,
    ): MyPick<
      ISpreadsheetExport,
      | "id"
      | "created_at"
      | "provider"
      | "uid"
      | "url"
      | "spreadsheet_snapshot_id"
    > {
      return {
        id: input.id,
        spreadsheet_snapshot_id: input.spreadsheet_snapshot_id,
        created_at: input.created_at.toISOString(),
        provider: input.spreadsheet_provider.name,
        uid: input.uid,
        url: input.url,
      };
    }

    export function select() {
      return {
        select: {
          id: true,
          created_at: true,
          spreadsheet_snapshot_id: true,
          spreadsheet_provider: {
            select: {
              id: true,
              name: true,
            },
          },
          uid: true,
          url: true,
        },
      } satisfies Prisma.spreadsheet_exportsFindFirstArgs;
    }
  }

  export const collect =
    (snapshot: ISpreadsheet.ISnapshot) =>
    (
      input: ISpreadsheetExport.ICreate,
      created_at: string & tags.Format<"date-time">,
    ) => {
      return {
        id: randomUUID(),
        snapshot: {
          connect: {
            id: snapshot.id,
          },
        },
        uid: input.uid ? String(input.uid) : null,
        url: input.url ? String(input.url) : null,
        spreadsheet_provider: {
          connectOrCreate: {
            create: {
              id: randomUUID(),
              name: input.provider,
              created_at,
            },
            where: {
              name: input.provider,
            },
          },
        },
        created_at,
      } satisfies Prisma.spreadsheet_exportsCreateInput;
    };

  export async function create(
    snapshot: ISpreadsheet.ISnapshot,
    input: ISpreadsheetExport.ICreate,
  ) {
    const exports = await ConnectorGlobal.prisma.spreadsheet_exports.create({
      ...SpreadSheetExportProvider.json.select(),
      data: {
        ...SpreadSheetExportProvider.collect(snapshot)(input, input.created_at),
      },
    });

    return SpreadSheetExportProvider.json.transform(exports);
  }
}
