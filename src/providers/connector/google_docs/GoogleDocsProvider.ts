import { Injectable } from "@nestjs/common";
import { docs_v1, google } from "googleapis";

import { IGoogleDocs } from "@wrtn/connector-api/lib/structures/connector/google_docs/IGoogleDocs";

import { lexer, MarkedToken, Token } from "marked";
import typia from "typia";
import { GoogleProvider } from "../../internal/google/GoogleProvider";
import { OAuthSecretProvider } from "../../internal/oauth_secret/OAuthSecretProvider";
import { IOAuthSecret } from "../../internal/oauth_secret/structures/IOAuthSecret";

@Injectable()
export class GoogleDocsProvider {
  constructor(private readonly googleProvider: GoogleProvider) {}
  async createDocs(
    input: IGoogleDocs.ICreateGoogleDocsInput,
  ): Promise<IGoogleDocs.ICreateGoogleDocsOutput> {
    try {
      const token = await this.getToken(input.secretKey);
      const accessToken = await this.googleProvider.refreshAccessToken(token);
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
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  async permission(
    input: IGoogleDocs.IPermissionGoogleDocsInput,
  ): Promise<void> {
    try {
      const { documentId, permissions } = input;
      const token = await this.getToken(input.secretKey);
      const accessToken = await this.googleProvider.refreshAccessToken(token);
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
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  async readDocs(
    id: string,
    input: IGoogleDocs.ISecret,
  ): Promise<IGoogleDocs.IReadGoogleDocsOutput> {
    try {
      const token = await this.getToken(input.secretKey);
      const accessToken = await this.googleProvider.refreshAccessToken(token);
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
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  async createDocByTemplate(
    input: IGoogleDocs.ICreateDocByTemplateInput,
  ): Promise<IGoogleDocs.ICreateDocByTemplateOutput> {
    try {
      const { title, templateId } = input;
      const token = await this.getToken(input.secretKey);
      const accessToken = await this.googleProvider.refreshAccessToken(token);
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
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  async deleteById(id: string, input: IGoogleDocs.ISecret): Promise<void> {
    try {
      const token = await this.getToken(input.secretKey);
      const accessToken = await this.googleProvider.refreshAccessToken(token);
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
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  async list(
    input: IGoogleDocs.ISecret,
  ): Promise<IGoogleDocs.IListGoogleDocsOutput> {
    try {
      const token = await this.getToken(input.secretKey);
      const accessToken = await this.googleProvider.refreshAccessToken(token);
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
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  async append(input: IGoogleDocs.IAppendTextGoogleDocsInput) {
    try {
      const { documentId } = input;
      const token = await this.getToken(input.secretKey);
      const accessToken = await this.googleProvider.refreshAccessToken(token);
      const authClient = new google.auth.OAuth2();

      authClient.setCredentials({ access_token: accessToken });

      const docs = google.docs({
        version: "v1",
        auth: authClient,
      });

      const textRequests = convertMarkdownToGoogleDocsRequests(input);
      for await (const requests of textRequests) {
        if (requests.length > 0) {
          const document = await docs.documents.get({ documentId });
          const updateTextStyle = requests[1];
          if (
            typia.is<{
              updateTextStyle: docs_v1.Schema$UpdateTextStyleRequest;
            }>(updateTextStyle)
          ) {
            // 문서의 끝 인덱스 반환
            const weight =
              document.data.body?.content?.reduce((acc, element) => {
                if (typeof element.endIndex === "number") {
                  return Math.max(acc, element.endIndex);
                }
                return acc;
              }, 0) ?? 0; // 문서의 최소 인덱스는 1부터 시작

            console.log("weight: ", weight);
            const range = updateTextStyle.updateTextStyle.range;
            if (range) {
              if (typeof range.startIndex === "number") {
                range.startIndex = range.startIndex + weight;
              }

              if (typeof range.endIndex === "number") {
                range.endIndex = range.endIndex + weight;
              }
            }
          }

          console.log(JSON.stringify(requests, null, 2));

          await docs.documents.batchUpdate({
            documentId: documentId,
            requestBody: {
              requests: requests,
            },
          });
        }
      }
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
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

function convertMarkdownToGoogleDocsRequests(input: { text: string }) {
  const tokenList = lexer(input.text);
  return arrayTransform({ tokens: tokenList });
}

export function arrayTransform(options: {
  tokens: Token[];
  convertParagraph?: boolean;
}) {
  return options.tokens
    ?.map((token) => transform(token))
    .filter((el) => el !== null);
}

const is = typia.createIs<MarkedToken>();
function transform(
  token: Token,
): (
  | { insertText: docs_v1.Schema$InsertTextRequest }
  | { updateTextStyle: docs_v1.Schema$UpdateTextStyleRequest }
)[] {
  const target = is(token) ? token : null;
  if (target === null) {
    return [];
  }

  const targetMarkedToken = target as MarkedToken;
  if (targetMarkedToken.type === "space") {
    return [];
  }
  if (targetMarkedToken.type === "code") {
    return [
      {
        insertText: {
          endOfSegmentLocation: {},
          text: targetMarkedToken.text + "\n",
        },
      },
      {
        updateTextStyle: {
          range: {
            startIndex: 0,
            endIndex: targetMarkedToken.text.length,
          },
          textStyle: {
            bold: true,
            backgroundColor: {
              color: {
                rgbColor: {
                  red: 0.9,
                  green: 0.9,
                  blue: 0.9,
                },
              },
            },
          },
          fields: "bold,backgroundColor",
        },
      },
    ];
  }
  if (targetMarkedToken.type === "heading") {
    const headingLevel = (token as any).depth;
    const fontSize = headingLevel === 1 ? 24 : headingLevel === 2 ? 20 : 16;
    return [
      {
        insertText: {
          endOfSegmentLocation: {},
          text: targetMarkedToken.text + "\n",
        },
      },
      {
        updateTextStyle: {
          range: {
            startIndex: 0,
            endIndex: targetMarkedToken.text.length,
          },
          textStyle: {
            bold: true,
            fontSize: {
              magnitude: fontSize,
              unit: "PT",
            },
          },
          fields: "bold,fontSize",
        },
      },
    ];
  }
  if (targetMarkedToken.type === "table") {
    // 표를 다루는 로직은 더 복잡하며, 각 셀을 개별적으로 처리해야 함
    return [];
  }
  if (targetMarkedToken.type === "hr") {
    // 수평선을 삽입하는 로직
    return [
      {
        insertText: {
          endOfSegmentLocation: {},
          text: "\n---\n",
        },
      },
    ];
  }
  if (targetMarkedToken.type === "blockquote") {
    return [
      {
        insertText: {
          endOfSegmentLocation: {},
          text: targetMarkedToken.text + "\n",
        },
      },
      {
        updateTextStyle: {
          range: {
            startIndex: 0,
            endIndex: targetMarkedToken.text.length,
          },
          textStyle: {
            italic: true,
            foregroundColor: {
              color: {
                rgbColor: {
                  red: 0.6,
                  green: 0.6,
                  blue: 0.6,
                },
              },
            },
          },
          fields: "italic,foregroundColor",
        },
      },
    ];
  }
  if (targetMarkedToken.type === "list") {
    // 리스트 아이템을 다루는 로직 추가
    return [];
  }
  if (targetMarkedToken.type === "list_item") {
    // 각 리스트 아이템에 대한 로직 추가
    return [];
  }
  if (targetMarkedToken.type === "paragraph") {
    return [
      {
        insertText: {
          endOfSegmentLocation: {},
          text: targetMarkedToken.text + "\n",
        },
      },
    ];
  }
  if (targetMarkedToken.type === "html") {
    // HTML을 무시하거나 특정 동작 추가
    return [
      {
        insertText: {
          endOfSegmentLocation: {},
          text: targetMarkedToken.text + "\n",
        },
      },
    ];
  }
  if (targetMarkedToken.type === "text") {
    return [
      {
        insertText: {
          endOfSegmentLocation: {},
          text: targetMarkedToken.text + "\n",
        },
      },
    ];
  }
  if (targetMarkedToken.type === "strong") {
    return [
      {
        insertText: {
          endOfSegmentLocation: {},
          text: targetMarkedToken.text,
        },
      },
      {
        updateTextStyle: {
          range: {
            startIndex: 0,
            endIndex: targetMarkedToken.text.length,
          },
          textStyle: {
            bold: true,
          },
          fields: "bold",
        },
      },
    ];
  }
  if (targetMarkedToken.type === "em") {
    return [
      {
        insertText: {
          endOfSegmentLocation: {},
          text: targetMarkedToken.text,
        },
      },
      {
        updateTextStyle: {
          range: {
            startIndex: 0,
            endIndex: targetMarkedToken.text.length,
          },
          textStyle: {
            italic: true,
          },
          fields: "italic",
        },
      },
    ];
  }
  if (targetMarkedToken.type === "codespan") {
    return [
      {
        insertText: {
          endOfSegmentLocation: {},
          text: targetMarkedToken.text,
        },
      },
      {
        updateTextStyle: {
          range: {
            startIndex: 0,
            endIndex: targetMarkedToken.text.length,
          },
          textStyle: {
            bold: true,
            backgroundColor: {
              color: {
                rgbColor: {
                  red: 0.9,
                  green: 0.9,
                  blue: 0.9,
                },
              },
            },
          },
          fields: "bold,backgroundColor",
        },
      },
    ];
  }
  if (targetMarkedToken.type === "br") {
    return [
      {
        insertText: {
          endOfSegmentLocation: {},
          text: "\n",
        },
      },
    ];
  }
  if (targetMarkedToken.type === "del") {
    return [
      {
        insertText: {
          endOfSegmentLocation: {},
          text: targetMarkedToken.text,
        },
      },
      {
        updateTextStyle: {
          range: {
            startIndex: 0,
            endIndex: targetMarkedToken.text.length,
          },
          textStyle: {
            strikethrough: true,
          },
          fields: "strikethrough",
        },
      },
    ];
  }
  return [];
}
