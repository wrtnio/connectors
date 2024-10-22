import { Injectable } from "@nestjs/common";
import { docs_v1, google } from "googleapis";

import { IGoogleDocs } from "@wrtn/connector-api/lib/structures/connector/google_docs/IGoogleDocs";

import typia from "typia";
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

      const weightedRequests = textRequests.map((request, i) => {
        if (
          typia.is<{
            updateTextStyle: docs_v1.Schema$UpdateTextStyleRequest;
          }>(request)
        ) {
          const range = request.updateTextStyle.range;
          if (range) {
            console.log(weight, range);
            if (typeof range.startIndex === "number") {
              range.startIndex = range.startIndex + (weight + 1);
            }

            if (typeof range.endIndex === "number") {
              range.endIndex = range.endIndex + (weight + 1);
            }
          }
        }
        return request;
      });

      console.log(
        "weightedRequests: ",
        JSON.stringify(weightedRequests, null, 2),
      );

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
      heading: {
        convert: (token, localWeight = 0) => {
          console.log("heading token:", token);
          const headingLevel = (token as any).depth;
          const fontSize =
            headingLevel === 1 ? 24 : headingLevel === 2 ? 20 : 16;
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
                  startIndex: localWeight,
                  endIndex: token.text.length + localWeight,
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
        },
      },
      paragraph: {
        convert: () => [], // 어차피 자식 노드에 text로 파싱되어야 하기 때문에 빈 배열로 한다.
        recursive: true,
      },
      code: {
        convert: (token, localWeight = 0) => {
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
                  startIndex: localWeight,
                  endIndex: token.text.length + localWeight,
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
                },
                fields: "bold,backgroundColor",
              },
            },
          ];
        },
      },
      list: {
        convert: (token) => {
          return [
            {
              insertText: {
                endOfSegmentLocation: {},
                text: token.raw,
              },
            },
          ];
        },
      },
      strong: {
        convert: (token, localWeight = 0) => {
          console.log("strong", token);
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
                  startIndex: localWeight,
                  endIndex: token.text.length + localWeight,
                },
                textStyle: {
                  bold: true,
                },
                fields: "bold",
              },
            },
          ];
        },
      },
      em: {
        convert: (token, localWeight = 0) => {
          console.log("em", token);
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
                  startIndex: localWeight,
                  endIndex: token.text.length + localWeight,
                },
                textStyle: {
                  italic: true,
                },
                fields: "italic",
              },
            },
          ];
        },
      },

      // list_item: {
      //   convert: (token) => {
      //     console.log("list_item: ", token);
      //     return [
      //       {
      //         insertText: {
      //           endOfSegmentLocation: {},
      //           text: token.text + "\n",
      //         },
      //       },
      //     ];
      //   },
      //   recursive: false,
      // },
      text: {
        convert: (token) => {
          return [
            {
              insertText: {
                endOfSegmentLocation: {},
                text: token.text + "\n",
              },
            },
          ];
        },
      },
    },
  });
}

// function convertMarkdownToGoogleDocsRequests(input: { text: string }) {
//   const tokenList = lexer(input.text);
//   return arrayTransform({ tokens: tokenList });
// }

// export function arrayTransform(options: {
//   tokens: Token[];
//   parentLocalWeight?: number;
// }) {
//   return options.tokens
//     .map((token) => {
//       const target = is(token) ? token : null;
//       if (target === null) {
//         return null;
//       }
//       return target;
//     })
//     .filter((el) => el !== null)
//     ?.flatMap((token, currentTokenIndex, arr) => {
//       const previous = arr.slice(0, currentTokenIndex);
//       const localWeight = previous
//         .map((el) => {
//           let localWeight = 0;
//           localWeight += "text" in el ? el.text.length : 1;

//           return localWeight;
//         })
//         .reduce((acc, cur) => acc + cur, 0);

//       const transformed = transform(
//         token,
//         localWeight + currentTokenIndex + (options.parentLocalWeight ?? 0),
//       ); // google docs는 무조건 0번째에 break가 있기 때문에 1번부터가 첫 문장 시작점이다.

