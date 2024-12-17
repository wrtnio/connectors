import core, { TypedBody, TypedParam } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { IExternalUser } from "@wrtn/connector-api/lib/structures/common/IExternalUser";
import { IPage } from "@wrtn/connector-api/lib/structures/common/IPage";
import { ISpreadsheet } from "@wrtn/connector-api/lib/structures/connector/swal/spreadsheet/ISpreadsheet";
import { ExperimentalRoute } from "@wrtnio/decorators";
import { ExternalUser } from "../../../../decorators/ExternalUser";
import { SpreadsheetProvider } from "../../../../providers/connector/swal/spreadsheet/SpreadsheetProvider";

@Controller("connector/swal/spreadsheets")
export class SpreadsheetController {
  @ExperimentalRoute()
  @core.TypedRoute.Patch(":id")
  async at(
    @ExternalUser() external_user: IExternalUser,
    @TypedParam("id") spreadsheetId: ISpreadsheet["id"],
  ): Promise<ISpreadsheet> {
    return SpreadsheetProvider.at(external_user, spreadsheetId);
  }

  @ExperimentalRoute()
  @core.TypedRoute.Patch()
  async index(
    @ExternalUser() external_user: IExternalUser,
    @TypedBody() input: ISpreadsheet.IRequest,
  ): Promise<IPage<ISpreadsheet.ISummary>> {
    return SpreadsheetProvider.index(external_user, input);
  }

  @ExperimentalRoute()
  @core.TypedRoute.Post()
  async create(
    @ExternalUser() external_user: IExternalUser,
    @TypedBody() input: ISpreadsheet.ICreate,
  ) {
    const { cells, ...createSheetInput } = input;
    return SpreadsheetProvider.create(
      external_user,
      createSheetInput,
    )({ cells });
  }
}
