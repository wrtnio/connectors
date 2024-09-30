import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { Prerequisite, RouteIcon, Standalone } from "@wrtnio/decorators";

import { IGoogleDrive } from "@wrtn/connector-api/lib/structures/connector/google_drive/IGoogleDrive";

import { GoogleDriveProvider } from "../../../providers/connector/google_drive/GoogleDriveProvider";
import { ApiTags } from "@nestjs/swagger";

@Controller("connector/google-drive")
export class GoogleDriveController {
  constructor(private readonly googleDriveProvider: GoogleDriveProvider) {}

  /**
   * Get a list of folders in Google Drive.
   *
   * @summary Get a list of Google Drive folders.
   *
   * @param headers Information for accessing Google Drive.
   *
   * @returns A list of Google Drive folders.
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleDrive_full.svg",
  )
  @ApiTags("Google Drive")
  @core.TypedRoute.Post("get/folders")
  async folderList(
    @core.TypedBody()
    input: IGoogleDrive.ISecret,
  ): Promise<IGoogleDrive.IFolderListGoogleDriveOutput> {
    return await this.googleDriveProvider.folderList(input);
  }

  /**
   * Get a list of files in Google Drive.
   *
   * @summary Get a list of Google Drive files.
   *
   * @param query Information for getting a list of files.
   *
   * @returns A list of Google Drive files.
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleDrive_full.svg",
  )
  @ApiTags("Google Drive")
  @core.TypedRoute.Post("get/files")
  async fileList(
    @core.TypedBody() input: IGoogleDrive.IFileListGoogleDriveInput,
  ): Promise<IGoogleDrive.IFileListGoogleDriveOutput> {
    return await this.googleDriveProvider.fileList(input);
  }

  /**
   * Create a new folder in Google Drive.
   *
   * @summary Create a Google Drive folder.
   *
   * @param headers
   * @param input The name of the folder to be created.
   *
   * @returns The unique ID of the created folder.
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleDrive_full.svg",
  )
  @ApiTags("Google Drive")
  @core.TypedRoute.Post("/folder")
  async createFolder(
    @core.TypedBody() input: IGoogleDrive.ICreateFolderGoogleDriveInput,
  ): Promise<IGoogleDrive.ICreateFolderGoogleDriveOutput> {
    return await this.googleDriveProvider.createFolder(input);
  }

  /**
   * Create a new file in Google Drive.
   *
   * @summary Create a Google Drive file.
   *
   * @param input The name of the file to be created and the unique ID of the folder where the file will be created.
   *
   * @returns The unique ID of the created file.
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleDrive_full.svg",
  )
  @ApiTags("Google Drive")
  @core.TypedRoute.Post("/file")
  async createFile(
    @core.TypedBody() input: IGoogleDrive.ICreateFileGoogleDriveInput,
  ): Promise<IGoogleDrive.ICreateFileGoogleDriveOutput> {
    return await this.googleDriveProvider.createFile(input);
  }

  /**
   * Delete a file in Google Drive.
   *
   * @summary Delete a Google Drive file.
   *
   * @param id The unique ID of the file to be deleted.
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleDrive_full.svg",
  )
  @ApiTags("Google Drive")
  @core.TypedRoute.Delete("/file/:id")
  async deleteFile(
    /**
     * @title File to delete
     * @description Please select the file to delete.
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
   * Delete a folder in Google Drive.
   *
   * @summary Delete a Google Drive folder.
   *
   * @param id The unique ID of the folder to be deleted.
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleDrive_full.svg",
  )
  @ApiTags("Google Drive")
  @core.TypedRoute.Delete("/folder/:id")
  async deleteFolder(
    /**
     * @title Folder to delete
     * @description Please select the folder to delete.
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
   * Grants permission to access a file or folder.
   *
   * @summary Grant Google Drive permission.
   *
   * @param input Information for granting permission.
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleDrive_full.svg",
  )
  @ApiTags("Google Drive")
  @core.TypedRoute.Post("permission")
  async permission(
    @core.TypedBody() input: IGoogleDrive.IPermissionGoogleDriveInput,
  ): Promise<void> {
    return await this.googleDriveProvider.permission(input);
  }

  /**
   * Add text to a file.
   *
   * @summary Add text to a Google Drive file.
   *
   * @param id Unique ID of the file.
   *
   * @param input The text to add.
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleDrive_full.svg",
  )
  @ApiTags("Google Drive")
  @core.TypedRoute.Post("/file/:id/text")
  async createText(
    /**
     * @title Select the file to which you want to add text
     * @description Select the file to which you want to add text
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
   * Read text from a file.
   *
   * @summary Read text from a Google Drive file.
   *
   * @param id Unique ID of the file.
   *
   * @returns The text content of the file.
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleDrive_full.svg",
  )
  @ApiTags("Google Drive")
  @core.TypedRoute.Post("get/file/:id")
  async readFile(
    /**
     * @title File to read
     * @description Please select the file to read.
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
