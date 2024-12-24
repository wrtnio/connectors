import { docs_v1, google } from "googleapis";

import { IGoogleDocs } from "@wrtn/connector-api/lib/structures/connector/google_docs/IGoogleDocs";

import { decode } from "he";
import { Tokens } from "marked";
import { markdownConverter } from "../../../utils/markdown-converter";
import { GoogleProvider } from "../../internal/google/GoogleProvider";
import { OAuthSecretProvider } from "../../internal/oauth_secret/OAuthSecretProvider";

export namespace GoogleDocsProvider {
  export async function update(
    file_id: string,
    input: IGoogleDocs.IUpdateInput,
  ): Promise<IGoogleDocs.IUpdateOutput> {
    const token = await OAuthSecretProvider.getSecretValue(input.secretKey);
    const accessToken = await GoogleProvider.refreshAccessToken(token);
    const authClient = new google.auth.OAuth2();

    authClient.setCredentials({ access_token: accessToken });
    const drive = google.drive({ version: "v2", auth: authClient });

    if (
      ("title" in input && input.title) ||
      ("contents" in input && input.contents)
    ) {
      await drive.files.update({
        fileId: file_id,
        ...("contents" in input &&
          input.contents && {
            media: { mimeType: "text/markdown", body: input.contents },
          }),
        ...("title" in input &&
          input.title && { requestBody: { title: input.title } }),
      });
    }

    return {
      id: file_id,
      url: `https://docs.google.com/document/d/${file_id as string}/`,
    };
  }

  export async function clear(
    input: IGoogleDocs.IClearInput,
  ): Promise<IGoogleDocs.IClearOutput> {
    const token = await OAuthSecretProvider.getSecretValue(input.secretKey);
    const accessToken = await GoogleProvider.refreshAccessToken(token);
    const authClient = new google.auth.OAuth2();

    authClient.setCredentials({ access_token: accessToken });
    const docs = google.docs({ version: "v1", auth: authClient });
    const document = await docs.documents.get({
      documentId: input.documentId,
      fields: "body.content(startIndex,endIndex)",
    });

    const content = document.data.body?.content;
    if (content instanceof Array && content.length >= 2) {
      const startIndex = content[0].endIndex;
      const lastContent = content[content.length - 1].endIndex! - 1;
      await docs.documents.batchUpdate({
        documentId: input.documentId,
        requestBody: {
          requests: [
            {
              deleteContentRange: {
                range: {
                  startIndex: startIndex,
                  endIndex: lastContent,
                },
              },
            },
          ],
        },
      });
    }

    const url = `https://docs.google.com/document/d/${input.documentId as string}/`;
    return { id: input.documentId, url };
  }

  export async function write(
    input: IGoogleDocs.IRequest,
  ): Promise<IGoogleDocs.IResponse> {
    const token = await OAuthSecretProvider.getSecretValue(input.secretKey);
    const accessToken = await GoogleProvider.refreshAccessToken(token);
    const authClient = new google.auth.OAuth2();

    authClient.setCredentials({ access_token: accessToken });
    const drive = google.drive({ version: "v3", auth: authClient });

    const markdownFile = await drive.files.create({
      media: {
        body: input.markdown,
      },
      requestBody: {
        name: `${input.name}.md`,
        mimeType: "text/markdown",
        ...(input.folderId && { parents: [input.folderId] }),
      },
    });

    const googleDocsFile = await drive.files.copy({
      fileId: markdownFile.data.id as string,
      requestBody: {
        name: input.name,
        mimeType: "application/vnd.google-apps.document" as const,
      },
      supportsAllDrives: true,
    });

    return {
      markdown: {
        id: markdownFile.data.id as string,
      },
      googleDocs: {
        id: googleDocsFile.data.id as string,
        url: `https://docs.google.com/document/d/${googleDocsFile.data.id as string}/`,
      },
    };
  }

