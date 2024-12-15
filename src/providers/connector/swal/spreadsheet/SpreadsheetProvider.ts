import { getSortable } from "@kakasoo/sortable";
import { Prisma } from "@prisma/client";
import { IExternalUser } from "@wrtn/connector-api/lib/structures/common/IExternalUser";
import { IPage } from "@wrtn/connector-api/lib/structures/common/IPage";
import { ISpreadsheet } from "@wrtn/connector-api/lib/structures/connector/swal/spreadsheet/ISpreadsheet";
import { MyPick } from "@wrtn/connector-api/lib/structures/types/MyPick";
import { StrictOmit } from "@wrtn/connector-api/lib/structures/types/strictOmit";
import { randomUUID } from "node:crypto";
import { tags } from "typia";
import { ConnectorGlobal } from "../../../../ConnectorGlobal";
import { PaginationUtil } from "../../../../utils/PaginationUtil";
import { SpreadsheetCellProvider } from "./SpreadsheetCellProvider";
import { SpreadsheetCellSnapshotProvider } from "./SpreadsheetCellSnapshotProvider";
import { SpreadsheetFormatProvider } from "./SpreadsheetFormatProvider";
import { SpreadsheetSnapshotProvider } from "./SpreadsheetSnapshotProvider";

export namespace SpreadsheetProvider {
  export namespace summary {
    export const transform = (
      input: Prisma.spreadsheetsGetPayload<ReturnType<typeof summary.select>>,
    ): ISpreadsheet.ISummary => {
      return {
        id: input.id,
        title: input.title,
        description: input.description,
        total_cell_count: input.spreadsheet_cells.length,
        created_at: input.created_at.toISOString(),
        spreadsheet_cells: input.spreadsheet_cells
          .map((cell) => {
            return SpreadsheetCellProvider.summary.transform(cell);
          })
          .slice(0, 100),
      };
    };

    export const select = () => {
      return {
        select: {
          id: true,
          external_user_id: true,
          title: true,
          description: true,
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

  export namespace json {
    export const transform = (
      input: Prisma.spreadsheetsGetPayload<ReturnType<typeof json.select>>,
    ): ISpreadsheet => {
      return {
        id: input.id,
        external_user_id: input.external_user_id,
        title: input.title,
        description: input.description,
        total_cell_count: input.spreadsheet_cells.length,
        created_at: input.created_at.toISOString(),
        snapshots: input.snapshots.map((snapshot) => {
          return SpreadsheetSnapshotProvider.json.transform(snapshot);
        }),
        spreadsheet_cells: input.spreadsheet_cells.map((cell) => {
          return SpreadsheetCellProvider.summary.transform(cell);
        }),
        deleted_at: null,
      };
    };

    export const select = () => {
      return {
        select: {
          id: true,
          external_user_id: true,
          title: true,
          description: true,
          created_at: true,
          spreadsheet_cells: SpreadsheetCellProvider.summary.select(),
          mv_last: {
            select: {
              snapshot: SpreadsheetSnapshotProvider.summary.select(),
            },
          },
          spreadsheet_formats: SpreadsheetFormatProvider.summary.select(),
          snapshots: SpreadsheetSnapshotProvider.json.select(),
        },
      } satisfies Prisma.spreadsheetsFindManyArgs;
    };
  }

  export namespace sync {}
  export namespace exports {}

  export const create =
    (
      external_user: IExternalUser,
      createSheetInput: StrictOmit<ISpreadsheet.ICreate, "cells">,
    ) =>
    async (createCellInput: MyPick<ISpreadsheet.ICreate, "cells">) => {
      const created_at = new Date().toISOString();
      const spreadsheet = await ConnectorGlobal.prisma.spreadsheets.create({
        ...SpreadsheetProvider.summary.select(),
        data: SpreadsheetProvider.collect(
          external_user,
          SpreadsheetSnapshotProvider.collect,
          created_at,
        )(createSheetInput),
      });

      if (createCellInput.cells?.length) {
        await ConnectorGlobal.prisma.spreadsheet_cells.createMany({
          data: createCellInput.cells.map((cell) => {
            return {
              spreadsheet_id: spreadsheet.id,
              ...SpreadsheetCellProvider.collect(spreadsheet.id)(
                cell,
                SpreadsheetCellSnapshotProvider.collect,
                created_at,
              ),
            };
          }),
        });
      }
    };

  export const collect =
    <
      Input extends ISpreadsheet.ICreate,
      Snapshot extends Prisma.spreadsheet_snapshotsCreateInput,
    >(
      external_user: IExternalUser,
      snapshotFactory: (
        input: Input,
        created_at: string & tags.Format<"date-time">,
      ) => Snapshot,
      created_at: string & tags.Format<"date-time">,
    ) =>
    (input: Input) => {
      const snapshot = snapshotFactory(input, created_at);
      return {
        id: randomUUID(),
        external_user_id: external_user.id,
        title: input.title,
        description: input.description,
        password: external_user.password,
        created_at,
        snapshots: {
          create: [snapshot],
        },
        mv_last: {
          create: {
            snapshot: {
              connect: { id: snapshot.id },
            },
          },
        },
      } satisfies Prisma.spreadsheetsCreateInput;
    };

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

  // export const at = async (
  //   external_user: IExternalUser,
  //   spreadsheetId: ISpreadsheet["id"],
  // ): Promise<ISpreadsheet> => {
  // ConnectorGlobal.prisma.spreadsheets.findFirstOrThrow({
  //   ...SpreadsheetProvider
  //   where: {
  //   }
  // })
  // };

  export const index = async (
    external_user: IExternalUser,
    input: ISpreadsheet.IRequest,
  ): Promise<IPage<ISpreadsheet.ISummary>> => {
    return PaginationUtil.paginate({
      schema: ConnectorGlobal.prisma.spreadsheets,
      payload: SpreadsheetProvider.summary.select(),
      transform: SpreadsheetProvider.summary.transform,
    })({
      where: {
        AND: [...(await search(external_user, input.search))],
      },
      orderBy: input.sort?.length
        ? PaginationUtil.orderBy(orderBy)(input.sort)
        : [{ created_at: "desc" }],
    })(input);
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

    return condition;
  };

  export const orderBy = <T extends ISpreadsheet.IRequest.SortableColumns>(
    key: T,
    direction: "asc" | "desc",
  ) => {
    return getSortable(
      key,
      direction,
    ) satisfies Prisma.spreadsheetsOrderByWithRelationInput;
  };
}
