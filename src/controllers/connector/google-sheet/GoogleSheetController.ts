import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { IGoogleSheet } from "@wrtn/connector-api/lib/structures/connector/google_sheet/IGoogleSheet";

import { GoogleSheetProvider } from "../../../providers/connector/google_sheet/GoogleSheetProvider";
import { retry } from "../../../utils/retry";

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
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleSheet_full.svg",
  )
  @core.TypedRoute.Post()
  async getHeaders(
    @core.TypedBody() input: IGoogleSheet.IReadGoogleSheetHeadersInput,
  ): Promise<IGoogleSheet.IReadGoogleSheetOutput> {
    return retry(() => this.googleSheetProvider.readHeaders(input))();
  }

  /**
   * 구글 시트에 내용을 추가합니다.
   *
   * @summary 구글 시트에 내용 추가하기
   *
   * @param input 내용을 추가하기 위한 정보
   *
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleSheet_full.svg",
  )
  @core.TypedRoute.Post("append")
  async appendGoogleSheet(
    @core.TypedBody() input: IGoogleSheet.IAppendToSheetInput,
  ): Promise<void> {
    return retry(() => this.googleSheetProvider.appendToSheet(input))();
  }

  /**
   * 구글 시트를 생성합니다.
   *
   * 생성된 시트는 구글 드라이브 루트 경로에 생성됩니다.
   *
   * @summary 구글 시트 생성하기
   *
   * @param input 생성할 시트 제목
   *
   * @returns 생성된 시트 id와 Url
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleSheet_full.svg",
  )
  @core.TypedRoute.Post("create")
  async createGoogleSheet(
    @core.TypedBody() input: IGoogleSheet.ICreateGoogleSheetInput,
  ): Promise<IGoogleSheet.ICreateGoogleSheetOutput> {
    return retry(() => this.googleSheetProvider.createSpreadsheet(input))();
  }

  /**
   * 구글 시트에 권한을 부여합니다.
   *
   * @summary 구글 시트 권한 부여.
   *
   * @param input 권한 부여를 위한 정보.
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleSheet_full.svg",
  )
  @core.TypedRoute.Post("/permission")
  async permission(
    @core.TypedBody() input: IGoogleSheet.IPermissionInput,
  ): Promise<void> {
    return retry(() => this.googleSheetProvider.permission(input))();
  }

  /**
   * 구글 시트에 헤더를 추가합니다.
   *
   * @summary 구글 시트 헤더 추가.
   *
   * @param input 구글 시트 url과 추가할 헤더 이름.
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleSheet_full.svg",
  )
  @core.TypedRoute.Post("/header")
  async writeHeaders(
    @core.TypedBody() input: IGoogleSheet.IWriteGoogleSheetHeadersInput,
  ): Promise<void> {
    return retry(() => this.googleSheetProvider.writeHeaders(input))();
  }

  /**
   * 구글 워크시트 목록을 가져옵니다.
   *
   * @summary 구글 시트 워크시트 목록 가져오기.
   *
   * @param input 워크시트 목록을 가져올 구글 시트 url.
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleSheet_full.svg",
  )
  @core.TypedRoute.Post("/worksheet")
  async getWorkSheet(
    @core.TypedBody() input: IGoogleSheet.IGetWorkSheetInput,
  ): Promise<IGoogleSheet.IGetWorkSheetOutput> {
    return retry(() => this.googleSheetProvider.getWorkSheet(input))();
  }

  /**
   * 구글 시트의 Row 정보를 가져옵니다.
   *
   * @summary 구글 시트 Row 정보 가져오기.
   *
   * @returns 구글 시트 Row 정보.
   *
   *
   * @Todo determine api endpoint in later because not decided select options
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleSheet_full.svg",
  )
  @core.TypedRoute.Post("/get-rows")
  async readRows(
    @core.TypedBody() input: IGoogleSheet.IReadGoogleSheetRowsInput,
  ): Promise<IGoogleSheet.IReadGoogleSheetRowsOutput> {
    return retry(() => this.googleSheetProvider.readRows(input))();
  }
}
