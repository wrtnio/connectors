import { BadRequestException, Injectable } from "@nestjs/common";
import { google } from "googleapis";
import * as stream from "stream";

import { IGoogleDrive } from "@wrtn/connector-api/lib/structures/connector/google_drive/IGoogleDrive";

import axios from "axios";
import mime from "mime";
import { GoogleProvider } from "../../internal/google/GoogleProvider";
import { OAuthSecretProvider } from "../../internal/oauth_secret/OAuthSecretProvider";
import { IOAuthSecret } from "../../internal/oauth_secret/structures/IOAuthSecret";

@Injectable()
export class GoogleDriveProvider {
  constructor(private readonly googleProvider: GoogleProvider) {}

  async folderList(
    input: IGoogleDrive.ISecret,
  ): Promise<IGoogleDrive.IFolderListGoogleDriveOutput> {
    const token = await this.getToken(input.secretKey);
    const accessToken = await this.googleProvider.refreshAccessToken(token);
    const authClient = new google.auth.OAuth2();

    authClient.setCredentials({ access_token: accessToken });

    const drive = google.drive({ version: "v3", auth: authClient });
    const res = await drive.files.list({
      q: "mimeType = 'application/vnd.google-apps.folder' and trashed = false",
    });
    const files = res.data.files;
    if (!files || !files.length) {
      return { data: [] };
    }

    const output = files.map((file) => {
      return {
        id: file.id,
        name: file.name,
      };
    });
    return { data: output };
  }

  async getFolderByName(
    input: { name: string } & IGoogleDrive.ISecret,
  ): Promise<string | null> {
    const token = await this.getToken(input.secretKey);
    const accessToken = await this.googleProvider.refreshAccessToken(token);
    const authClient = new google.auth.OAuth2();

    authClient.setCredentials({ access_token: accessToken });

    try {
      const drive = google.drive({ version: "v3", auth: authClient });
      const res = await drive.files.list({
        q: `mimeType = 'application/vnd.google-apps.folder' and trashed = false and name = '${input.name}'`,
      });

      return res.data.files?.at(0)?.id ?? null;
    } catch (err) {
      console.error(JSON.stringify((err as any)?.response.data));
      throw err;
    }
  }

  async fileList(
    input: IGoogleDrive.IFileListGoogleDriveInput,
  ): Promise<IGoogleDrive.IFileListGoogleDriveOutput> {
    const { folderId } = input;
    const token = await this.getToken(input.secretKey);
    const authClient = new google.auth.OAuth2();
    const accessToken = await this.googleProvider.refreshAccessToken(token);
    authClient.setCredentials({
      access_token: accessToken,
    });
    const drive = google.drive({ version: "v3", auth: authClient });
    const res = await drive.files.list({
      pageSize: 10,
      fields: "nextPageToken, files(id, name)",
      q: folderId
        ? `'${folderId}' in parents and trashed = false`
        : `trashed = false`,
    });
    const files = res.data.files;
    if (!files || !files.length) {
      return { data: [] };
    }
    const output = files.map((file) => {
      return {
        id: file.id,
        name: file.name,
        webContentLink: file.webContentLink,
      };
    });

    return { data: output };
  }

  async createFolder(
    input: IGoogleDrive.ICreateFolderGoogleDriveInput,
  ): Promise<IGoogleDrive.ICreateFolderGoogleDriveOutput> {
    const { name } = input;
    const token = await this.getToken(input.secretKey);
    const accessToken = await this.googleProvider.refreshAccessToken(token);
    const authClient = new google.auth.OAuth2();

    authClient.setCredentials({ access_token: accessToken });

    const drive = google.drive({ version: "v3", auth: authClient });
    const res = await drive.files.create({
      requestBody: {
        name: name,
        mimeType: "application/vnd.google-apps.folder",
      },
    });
    const id = res.data.id;
    if (!id) {
      throw new Error("Failed to create new folder");
    }

    return { id };
  }

  async deleteFolder(id: string, input: IGoogleDrive.ISecret): Promise<void> {
    const token = await this.getToken(input.secretKey);
    const accessToken = await this.googleProvider.refreshAccessToken(token);
    const authClient = new google.auth.OAuth2();

    authClient.setCredentials({ access_token: accessToken });

    const drive = google.drive({ version: "v3", auth: authClient });
    await drive.files.delete({
      fileId: id,
    });
  }

