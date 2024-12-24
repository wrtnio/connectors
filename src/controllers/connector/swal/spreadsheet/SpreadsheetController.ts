import core, { TypedBody, TypedParam } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { IExternalUser } from "@wrtn/connector-api/lib/structures/common/IExternalUser";
import { IPage } from "@wrtn/connector-api/lib/structures/common/IPage";
import { ISpreadsheet } from "@wrtn/connector-api/lib/structures/connector/swal/spreadsheet/ISpreadsheet";
import { Prerequisite } from "@wrtnio/decorators";
import { ExternalUser } from "../../../../decorators/ExternalUser";
import { SpreadsheetProvider } from "../../../../providers/connector/swal/spreadsheet/SpreadsheetProvider";

@Controller("connector/swal/spreadsheets")
export class SpreadsheetController {
  /**
   * Export the spreadsheet to GoogleSheets
   *
   * The exported spreadsheet is recorded by creating a
   * {@link ISpreadsheetExport bbs_spreadsheet_exports} object based on the snapshot.
   * You can upgrade and downgrade the version using
   * the 'POST /connector/swal/spreadsheets/:id/exports/sync/google-sheets' connector in the future.
   * Also, it doesn't matter if you export the same version of the spreadsheet multiple times.
   *
   * Because each export generates a new file,
   * you must use the `sync` connector if you want to change the version of an already exported file.
   *
   * @summary Exports specified spreadsheet to GoogleSheets
   * @param spreadsheetId Target spreadsheet's {@link ISpreadsheet.id}, Not snapshot ID
   * @param input GoogleSheets export configuration and snapshot information to export
   * @returns Spreadsheet Information and GoogleSheets export details
   */
  @core.TypedRoute.Post(":id/exports/google-sheets")
  async exportsToGoogleSheets(
    @ExternalUser() external_user: IExternalUser,
    @Prerequisite({
      neighbor: () => SpreadsheetController.prototype.index,
      jmesPath: "data[].{ value: id, label: snapshot.title }",
    })
    @TypedParam("id")
    spreadsheetId: ISpreadsheet["id"],
    @TypedBody() input: ISpreadsheet.IExport.ToGoogleSheetsToInput,
  ): Promise<ISpreadsheet.IExport.ToGoogleSheetsToOutput> {
    return await SpreadsheetProvider.exports(
      external_user,
      spreadsheetId,
      "google_sheets",
    )(input);
  }

  /**
   * Export the spreadsheet to Excel
   *
   * The exported spreadsheet is recorded by creating a
   * {@link ISpreadsheetExport bbs_spreadsheet_exports} object based on the snapshot.
   * You can upgrade and downgrade the version using
   * the 'POST /connector/swal/spreadsheets/:id/exports/sync/excel' connector in the future.
   * Also, it doesn't matter if you export the same version of the spreadsheet multiple times.
   *
   * Because each export generates a new file,
   * you must use the `sync` connector if you want to change the version of an already exported file.
   *
   * @summary Exports specified spreadsheet to Excel
   * @param spreadsheetId Target spreadsheet's {@link ISpreadsheet.id}, Not snapshot ID
   * @param input Excel export configuration and snapshot information to export
   * @returns Spreadsheet Information and Excel export details
   */
  @core.TypedRoute.Post(":id/exports/excel")
  async exportsToExcel(
    @ExternalUser() external_user: IExternalUser,
    @Prerequisite({
      neighbor: () => SpreadsheetController.prototype.index,
      jmesPath: "data[].{ value: id, label: snapshot.title }",
    })
    @TypedParam("id")
    spreadsheetId: ISpreadsheet["id"],
    @TypedBody() input: ISpreadsheet.IExport.ToExcelToInput,
  ): Promise<ISpreadsheet.IExport.ToExcelToOutput> {
    return await SpreadsheetProvider.exports(
      external_user,
      spreadsheetId,
      "excel",
    )(input);
  }

