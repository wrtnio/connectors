import { Injectable } from "@nestjs/common";
import { google } from "googleapis";

import { ICommon } from "@wrtn/connector-api/lib/structures/connector/common/ISecretValue";
import { IGoogleDocs } from "@wrtn/connector-api/lib/structures/connector/google_docs/IGoogleDocs";

import { GoogleProvider } from "../../internal/google/GoogleProvider";

@Injectable()
export class GoogleDocsProvider {
  constructor(private readonly googleProvider: GoogleProvider) {}
  async createDocs(
    input: IGoogleDocs.ICreateGoogleDocsInput,
  ): Promise<IGoogleDocs.ICreateGoogleDocsOutput> {
    try {
      const secretKey = input.secretKey;
      const accessToken =
        await this.googleProvider.refreshAccessToken(secretKey);
      const authClient = new google.auth.OAuth2();

      authClient.setCredentials({ access_token: accessToken });

      const docs = google.docs({
        version: "v1",
        auth: authClient,
      });
      const res = await docs.documents.create({
        requestBody: {
          title: input.title,
        },
      });
      const id = res.data.documentId;
      if (!id) {
        throw new Error("Failed to create new doc");
      }
      return { id };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async permission(
    input: IGoogleDocs.IPermissionGoogleDocsInput,
  ): Promise<void> {
    try {
      const { documentId, permissions } = input;
      const secretKey = input.secretKey;
      const accessToken =
        await this.googleProvider.refreshAccessToken(secretKey);
      const authClient = new google.auth.OAuth2();

      authClient.setCredentials({ access_token: accessToken });

      const drive = google.drive({ version: "v3", auth: authClient });
      for (let i = 0; i < permissions.length; i++) {
        await drive.permissions.create({
          fileId: documentId,
          requestBody: {
            role: permissions[i].role,
            type: permissions[i].type,
            emailAddress: permissions[i].email,
          },
          sendNotificationEmail: false,
        });
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async readDocs(
    id: string,
    input: ICommon.ISecret<"google", any>,
  ): Promise<IGoogleDocs.IReadGoogleDocsOutput> {
    try {
      const secretKey = input.secretKey;
      const accessToken =
        await this.googleProvider.refreshAccessToken(secretKey);
      const authClient = new google.auth.OAuth2();

      authClient.setCredentials({ access_token: accessToken });

      const docs = google.docs({
        version: "v1",
        auth: authClient,
      });
      const response = await docs.documents.get({
        documentId: id,
      });
      let documentText = "";
      const content = response.data.body?.content;

      if (!content) {
        return { data: { text: "", table: [] } };
      }

      // 모든 표의 데이터를 담을 배열입니다.
      const tables: string[][][] = [];
      content.forEach((structuralElement) => {
        /**
         * 텍스트만을 읽어온다.
         */
        if (structuralElement.paragraph) {
          structuralElement.paragraph?.elements?.forEach((element) => {
            if (element.textRun) {
              documentText += element.textRun.content;
            }
          });
        }
        /**
         * 테이블 정보를 읽어온다.
         */
        if (structuralElement.table) {
          // 하나의 표를 나타내는 배열입니다.
          const table: string[][] = [];
          // 표를 나타내는 table 요소에 접근합니다.
          structuralElement.table.tableRows?.forEach((row) => {
            const rowData: string[] = [];
            row.tableCells?.forEach((cell) => {
              // 각 셀의 텍스트를 추출합니다.
              let cellText = "";
              cell.content?.forEach((cellContent) => {
                if (cellContent.paragraph) {
                  cellContent.paragraph.elements?.forEach((element) => {
                    if (element.textRun) {
                      cellText += element.textRun.content;
                    }
                  });
                }
              });
              rowData.push(cellText.trim());
            });
            // 행 데이터를 표 배열에 추가합니다.
            table.push(rowData);
          });
          // 완성된 표를 테이블들의 배열에 추가합니다.
          tables.push(table);
        }
      });

      return {
        data: {
          text: documentText,
          table: tables,
        },
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createDocByTemplate(
    input: IGoogleDocs.ICreateDocByTemplateInput,
  ): Promise<IGoogleDocs.ICreateDocByTemplateOutput> {
    try {
      const { title, templateId } = input;
      const secretKey = input.secretKey;
      const accessToken =
        await this.googleProvider.refreshAccessToken(secretKey);
      const authClient = new google.auth.OAuth2();

      authClient.setCredentials({ access_token: accessToken });

      const drive = google.drive({
        version: "v3",
        auth: authClient,
      });

      const copy = await drive.files.copy({
        fileId: templateId,
        requestBody: {
          name: title,
        },
      });
      const newDocId = copy.data.id;
      if (!newDocId) {
        throw new Error("Failed to create new doc");
      }

      return {
        id: newDocId,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteById(
    id: string,
    input: ICommon.ISecret<"google", any>,
  ): Promise<void> {
    try {
      const secretKey = input.secretKey;
      const accessToken =
        await this.googleProvider.refreshAccessToken(secretKey);
      const authClient = new google.auth.OAuth2();

      authClient.setCredentials({ access_token: accessToken });

      const drive = google.drive({
        version: "v3",
        auth: authClient,
      });
      await drive.files.delete({
        fileId: id,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async list(
    input: ICommon.ISecret<"google", any>,
  ): Promise<IGoogleDocs.IListGoogleDocsOutput> {
    try {
      const secretKey = input.secretKey;
      const accessToken =
        await this.googleProvider.refreshAccessToken(secretKey);
      const authClient = new google.auth.OAuth2();

      authClient.setCredentials({ access_token: accessToken });

      const drive = google.drive({
        version: "v3",
        auth: authClient,
      });
      const res = await drive.files.list({
        pageSize: 10,
        fields: "nextPageToken, files(id, name)",
        q: "mimeType='application/vnd.google-apps.document' and 'me' in owners and trashed = false",
      });

      const files = res.data.files;
      if (!files || !files.length) {
        return { data: [] };
      }

      const list = files.map((file) => {
        return {
          id: file.id,
          name: file.name,
          createdTime: file.createdTime,
          mimeType: file.mimeType,
          deleted: file.trashed,
        };
      });

      return { data: list };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async append(input: IGoogleDocs.IAppendTextGoogleDocsInput) {
    try {
      const { documentId, text } = input;
      const secretKey = input.secretKey;
      const accessToken =
        await this.googleProvider.refreshAccessToken(secretKey);
      const authClient = new google.auth.OAuth2();

      authClient.setCredentials({ access_token: accessToken });

      const docs = google.docs({
        version: "v1",
        auth: authClient,
      });
      await docs.documents.batchUpdate({
        documentId: documentId,
        requestBody: {
          requests: [
            {
              insertText: {
                location: {
                  index: 1,
                },
                text: text,
              },
            },
          ],
        },
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
