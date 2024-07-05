import { BadRequestException, Injectable } from "@nestjs/common";
import { google } from "googleapis";
import * as stream from "stream";

import { IGoogleDrive } from "@wrtn/connector-api/lib/structures/connector/google_drive/IGoogleDrive";

import { GoogleProvider } from "../../internal/google/GoogleProvider";

@Injectable()
export class GoogleDriveProvider {
  constructor(private readonly googleProvider: GoogleProvider) {}

  async folderList(
    input: IGoogleDrive.ISecret,
  ): Promise<IGoogleDrive.IFolderListGoogleDriveOutput> {
    const secretKey = input.secretKey;
    const accessToken = await this.googleProvider.refreshAccessToken(secretKey);
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

  async fileList(
    input: IGoogleDrive.IFileListGoogleDriveInput,
  ): Promise<IGoogleDrive.IFileListGoogleDriveOutput> {
    const secretKey = input.secretKey;
    const { folderId } = input;
    const authClient = new google.auth.OAuth2();
    const accessToken = await this.googleProvider.refreshAccessToken(secretKey);
    authClient.setCredentials({
      access_token: accessToken,
    });
    const drive = google.drive({ version: "v3", auth: authClient });
    const res = await drive.files.list({
      pageSize: 10,
      fields: "nextPageToken, files(id, name)",
      q: `'${folderId}' in parents and trashed = false`,
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

  async createFolder(
    input: IGoogleDrive.ICreateFolderGoogleDriveInput,
  ): Promise<IGoogleDrive.ICreateFolderGoogleDriveOutput> {
    const { name } = input;
    const secretKey = input.secretKey;
    const accessToken = await this.googleProvider.refreshAccessToken(secretKey);
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
    const secretKey = input.secretKey;
    const accessToken = await this.googleProvider.refreshAccessToken(secretKey);
    const authClient = new google.auth.OAuth2();

    authClient.setCredentials({ access_token: accessToken });

    const drive = google.drive({ version: "v3", auth: authClient });
    await drive.files.delete({
      fileId: id,
    });
  }

  async createFile(
    input: IGoogleDrive.ICreateFileGoogleDriveInput,
  ): Promise<IGoogleDrive.ICreateFileGoogleDriveOutput> {
    const { name, folderIds, content } = input;
    const secretKey = input.secretKey;
    const accessToken = await this.googleProvider.refreshAccessToken(secretKey);
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

  async deleteFile(id: string, input: IGoogleDrive.ISecret): Promise<void> {
    const secretKey = input.secretKey;
    const accessToken = await this.googleProvider.refreshAccessToken(secretKey);
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

    const secretKey = input.secretKey;
    const accessToken = await this.googleProvider.refreshAccessToken(secretKey);
    const authClient = new google.auth.OAuth2();

    authClient.setCredentials({ access_token: accessToken });

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
  }

  async appendText(
    id: string,
    input: IGoogleDrive.IAppendTextGoogleDriveInput,
  ): Promise<void> {
    const { text } = input;
    const secretKey = input.secretKey;
    const accessToken = await this.googleProvider.refreshAccessToken(secretKey);
    const authClient = new google.auth.OAuth2();

    authClient.setCredentials({ access_token: accessToken });

    const media = {
      mimeType: "text/plain",
      body: new stream.PassThrough().end(text),
    };
    try {
      await google.drive({ version: "v3", auth: authClient }).files.update({
        fileId: id,
        media: media,
      });
    } catch (err) {
      console.error(err);
    }
  }

  async readFile(
    id: string,
    input: IGoogleDrive.ISecret,
  ): Promise<IGoogleDrive.IReadFileGoogleDriveOutput> {
    const secretKey = input.secretKey;
    const accessToken = await this.googleProvider.refreshAccessToken(secretKey);
    const authClient = new google.auth.OAuth2();

    authClient.setCredentials({ access_token: accessToken });

    const drive = google.drive({ version: "v3", auth: authClient });
    const res = await drive.files.get(
      {
        fileId: id,
        alt: "media",
      },
      { responseType: "stream" },
    );
    let data = "";

    return new Promise((resolve, reject) => {
      res.data
        .on("data", (chunk) => (data += chunk))
        .on("end", () => {
          resolve({ data: data });
        })
        .on("error", (err) => {
          console.error(err);
          reject(err);
        });
    });
  }
}
