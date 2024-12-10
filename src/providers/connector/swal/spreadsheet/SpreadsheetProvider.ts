import { IExternalUser } from "@wrtn/connector-api/lib/structures/common/IExternalUser";
import { IPage } from "@wrtn/connector-api/lib/structures/common/IPage";
import { ISpreadsheet } from "@wrtn/connector-api/lib/structures/connector/swal/spreadsheet/ISpreadsheet";

export namespace SpreadsheetProvider {
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
}
