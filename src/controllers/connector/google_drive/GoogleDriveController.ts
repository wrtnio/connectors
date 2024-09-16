import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { Prerequisite, RouteIcon, Standalone } from "@wrtnio/decorators";

import { IGoogleDrive } from "@wrtn/connector-api/lib/structures/connector/google_drive/IGoogleDrive";

import { GoogleDriveProvider } from "../../../providers/connector/google_drive/GoogleDriveProvider";

@Controller("connector/google-drive")
export class GoogleDriveController {
  constructor(private readonly googleDriveProvider: GoogleDriveProvider) {}

  /**
   * 구글 드라이브에 있는 폴더 목록을 가져옵니다.
   *
   * @summary 구글 드라이브 폴더 목록 가져오기.
   *
   * @param headers 구글 드라이브에 접근하기 위한 정보.
   *
   * @returns 구글 드라이브 폴더 목록.
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleDrive_full.svg",
  )
  @core.TypedRoute.Post("get/folders")
  async folderList(
    @core.TypedBody()
    input: IGoogleDrive.ISecret,
  ): Promise<IGoogleDrive.IFolderListGoogleDriveOutput> {
    return await this.googleDriveProvider.folderList(input);
  }

  /**
   * 구글 드라이브에 있는 파일 목록을 가져옵니다.
   *
   * @summary 구글 드라이브 파일 목록 가져오기.
   *
   * @param query 파일 목록을 가져오기 위한 정보.
   *
   * @returns 구글 드라이브 파일 목록.
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleDrive_full.svg",
  )
  @core.TypedRoute.Post("get/files")
  async fileList(
    @core.TypedBody() input: IGoogleDrive.IFileListGoogleDriveInput,
  ): Promise<IGoogleDrive.IFileListGoogleDriveOutput> {
    return await this.googleDriveProvider.fileList(input);
  }

  /**
   * 구글 드라이브에 새로운 폴더를 생성합니다.
   *
   * @summary 구글 드라이브 폴더 생성.
   *
   * @param headers
   * @param input 생성할 폴더 이름.
   *
   * @returns 생성된 폴더 고유 ID.
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleDrive_full.svg",
  )
  @core.TypedRoute.Post("/folder")
  async createFolder(
    @core.TypedBody() input: IGoogleDrive.ICreateFolderGoogleDriveInput,
  ): Promise<IGoogleDrive.ICreateFolderGoogleDriveOutput> {
    return await this.googleDriveProvider.createFolder(input);
  }

  /**
   * 구글 드라이브에 새로운 파일을 생성합니다.
   *
   * @summary 구글 드라이브 파일 생성.
   *
   * @param input 생성할 파일명과 파일을 생성할 폴더 고유 ID.
   *
   * @returns 생성된 파일 고유 ID.
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleDrive_full.svg",
  )
  @core.TypedRoute.Post("/file")
  async createFile(
    @core.TypedBody() input: IGoogleDrive.ICreateFileGoogleDriveInput,
  ): Promise<IGoogleDrive.ICreateFileGoogleDriveOutput> {
    return await this.googleDriveProvider.createFile(input);
  }

  /**
   * 구글 드라이브에 있는 파일을 삭제합니다.
   *
   * @summary 구글 드라이브 파일 삭제.
   *
   * @param id 삭제할 파일 고유 ID.
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleDrive_full.svg",
  )
  @core.TypedRoute.Delete("/file/:id")
  async deleteFile(
    /**
     * @title 삭제할 파일
     * @description 삭제할 파일을 선택해 주세요.
     */
    @Prerequisite({
      neighbor: () => GoogleDriveController.prototype.fileList,
      jmesPath: "data[].{value: id || '', label: name || ''}",
    })
    @core.TypedParam("id")
    id: string,
    @core.TypedBody()
    input: IGoogleDrive.ISecret,
  ): Promise<void> {
    return await this.googleDriveProvider.deleteFile(id, input);
  }

  /**
   * 구글 드라이브에 있는 폴더를 삭제합니다.
   *
   * @summary 구글 드라이브 폴더 삭제.
   *
   * @param id 삭제할 폴더 고유 ID.
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleDrive_full.svg",
  )
  @core.TypedRoute.Delete("/folder/:id")
  async deleteFolder(
    /**
     * @title 삭제할 폴더
     * @description 삭제할 폴더를 선택해 주세요.
     */
    @Prerequisite({
      neighbor: () => GoogleDriveController.prototype.folderList,
      jmesPath: "data[].{value: id || '', label: name || ''}",
    })
    @core.TypedParam("id")
    id: string,
    @core.TypedBody()
    input: IGoogleDrive.ISecret,
  ): Promise<void> {
    return await this.googleDriveProvider.deleteFolder(id, input);
  }

  /**
   * 파일 또는 폴더에 접근하기 위한 권한을 부여합니다.
   *
   * @summary 구글 드라이브 권한 부여.
   *
   * @param input 권한 부여를 위한 정보.
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleDrive_full.svg",
  )
  @core.TypedRoute.Post("permission")
  async permission(
    @core.TypedBody() input: IGoogleDrive.IPermissionGoogleDriveInput,
  ): Promise<void> {
    return await this.googleDriveProvider.permission(input);
  }

  /**
   * 파일에 텍스트를 추가합니다.
   *
   * @summary 구글 드라이브 파일 텍스트 추가.
   *
   * @param id 파일 고유 ID.
   *
   * @param input 추가할 텍스트.
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleDrive_full.svg",
  )
  @core.TypedRoute.Post("/file/:id/text")
  async createText(
    /**
     * @title 텍스트를 추가할 파일
     * @description 텍스트를 추가할 파일을 선택해 주세요.
     */
    @Prerequisite({
      neighbor: () => GoogleDriveController.prototype.fileList,
      jmesPath: "data[].{value: id || '', label: name || ''}",
    })
    @core.TypedParam("id")
    id: string,
    @core.TypedBody() input: IGoogleDrive.IAppendTextGoogleDriveInput,
  ): Promise<void> {
    return await this.googleDriveProvider.appendText(id, input);
  }

  /**
   * 파일에서 텍스트를 읽어옵니다.
   *
   * @summary 구글 드라이브 파일 텍스트 읽기.
   *
   * @param id 파일 고유 ID.
   *
   * @returns 파일 텍스트 내용.
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleDrive_full.svg",
  )
  @core.TypedRoute.Post("get/file/:id")
  async readFile(
    /**
     * @title 읽어올 파일
     * @description 읽어올 파일을 선택해 주세요.
     */
    @Prerequisite({
      neighbor: () => GoogleDriveController.prototype.fileList,
      jmesPath: "data[].{value: id || '', label: name || ''}",
    })
    @core.TypedParam("id")
    id: string,
    @core.TypedBody()
    input: IGoogleDrive.ISecret,
  ): Promise<IGoogleDrive.IReadFileGoogleDriveOutput> {
    return await this.googleDriveProvider.readFile(id, input);
  }
}
