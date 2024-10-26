import { Injectable } from "@nestjs/common";
import { docs_v1, google, GoogleApis } from "googleapis";

import { IGoogleDocs } from "@wrtn/connector-api/lib/structures/connector/google_docs/IGoogleDocs";

import { decode } from "he";
import { Tokens } from "marked";
import { markdownConverter } from "../../../utils/markdown-converter";
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

  async getDocuments(input: IGoogleDocs.IAppendTextGoogleDocsInput) {
    const { documentId } = input;
    const token = await this.getToken(input.secretKey);
    const accessToken = await this.googleProvider.refreshAccessToken(token);
    const authClient = new google.auth.OAuth2();
    authClient.setCredentials({ access_token: accessToken });
    const docs = google.docs({ version: "v1", auth: authClient });
    const document = await docs.documents.get({ documentId });
    return document.data;
  }

  async append(input: IGoogleDocs.IAppendTextGoogleDocsInput) {
    try {
      const { documentId } = input;
      const token = await this.getToken(input.secretKey);
      const accessToken = await this.googleProvider.refreshAccessToken(token);
      const authClient = new google.auth.OAuth2();

      authClient.setCredentials({ access_token: accessToken });

      const docs = google.docs({ version: "v1", auth: authClient });
      const textRequests = convertMarkdownToGoogleDocsRequests(input);
      const document = await docs.documents.get({ documentId });
      // 문서의 끝 인덱스 반환
      const weight =
        (document.data.body?.content?.reduce<number>((acc, element) => {
          if (typeof element.endIndex === "number") {
            return Math.max(acc, element.endIndex);
          }
          return acc;
        }, 0) ?? 2) - 2; // 빈 문서는 줄바꿈 문자를 포함하여 최소 index가 2부터 시작한다.

      const weightedRequests = textRequests.map((request, i, arr) => {
        // 해당 스타일 적용 전 마지막 텍스트 삽입 요청을 찾는다.
        const lastInsertTextRequestIndex =
          i -
          1 - // 마지막 인덱스를 찾는 것이기 때문에 slice 한 다음의 배열 크기를 구하기 위함
          textRequests
            .slice(0, i)
            .reverse()
            .findIndex((el) => el.insertText);

        // 스타일이 적용될 대상
        const acc =
          lastInsertTextRequestIndex === 0
            ? 0 // 마지막 텍스트가 0번째에 있다면 이 텍스트 이전의 가중치 값을 구할 필요가 없다.
            : arr
                .slice(0, lastInsertTextRequestIndex - 1)
                .filter((el) => el.insertText)
                .map(({ insertText }) => {
                  return insertText?.text?.length ?? 0;
                })
                .reduce<number>((acc, cur) => acc + cur, 0);

        Object.values(request)
          .filter((value) => "range" in value)
          .forEach((value) => {
            const range: docs_v1.Schema$Range = value.range;
            if (range) {
              if (typeof range.startIndex === "number") {
                range.startIndex = range.startIndex + (weight + acc + 1);
              }

              if (typeof range.endIndex === "number") {
                range.endIndex = range.endIndex + (weight + acc + 1);
              }
            }
          });

        return request;
      });

      await docs.documents.batchUpdate({
        documentId: documentId,
        requestBody: {
          requests: weightedRequests,
        },
      });

      // console.log(
      //   JSON.stringify((await this.getDocuments(input)).body, null, 2),
      // );
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
  return markdownConverter<docs_v1.Schema$Request>({
    markdownString: input.text,
    weight: 0,
    defaultValue: {
      insertText: {
        endOfSegmentLocation: {},
        text: "\n",
      },
    },
    converter: {
      br: {
        convert: () => {
          return [
            {
              insertText: {
                endOfSegmentLocation: {},
                text: "\n",
              },
            },
          ];
        },
      },
      space: {
        convert: () => {
          return [
            {
              insertText: {
                endOfSegmentLocation: {},
                text: "\n",
              },
            },
          ];
        },
      },
      blockquote: {
        convert: (token: Tokens.Blockquote) => {
          const text = `\t“${token.text}”`;
          return [
            {
              insertText: {
                endOfSegmentLocation: {},
                text: text,
              },
            },
            {
              updateTextStyle: {
                range: {
                  startIndex: 0,
                  endIndex: text.length,
                },
                textStyle: {
                  foregroundColor: {
                    color: {
                      rgbColor: {
                        red: 0.36078432,
                        green: 0.36078432,
                        blue: 0.3647059,
                      },
                    },
                  },
                  bold: true,
                  italic: true,
                },
                fields: "foregroundColor,bold,italic",
              },
            },
          ];
        },
      },
      heading: {
        convert: (token) => {
          const depth = (token as any).depth;
          const fontSize = depth === 1 ? 22.5 : depth === 2 ? 18 : 15;
          const text = `\n${decode(token.text)}\n`;
          return [
            {
              insertText: {
                endOfSegmentLocation: {},
                text: text,
              },
            },
            {
              updateTextStyle: {
                range: {
                  startIndex: 0,
                  endIndex: text.length,
                },
                textStyle: {
                  bold: true,
                  italic: false,
                  fontSize: {
                    magnitude: fontSize,
                    unit: "PT",
                  },
                  foregroundColor: {
                    color: {
                      rgbColor: {
                        red: 0.15294118,
                        green: 0.15294118,
                        blue: 0.15294118,
                      },
                    },
                  },
                },
                fields: "bold,italic,fontSize,foregroundColor",
              },
            },
          ];
        },
      },
      paragraph: {
        convert: () => [], // 어차피 자식 노드에 text로 파싱되어야 하기 때문에 빈 배열로 한다.
        recursive: true,
      },
      code: {
        convert: (token) => {
          return [
            {
              insertText: {
                endOfSegmentLocation: {},
                text: token.text + "\n",
              },
            },
            {
              updateTextStyle: {
                range: {
                  startIndex: 0,
                  endIndex: token.text.length,
                },
                textStyle: {
                  fontSize: {
                    magnitude: 11,
                    unit: "PT",
                  },
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
                  weightedFontFamily: {
                    fontFamily: "Courier New",
                    weight: 400,
                  },
                },
                fields: "bold,backgroundColor,weightedFontFamily",
              },
            },
          ];
        },
      },
      list: {
        convert: (token: Tokens.List) => {
          token.items.forEach((child) => {
            (child as any).depth = ((token as any).depth ?? -1) + 1;
          });
          return [];
        },
        recursive: true,
      },
      list_item: {
        convert: (token: Tokens.ListItem & { depth: number }) => {
          token.tokens.forEach((child) => {
            (child as any).depth = (token as any).depth ?? 0;
            // list 안은 무조건 [textNode]가 자식이기 때문에 length가 1이다.
            (child as any).isLast = true;
          });

          const regexp = /^\d\.+/g;
          const number = token.raw.match(regexp)?.[0] ?? null;
          const prefix = "\t".repeat(token.depth);
          const text = number ? `${prefix}${number} ` : `${prefix}- `;

          return [
            {
              insertText: {
                endOfSegmentLocation: {},
                text: text,
              },
            },
            // {
            //   createParagraphBullets: {
            //     bulletPreset: "BULLET_DISC_CIRCLE_SQUARE",
            //     range: {
            //       startIndex: 0,
            //       endIndex: text.length,
            //     },
            //   },
            // },
            {
              updateTextStyle: {
                range: {
                  startIndex: 0,
                  endIndex: text.length,
                },
                textStyle: {
                  foregroundColor: {
                    color: {
                      rgbColor: {
                        red: 0.15294118,
                        green: 0.15294118,
                        blue: 0.15294118,
                      },
                    },
                  },
                },
                fields: "foregroundColor",
              },
            },
          ];
        },
        recursive: true,
      },
      strong: {
        convert: (token: Tokens.Strong & { isLast: boolean }) => {
          const child = token.tokens[0] as Tokens.Link | Tokens.Text;
          const text = decode(
            child.type === "link"
              ? token.isLast
                ? `${child.title ?? child.text ?? child.href}\n`
                : `${child.title ?? child.text ?? child.href}`
              : token.isLast
                ? `${child.text}\n`
                : `${child.text}`,
          );

          if (child.type === "link") {
            return [
              {
                insertText: {
                  endOfSegmentLocation: {},
                  text: text,
                },
              },
              {
                updateTextStyle: {
                  range: {
                    startIndex: 0,
                    endIndex: text.length,
                  },
                  textStyle: {
                    link: {
                      url: child.href,
                    },
                    bold: false,
                    italic: false,
                  },
                  fields: "link,bold,italic",
                },
              },
            ];
          } else {
            return [
              {
                insertText: {
                  endOfSegmentLocation: {},
                  text: text,
                },
              },
              {
                updateTextStyle: {
                  range: {
                    startIndex: 0,
                    endIndex: text.length,
                  },
                  textStyle: {
                    bold: true,
                  },
                  fields: "bold",
                },
              },
            ];
          }
        },
      },
      em: {
        convert: (token) => {
          return [
            {
              insertText: {
                endOfSegmentLocation: {},
                text: token.text,
              },
            },
            {
              updateTextStyle: {
                range: {
                  startIndex: 0,
                  endIndex: token.text.length,
                },
                textStyle: {
                  italic: true,
                  foregroundColor: {
                    color: {
                      rgbColor: {
                        red: 0.15294118,
                        green: 0.15294118,
                        blue: 0.15294118,
                      },
                    },
                  },
                },
                fields: "italic,foregroundColor",
              },
            },
          ];
        },
      },
      text: {
        convert: (
          token: Tokens.Text & {
            /**
             * 한 list_item을 구성하는 text node 중 마지막인 경우
             */
            isLast: boolean;
          },
        ) => {
          token.tokens?.forEach((child, i, arr) => {
            if (token.isLast && arr.length - 1 === i) {
              (child as any).isLast = true;
            }
          });

          const regexp = /\\n$/g;
          const text = regexp.test(token.raw)
            ? token.raw
            : token.isLast
              ? `${decode(token.text)}\n`
              : decode(token.text);
          return token.tokens?.length
            ? []
            : [
                {
                  insertText: {
                    endOfSegmentLocation: {},
                    text: text,
                  },
                },
                {
                  updateTextStyle: {
                    range: {
                      startIndex: 0,
                      endIndex: text.length,
                    },
                    textStyle: {
                      bold: false,
                      italic: false,
                      fontSize: {
                        magnitude: 11,
                        unit: "PT",
                      },
                      foregroundColor: {
                        color: {
                          rgbColor: {
                            red: 0.15294118,
                            green: 0.15294118,
                            blue: 0.15294118,
                          },
                        },
                      },
                    },
                    fields: "bold,italic,fontSize,foregroundColor",
                  },
                },
              ];
        },
        recursive: true,
      },
      link: {
        convert: (token: Tokens.Link & { isLast: boolean }) => {
          const text = decode(
            `${token.title ?? token.text ?? token.href}${token.isLast ? "\n" : ""}`,
          );
          return [
            {
              insertText: {
                endOfSegmentLocation: {},
                text: text,
              },
            },
            {
              updateTextStyle: {
                range: {
                  startIndex: 0,
                  endIndex: text.length,
                },
                textStyle: {
                  link: {
                    url: token.href,
                  },
                },
                fields: "link",
              },
            },
          ];
        },
      },
      hr: {
        convert: () => {
          const text = "—--------------------------------------------------\n";
          return [
            {
              insertText: {
                endOfSegmentLocation: {},
                text,
              },
            },
            {
              updateTextStyle: {
                range: {
                  startIndex: 0,
                  endIndex: text.length,
                },
                textStyle: {
                  bold: false,
                  italic: false,
                  foregroundColor: {
                    color: {
                      rgbColor: {
                        red: 0.7882353,
                        green: 0.7882353,
                        blue: 0.7882353,
                      },
                    },
                  },
                },
                fields: "bold,italic,foregroundColor",
              },
            },
          ];
        },
      },
    },
  });
}