  /**
   * @deprecated
   * @param input
   * @returns
   */
  async createFile(
    input: IGoogleDrive.ICreateFileGoogleDriveInput,
  ): Promise<IGoogleDrive.ICreateFileGoogleDriveOutput> {
    const { name, folderIds, content } = input;
    const token = await this.getToken(input.secretKey);
    const accessToken = await this.googleProvider.refreshAccessToken(token);
    const authClient = new google.auth.OAuth2();

    authClient.setCredentials({ access_token: accessToken });
    const drive = google.drive({ version: "v3", auth: authClient });
    const fileMetadata = {
      name: name,
      mimeType: content,
      parents: folderIds,
    };
    const res = await drive.files.create({
      requestBody: fileMetadata,
    });
    const id = res.data.id;
    // response id can be null even when exception wasn't explictly thrown, so handle as unknown error
    if (!id) {
      throw new Error("Failed to create new file");
    }

    return { id };
  }

  async uploadFile(
    input: IGoogleDrive.IUploadFileInput,
  ): Promise<IGoogleDrive.ICreateFileGoogleDriveOutput> {
    const { name, folderIds, fileUrl } = input;
    const { data: arrayBuffer } = await axios.get(fileUrl, {
      responseType: "arraybuffer",
    });
    const token = await this.getToken(input.secretKey);
    const accessToken = await this.googleProvider.refreshAccessToken(token);
    const authClient = new google.auth.OAuth2();

    const mimeType = mime.lookup(fileUrl);
    authClient.setCredentials({ access_token: accessToken });
    const drive = google.drive({ version: "v3", auth: authClient });
    const body = stream.Readable.from(Buffer.from(arrayBuffer));
    const { default: fileType } = await import("file-type");
    const fileTypeResponse = await fileType.fromBuffer(arrayBuffer);
    const res = await drive.files.create({
      media: { body: body },
      requestBody: {
        mimeType:
          mimeType ?? fileTypeResponse?.mime ?? "application/octet-stream",
        name,
        parents: folderIds,
      },
    });

    const id = res.data.id;
    // response id can be null even when exception wasn't explictly thrown, so handle as unknown error
    if (!id) {
      throw new Error("Failed to create new file");
    }

    return { id };
  }

  async deleteFile(id: string, input: IGoogleDrive.ISecret): Promise<void> {
    const token = await this.getToken(input.secretKey);
    const accessToken = await this.googleProvider.refreshAccessToken(token);
    const authClient = new google.auth.OAuth2();

    authClient.setCredentials({ access_token: accessToken });

    const drive = google.drive({ version: "v3", auth: authClient });
    await drive.files.delete({
      fileId: id,
    });
  }

  async permission(
    input: IGoogleDrive.IPermissionGoogleDriveInput,
  ): Promise<void> {
    const { fileId, folderId, permissions } = input;
    if (!!fileId == !!folderId) {
      throw new BadRequestException(
        "Either a file ID or a folder ID is required.",
      );
    }

    const token = await this.getToken(input.secretKey);
    const accessToken = await this.googleProvider.refreshAccessToken(token);
    const authClient = new google.auth.OAuth2();

    authClient.setCredentials({ access_token: accessToken });

    try {
      const drive = google.drive({ version: "v3", auth: authClient });
      for (const permission of permissions) {
        const input = {
          emailAddress: permission.email,
          role: permission.role,
          type: permission.type,
        };
        await drive.permissions.create({
          fileId: fileId || folderId,
          requestBody: input,
          sendNotificationEmail: false,
        });
      }
    } catch (err) {
      console.error(JSON.stringify((err as any)?.response.data));
      throw err;
    }
  }

  async getFile(
    fileId: string,
    input: IGoogleDrive.ISecret,
  ): Promise<IGoogleDrive.IGetFileOutput> {
    const token = await this.getToken(input.secretKey);
    const accessToken = await this.googleProvider.refreshAccessToken(token);

    try {
      const res = await axios.get(
        `https://www.googleapis.com/drive/v2/files/${fileId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      return res.data;
    } catch (err) {
      console.error(JSON.stringify((err as any)?.response.data));
      throw err;
    }
  }

  private async getToken(secretValue: string): Promise<string> {
    const secret = await OAuthSecretProvider.getSecretValue(secretValue);
    const token =
      typeof secret === "string"
        ? secret
        : (secret as IOAuthSecret.ISecretValue).value;
    return token;
  }
}
