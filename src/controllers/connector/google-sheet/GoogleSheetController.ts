import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { ICommon } from "@wrtn/connector-api/lib/structures/connector/common/ISecretValue";
import { IGoogleSheet } from "@wrtn/connector-api/lib/structures/connector/google_sheet/IGoogleSheet";

import { GoogleSheetProvider } from "../../../providers/connector/google_sheet/GoogleSheetProvider";

@Controller("connector/google-sheet")
export class GoogleSheetController {
  constructor(private readonly googleSheetProvider: GoogleSheetProvider) {}

  /**
   * 구글 시트의 헤더 정보를 가져옵니다.
   *
   * @summary 구글 시트 헤더 정보 가져오기.
   *
   * @param input 구글 시트 URL과 가져올 헤더 index.
   *
   * @returns 구글 시트 헤더 정보.
   *
   * @tag Google Sheet
   */
  @core.TypedRoute.Post()
  async getHeaders(
    @core.TypedBody() input: IGoogleSheet.IReadGoogleSheetHeadersInput,
  ): Promise<IGoogleSheet.IReadGoogleSheetOutput> {
    return this.googleSheetProvider.readHeaders(input);
  }

  /**
   * 구글 시트에 권한을 부여합니다.
   *
   * @summary 구글 시트 권한 부여.
   *
   * @param input 권한 부여를 위한 정보.
   *
   * @tag Google Sheet
   */
  @core.TypedRoute.Post("/permission")
  async permission(
    @core.TypedBody() input: IGoogleSheet.IPermissionInput,
  ): Promise<void> {
    return this.googleSheetProvider.permission(input);
  }

  /**
   * 구글 시트에 헤더를 추가합니다.
   *
   * @summary 구글 시트 헤더 추가.
   *
   * @param input 구글 시트 url과 추가할 헤더 이름.
   *
   * @tag Google Sheet
   */
  @core.TypedRoute.Post("/header")
  async writeHeaders(
    @core.TypedBody() input: IGoogleSheet.IWriteGoogleSheetHeadersInput,
  ): Promise<void> {
    return this.googleSheetProvider.writeHeaders(input);
  }

  /**
   * 구글 워크시트 목록을 가져옵니다.
   *
   * @summary 구글 시트 워크시트 목록 가져오기.
   *
   * @param input 워크시트 목록을 가져올 구글 시트 url.
   *
   * @tag Google Sheet
   */
  @core.TypedRoute.Post("/worksheet")
  async getWorkSheet(
    @core.TypedBody() input: IGoogleSheet.IGetWorkSheetInput,
  ): Promise<IGoogleSheet.IGetWorkSheetOutput> {
    return this.googleSheetProvider.getWorkSheet(input);
  }

  /**
   * 구글 시트의 Row 정보를 가져옵니다.
   *
   * @summary 구글 시트 Row 정보 가져오기.
   *
   * @returns 구글 시트 Row 정보.
   *
   * @tag Google Sheet
   *
   * @Todo determine api endpoint in later because not decided select options
   */
  @core.TypedRoute.Post("/get-rows")
  async readRows(
    @core.TypedBody() input: IGoogleSheet.IReadGoogleSheetRowsInput,
  ): Promise<IGoogleSheet.IReadGoogleSheetRowsOutput> {
    return this.googleSheetProvider.readRows(input);
  }
}
