import { Prisma } from "@prisma/client";
import { IExternalUser } from "@wrtn/connector-api/lib/structures/common/IExternalUser";
import { IPage } from "@wrtn/connector-api/lib/structures/common/IPage";
import { ISpreadsheet } from "@wrtn/connector-api/lib/structures/connector/swal/spreadsheet/ISpreadsheet";
import { ConnectorGlobal } from "../../../../ConnectorGlobal";
import { SpreadsheetCellProvider } from "./SpreadsheetCellProvider";
import { SpreadsheetFormatProvider } from "./SpreadsheetFormatProvider";
import { SpreadsheetSnapshotProvider } from "./SpreadsheetSnapshotProvider";

export namespace SpreadsheetProvider {
  export namespace summary {
    export const transform = (
      input: Prisma.spreadsheetsGetPayload<ReturnType<typeof summary.select>>,
    ): ISpreadsheet.ISummary => {
      return {} as any;
    };

    export const select = () => {
      return {
        select: {
          id: true,
          external_user_id: true,
          created_at: true,
          spreadsheet_cells: SpreadsheetCellProvider.summary.select(),
          mv_last: {
            select: {
              snapshot: SpreadsheetSnapshotProvider.summary.select(),
            },
          },
          spreadsheet_formats: SpreadsheetFormatProvider.summary.select(),
        },
      } satisfies Prisma.spreadsheetsFindManyArgs;
    };
  }

  export namespace sync {}
  export namespace exports {}

  export const create = async (external_user: IExternalUser, input: any) => {};

  export const update = async (
    external_user: IExternalUser,
    spreadsheetId: any,
    input: any,
  ) => {};

  export const remove = async (
    external_user: IExternalUser,
    spreadsheetId: any,
    input: any,
  ) => {};

  export const at = async (
    external_user: IExternalUser,
    spreadsheetId: any,
  ) => {};

  export const index = async (
    external_user: IExternalUser,
    input: any,
  ): Promise<IPage<ISpreadsheet.ISummary>> => {
    return {} as any;
  };

  export const search = async (
    external_user: IExternalUser,
    input?: ISpreadsheet.IRequest.ISearch,
  ) => {
    const condition: Prisma.spreadsheetsWhereInput["AND"] = [
      {
        external_user_id: external_user.id,
        password: external_user.password,
        deleted_at: null,
      },
    ];

    if (input?.ids !== undefined) {
      condition.push({
        id: {
          in: input.ids,
        },
      });
    }

    if (input?.snapshot.description !== undefined) {
      condition.push({
        mv_last: {
          snapshot: {
            description: {
              contains: input.snapshot.description,
            },
          },
        },
      });
    }

    if (input?.snapshot.minimum_cell_count !== undefined) {
      const res = await ConnectorGlobal.prisma.spreadsheet_cells.groupBy({
        _count: true,
        where: {
          spreadsheet: {
            external_user_id: external_user.id,
            password: external_user.password,
            deleted_at: null,
          },
          mv_last: {
            isNot: null,
          },
        },
        by: ["spreadsheet_id"],
      });

      const spreadsheet_ids = res
        .filter((el): boolean => el._count > input.snapshot.minimum_cell_count!)
        .map((el): string => el.spreadsheet_id);

      condition.push({
        id: {
          in: spreadsheet_ids,
        },
      });
    }

    if (input?.snapshot.title !== undefined) {
      condition.push({
        mv_last: {
          snapshot: {
            title: {
              contains: input.snapshot.title,
            },
          },
        },
      });
    }
  };
}