  export async function createDocs(
    input: IGoogleDocs.ICreateGoogleDocsInput,
  ): Promise<IGoogleDocs.ICreateEmptyFileOutput> {
    try {
      const token = await OAuthSecretProvider.getSecretValue(input.secretKey);
      const accessToken = await GoogleProvider.refreshAccessToken(token);
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

      return {
        id,
        url: `https://docs.google.com/document/d/${id}/`,
        isEmpty: true,
        message: "the content is empty; you can now fill content in there",
      };
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function permission(
    input: IGoogleDocs.IPermissionGoogleDocsInput,
  ): Promise<void> {
    try {
      const { documentId, permissions } = input;
      const token = await OAuthSecretProvider.getSecretValue(input.secretKey);
      const accessToken = await GoogleProvider.refreshAccessToken(token);
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

  export async function readDocs(
    id: string,
    input: IGoogleDocs.ISecret,
  ): Promise<IGoogleDocs.IReadGoogleDocsOutput> {
    try {
      const token = await OAuthSecretProvider.getSecretValue(input.secretKey);
      const accessToken = await GoogleProvider.refreshAccessToken(token);
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

  export async function createDocByTemplate(
    input: IGoogleDocs.ICreateDocByTemplateInput,
  ): Promise<IGoogleDocs.ICreateDocByTemplateOutput> {
    try {
      const { title, templateId } = input;
      const token = await OAuthSecretProvider.getSecretValue(input.secretKey);
      const accessToken = await GoogleProvider.refreshAccessToken(token);
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

  export async function deleteById(
    id: string,
    input: IGoogleDocs.ISecret,
  ): Promise<void> {
    try {
      const token = await OAuthSecretProvider.getSecretValue(input.secretKey);
      const accessToken = await GoogleProvider.refreshAccessToken(token);
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

  export async function list(
    input: IGoogleDocs.ISecret,
  ): Promise<IGoogleDocs.IListGoogleDocsOutput> {
    try {
      const token = await OAuthSecretProvider.getSecretValue(input.secretKey);
      const accessToken = await GoogleProvider.refreshAccessToken(token);
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

  export async function getDocuments(
    input: IGoogleDocs.IAppendTextGoogleDocsInput,
  ) {
    const { documentId } = input;
    const token = await OAuthSecretProvider.getSecretValue(input.secretKey);
    const accessToken = await GoogleProvider.refreshAccessToken(token);
    const authClient = new google.auth.OAuth2();
    authClient.setCredentials({ access_token: accessToken });
    const docs = google.docs({ version: "v1", auth: authClient });
    const document = await docs.documents.get({ documentId });
    return document.data;
  }

  export function getEndIndex(document: { data: docs_v1.Schema$Document }) {
    console.log(JSON.stringify(document.data.body?.content, null, 2));
    // 문서의 끝 인덱스 반환
    const weight =
      (document.data.body?.content?.reduce<number>((acc, element) => {
        if (typeof element.endIndex === "number") {
          return Math.max(acc, element.endIndex);
        }
        return acc;
      }, 0) ?? 2) - 2; // 빈 문서는 줄바꿈 문자를 포함하여 최소 index가 2부터 시작한다.

    return weight;
  }

  export async function append(
    input: IGoogleDocs.IAppendTextGoogleDocsInput,
  ): Promise<IGoogleDocs.ICreateGoogleDocsOutput> {
    try {
      const { documentId } = input;
      const token = await OAuthSecretProvider.getSecretValue(input.secretKey);
      const accessToken = await GoogleProvider.refreshAccessToken(token);
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
        const acc = arr
          .slice(0, i - 1) // 스타일 바로 직전의 텍스트는 제외해야 하기 때문에 -1을 한다.
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

      const url = `https://docs.google.com/document/d/${documentId}/`;
      return { id: documentId, url };
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
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
        convert: (token) => {
          const headingLevel = (token as any).depth;
          const fontSize =
            headingLevel === 1 ? 22.5 : headingLevel === 2 ? 18 : 15;
          const text = `\n${decode(token.text)}` + "\n";
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
                },
                fields: "bold,backgroundColor",
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
                  },
                  fields: "link",
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
                },
                fields: "italic",
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
                    },
                    fields: "bold,italic,fontSize",
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
    },
  });
}