//       console.log(token, transformed);
//       return transformed;
//     })
//     .filter((el) => el !== null);
// }

// const is = typia.createIs<MarkedToken>();
// function transform(
//   token: Token,
//   localWeight: number = 0,
// ): (
//   | { insertText: docs_v1.Schema$InsertTextRequest }
//   | { updateTextStyle: docs_v1.Schema$UpdateTextStyleRequest }
// )[] {
//   if ("tokens" in token) {
//     return arrayTransform({
//       tokens: token.tokens ?? [],
//       parentLocalWeight: localWeight,
//     });
//   }

//   if (token.type === "space") {
//     return [
//       {
//         insertText: {
//           endOfSegmentLocation: {},
//           text: "\n",
//         },
//       },
//     ];
//   }
//   if (token.type === "code") {
//     return [
//       {
//         insertText: {
//           endOfSegmentLocation: {},
//           text: token.text + "\n",
//         },
//       },
//       {
//         updateTextStyle: {
//           range: {
//             startIndex: localWeight,
//             endIndex: token.text.length + localWeight,
//           },
//           textStyle: {
//             fontSize: {
//               magnitude: 11,
//               unit: "PT",
//             },
//             bold: true,
//             backgroundColor: {
//               color: {
//                 rgbColor: {
//                   red: 0.9,
//                   green: 0.9,
//                   blue: 0.9,
//                 },
//               },
//             },
//           },
//           fields: "bold,backgroundColor",
//         },
//       },
//     ];
//   }
//   if (token.type === "heading") {
//     console.log("token: ", token);
//     const headingLevel = (token as any).depth;
//     const fontSize = headingLevel === 1 ? 24 : headingLevel === 2 ? 20 : 16;
//     return [
//       {
//         insertText: {
//           endOfSegmentLocation: {},
//           text: token.text + "\n",
//         },
//       },
//       {
//         updateTextStyle: {
//           range: {
//             startIndex: localWeight,
//             endIndex: token.text.length + localWeight,
//           },
//           textStyle: {
//             bold: true,
//             fontSize: {
//               magnitude: fontSize,
//               unit: "PT",
//             },
//           },
//           fields: "bold,fontSize",
//         },
//       },
//     ];
//   }
//   if (token.type === "table") {
//     // 표를 다루는 로직은 더 복잡하며, 각 셀을 개별적으로 처리해야 함
//     return [];
//   }
//   if (token.type === "hr") {
//     // 수평선을 삽입하는 로직
//     // const horizontalLine = "_________________________\n";
//     const horizontalLine = "-------------------------\n";
//     return [
//       {
//         insertText: {
//           endOfSegmentLocation: {},
//           text: horizontalLine,
//         },
//       },
//       {
//         updateTextStyle: {
//           range: {
//             startIndex: localWeight,
//             endIndex: localWeight + horizontalLine.length,
//           },
//           fields: "*",
//         },
//       },
//     ];
//   }
//   if (token.type === "blockquote") {
//     return [
//       {
//         insertText: {
//           endOfSegmentLocation: {},
//           text: token.text + "\n",
//         },
//       },
//       {
//         updateTextStyle: {
//           range: {
//             startIndex: localWeight,
//             endIndex: token.text.length + localWeight,
//           },
//           textStyle: {
//             italic: true,
//             foregroundColor: {
//               color: {
//                 rgbColor: {
//                   red: 0.6,
//                   green: 0.6,
//                   blue: 0.6,
//                 },
//               },
//             },
//           },
//           fields: "italic,foregroundColor",
//         },
//       },
//     ];
//   }
//   if (token.type === "list") {
//     // 리스트 아이템을 다루는 로직 추가
//     // return []
//     // return [
//     //   {
//     //     insertText: {
//     //       endOfSegmentLocation: {},
//     //       text: token.raw,
//     //     },
//     //   },
//     //   {
//     //     updateTextStyle: {
//     //       range: {
//     //         startIndex: localWeight,
//     //         endIndex: token.raw.length + localWeight,
//     //       },
//     //       fields: "*",
//     //     },
//     //   },
//     // ];
//   }
//   if (token.type === "list_item") {
//     // 각 리스트 아이템에 대한 로직 추가