  /**
   * Read an entire contents of spreadsheet with its every snapshot
   *
   * All data content that is not omitted is shown here, so you can also see how the spreadsheet has been modified over time.
   * This connector reads a spreadsheet with its every snapshot {@link ISpreadsheet.ISnapshot snapshots}.
   * This detailed view contains the full data created for each version of the spreadsheet,
   * as well as the connection information to the external services to which it was exported.
   *
   * By examining the snapshots, you can track changes made to the spreadsheet, compare versions, and understand its history.
   * If the user is interested in a specific version of the spreadsheet or wants to check its export history to external services like Google Sheets or Excel,
   * this connector is the correct choice.
   *
   * @summary Read individual detailed spreadsheet including full data
   * @param spreadsheetId Target spreadsheet's {@link ISpreadsheet.id}, Not snapshot ID
   * @returns Spreadsheet Information
   */
  @core.TypedRoute.Patch(":id")
  async at(
    @ExternalUser() external_user: IExternalUser,
    @TypedParam("id") spreadsheetId: ISpreadsheet["id"],
  ): Promise<ISpreadsheet> {
    return SpreadsheetProvider.at(external_user, spreadsheetId);
  }

  /**
   * List up all summarized spreadsheets with pagination and searching options
   *
   * Because it is looking at the user's individual spreadsheets, the user cannot inquire about spreadsheets other than their own.
   * Because it is a call to data stored in the connector server's own DB,
   * it may be appropriate to call this connector if the user asks to call the data without saying the service name.
   * It is recommended that you first ask the user for the service name.
   * If you are asked to look up the spreadsheets under the names of `Swal`, `Wrtn Technologies`, `Wrtn`, `user own DB`, `user DB`, etc., you should call this connector.
   *
   * A list of paged spreadsheets will appear.
   * The spreadsheet contains abbreviated data previews, so you can infer its contents from the title and preview.
   *
   * If you want to see the full data instead of the abbreviated preview,
   * or if you want to see the history of this spreadsheet being exported to Google Sheets or other services,
   * please look up the details.
   * Here, we only show a preview of the data up to 100 cells, so if you want to see the latter, you need to look up the details.
   * You can view all the snapshots of this spreadsheet if you want to look at them in detail.
   * The detailed lookup connector is 'PATCH connector/swal/spreadsheets/:id'.
   *
   * @summary List up all summarized spreadsheets
   * @param input Request info of pagination and searching options.
   * @returns Paginated summarized spreadsheets.
   */
  @core.TypedRoute.Patch()
  async index(
    @ExternalUser() external_user: IExternalUser,
    @TypedBody() input: ISpreadsheet.IRequest,
  ): Promise<IPage<ISpreadsheet.ISummary>> {
    return SpreadsheetProvider.index(external_user, input);
  }

  /**
   * Create Spreadsheet in User Database
   *
   * Spreadsheets are managed in a snapshot-based structure, enabling rollback at any time.
   * When a spreadsheet is created, the system automatically generates the first snapshot.
   * The most recent snapshot reflects the current state of the spreadsheet.
   * By editing the spreadsheet or exporting it to external services, you can track which version—i.e., which snapshot—was exported and synchronize it using foreign keys.
   * This system is designed to efficiently handle any spreadsheet-like documents, such as those from Google Sheets, Excel, or Airtable.
   * Using a structured data format as the standard for writing and versioning, it identifies changes through a diff algorithm whenever edits are made.
   * This allows you to compare previous and current versions, track changes, and synchronize updates across services.
   * As these APIs store data exclusively in the Wrtn Technologies Ecosystem Team's database without relying on external APIs,
   * this setup serves as an ideal starting point for creating and managing spreadsheets efficiently with robust version control.
   *
   * If the user asked to edit the spreadsheet, it would most likely not be this connector.
   * There is a separate connector for the update, so please use it.
   *
   * If the user asks you to create a spreadsheet without any service names,
   * you may be referring to this connector.
   * Ask the user to confirm.
   *
   * Please insert the correct data without omitting the data or adding the phrase that you have omitted it.
   *
   * @summary Create Spreadsheet
   * @param input Spreadsheet Information to Create
   */
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