//     console.log("hagasasdsad", JSON.stringify(token, null, 2));
//     return [
//       {
//         insertText: {
//           endOfSegmentLocation: {},
//           text: token.raw,
//         },
//       },
//       {
//         updateTextStyle: {
//           range: {
//             startIndex: localWeight,
//             endIndex: token.text.length + localWeight,
//           },
//           fields: "*",
//         },
//       },
//     ];
//   }
//   if (token.type === "paragraph") {
//     return [
//       {
//         insertText: {
//           endOfSegmentLocation: {},
//           text: token.text + "\n",
//         },
//       },
//       {
//         updateTextStyle: {
//           range: {
//             startIndex: localWeight,
//             endIndex: token.text.length + localWeight,
//           },
//           fields: "*",
//         },
//       },
//     ];
//   }
//   if (token.type === "html") {
//     // HTML을 무시하거나 특정 동작 추가
//     return [
//       {
//         insertText: {
//           endOfSegmentLocation: {},
//           text: token.text + "\n",
//         },
//       },
//     ];
//   }
//   if (token.type === "text") {
//     return [
//       {
//         insertText: {
//           endOfSegmentLocation: {},
//           text: token.text + "\n",
//         },
//       },
//     ];
//   }
//   if (token.type === "strong") {
//     return [
//       {
//         insertText: {
//           endOfSegmentLocation: {},
//           text: token.text,
//         },
//       },
//       {
//         updateTextStyle: {
//           range: {
//             startIndex: localWeight,
//             endIndex: token.text.length + localWeight,
//           },
//           textStyle: {
//             bold: true,
//           },
//           fields: "bold",
//         },
//       },
//     ];
//   }
//   if (token.type === "em") {
//     return [
//       {
//         insertText: {
//           endOfSegmentLocation: {},
//           text: token.text,
//         },
//       },
//       {
//         updateTextStyle: {
//           range: {
//             startIndex: localWeight,
//             endIndex: token.text.length + localWeight,
//           },
//           textStyle: {
//             italic: true,
//           },
//           fields: "italic",
//         },
//       },
//     ];
//   }
//   if (token.type === "codespan") {
//     return [
//       {
//         insertText: {
//           endOfSegmentLocation: {},
//           text: token.text,
//         },
//       },
//       {
//         updateTextStyle: {
//           range: {
//             startIndex: localWeight,
//             endIndex: token.text.length + localWeight,
//           },
//           textStyle: {
//             bold: true,
//             backgroundColor: {
//               color: {
//                 rgbColor: {
//                   red: 0.9,
//                   green: 0.9,
//                   blue: 0.9,
//                 },
//               },
//             },
//           },
//           fields: "bold,backgroundColor",
//         },
//       },
//     ];
//   }
//   if (token.type === "br") {
//     return [
//       {
//         insertText: {
//           endOfSegmentLocation: {},
//           text: "\n",
//         },
//       },
//     ];
//   }
//   if (token.type === "del") {
//     return [
//       {
//         insertText: {
//           endOfSegmentLocation: {},
//           text: token.text,
//         },
//       },
//       {
//         updateTextStyle: {
//           range: {
//             startIndex: localWeight,
//             endIndex: token.text.length + localWeight,
//           },
//           textStyle: {
//             strikethrough: true,
//           },
//           fields: "strikethrough",
//         },
//       },
//     ];
//   }
//   return [];
// }

// new GoogleDocsProvider(new GoogleProvider()).append({
//   secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
//   documentId: "1DcPNAeOE378oi3lRkAOf8IW7FF0qLELrYMkVsMwg-J4",
//   text: `# 12345
// 12345
// ## 12345
// ### 12345
// \`\`\`ts
// console.log(12345);
// \`\`\`
// - 12345
// - 12345
// 1. 12345
// 2. 12345
// *12345*
// **67890**
// `,
// });
