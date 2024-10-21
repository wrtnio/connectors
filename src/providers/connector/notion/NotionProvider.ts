import { HttpException, HttpStatus } from "@nestjs/common";
import { Client } from "@notionhq/client";
import axios from "axios";

import { BlockObjectRequest } from "@notionhq/client/build/src/api-endpoints";
import { markdownToBlocks } from "@tryfabric/martian";
import { Block } from "@tryfabric/martian/build/src/notion/blocks";
import { INotion } from "@wrtn/connector-api/lib/structures/connector/notion/INotion";
import typia from "typia";
import { OAuthSecretProvider } from "../../internal/oauth_secret/OAuthSecretProvider";
import { IOAuthSecret } from "../../internal/oauth_secret/structures/IOAuthSecret";

export namespace NotionProvider {
  export async function deleteBlock(
    input: INotion.IDeleteBlockInput,
  ): Promise<void> {
    const { block_id, secretKey } = input;
    const headers = await getHeaders(secretKey);
    const url = `https://api.notion.com/v1/blocks/${block_id}`;
    await axios.delete(url, { headers: headers });
  }

  export async function getPageById(input: { secretKey: string }) {
    const notion = await createClient(input.secretKey);
    const page = await notion.pages.retrieve({
      page_id: "011ff941f052423f8a203d8a84e4e71f",
    });

    return page;
  }

  export async function createFile(
    input: INotion.ICreateChildContentTypeFileInput,
  ): Promise<void> {
    try {
      const { pageId, secretKey, ...rest } = input;
      const notion = await createClient(secretKey);
      await notion.blocks.children.append({
        block_id: pageId,
        children: [removeChildren(rest)],
      });
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function createEmbed(
    input: INotion.ICreateChildContentTypeEmbedInput,
  ): Promise<void> {
    try {
      const { pageId, secretKey, ...rest } = input;
      const notion = await createClient(secretKey);
      await notion.blocks.children.append({
        block_id: pageId,
        children: [removeChildren(rest)],
      });
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function createBookmark(
    input: INotion.ICreateChildContentTypeBookmarkInput,
  ): Promise<void> {
    try {
      const { pageId, secretKey, ...rest } = input;
      const notion = await createClient(secretKey);
      await notion.blocks.children.append({
        block_id: pageId,
        children: [removeChildren(rest)],
      });
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function createImage(
    input: INotion.ICreateChildContentTypeImageInput,
  ): Promise<void> {
    try {
      const { pageId, secretKey, ...rest } = input;
      const notion = await createClient(secretKey);
      await notion.blocks.children.append({
        block_id: pageId,
        children: [removeChildren(rest)],
      });
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function createVideo(
    input: INotion.ICreateChildContentTypeVideoInput,
  ): Promise<void> {
    try {
      const { pageId, secretKey, ...rest } = input;
      const notion = await createClient(secretKey);
      await notion.blocks.children.append({
        block_id: pageId,
        children: [removeChildren(rest)],
      });
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function createPdf(
    input: INotion.ICreateChildContentTypePdfInput,
  ): Promise<void> {
    try {
      const { pageId, secretKey, ...rest } = input;
      const notion = await createClient(secretKey);
      await notion.blocks.children.append({
        block_id: pageId,
        children: [removeChildren(rest)],
      });
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function createAudio(
    input: INotion.ICreateChildContentTypeAudioInput,
  ): Promise<void> {
    try {
      const { pageId, secretKey, ...rest } = input;
      const notion = await createClient(secretKey);
      await notion.blocks.children.append({
        block_id: pageId,
        children: [removeChildren(rest)],
      });
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function createCode(
    input: INotion.ICreateChildContentTypeCodeInput,
  ): Promise<void> {
    try {
      const { pageId, secretKey, ...rest } = input;
      const notion = await createClient(secretKey);
      await notion.blocks.children.append({
        block_id: pageId,
        children: [rest as any],
      });
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function createEquation(
    input: INotion.ICreateChildContentTypeEquationInput,
  ): Promise<void> {
    try {
      const { pageId, secretKey, ...rest } = input;
      const notion = await createClient(secretKey);
      await notion.blocks.children.append({
        block_id: pageId,
        children: [removeChildren(rest)],
      });
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function createDivider(
    input: INotion.ICreateChildContentTypeDividerInput,
  ): Promise<void> {
    try {
      const { pageId, secretKey, ...rest } = input;
      const notion = await createClient(secretKey);
      await notion.blocks.children.append({
        block_id: pageId,
        children: [removeChildren(rest)],
      });
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function createBreadcrumb(
    input: INotion.ICreateChildContentTypeBreadcrumbInput,
  ): Promise<void> {
    try {
      const { pageId, secretKey, ...rest } = input;
      const notion = await createClient(secretKey);
      await notion.blocks.children.append({
        block_id: pageId,
        children: [removeChildren(rest)],
      });
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function createTableOfContents(
    input: INotion.ICreateChildContentTypeTableOfContentsInput,
  ): Promise<void> {
    try {
      const { pageId, secretKey, ...rest } = input;
      const notion = await createClient(secretKey);
      await notion.blocks.children.append({
        block_id: pageId,
        children: [removeChildren(rest)],
      });
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function createLinkToPage(
    input: INotion.ICreateChildContentTypeLinkToPageInput,
  ): Promise<void> {
    try {
      const { pageId, secretKey, ...rest } = input;
      const notion = await createClient(secretKey);
      await notion.blocks.children.append({
        block_id: pageId,
        children: [removeChildren(rest)],
      });
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  // export async function createTableRow(
  //   input: INotion.ICreateChildContentTypeTableRowInput,
  // ): Promise<void> {
  //   try {
  //     const { pageId, secretKey, ...rest } = input;
  //     const notion = await createClient(secretKey);
  //     await notion.blocks.children.append({
  //       block_id: pageId,
  //       children: [removeChildren(rest)],
  //     });
  //   } catch (error) {
  //     console.error(JSON.stringify(error));
  //     throw error;
  //   }
  // }

  // export async function createTable(
  //   input: INotion.ICreateChildContentTypeTableInput,
  // ): Promise<void> {
  //   try {
  //     const { pageId, secretKey, ...rest } = input;
  //     const notion = await createClient(secretKey);
  //     await notion.blocks.children.append({
  //       block_id: pageId,
  //       children: [removeChildren(rest)],
  //     });
  //   } catch (error) {
  //     console.error(JSON.stringify(error));
  //     throw error;
  //   }
  // }

  // export async function createColumnList(
  //   input: INotion.ICreateChildContentTypeColumnListInput,
  // ): Promise<void> {
  //   try {
  //     const { pageId, secretKey, ...rest } = input;
  //     const notion = await createClient(secretKey);
  //     await notion.blocks.children.append({
  //       block_id: pageId,
  //       children: [removeChildren(rest)],
  //     });
  //   } catch (error) {
  //     console.error(JSON.stringify(error));
  //     throw error;
  //   }
  // }

  // export async function createColumn(
  //   input: INotion.ICreateChildContentTypeColumnInput,
  // ): Promise<void> {
  //   try {
  //     const { pageId, secretKey, ...rest } = input;
  //     const notion = await createClient(secretKey);
  //     await notion.blocks.children.append({
  //       block_id: pageId,
  //       children: [removeChildren(rest)],
  //     });
  //   } catch (error) {
  //     console.error(JSON.stringify(error));
  //     throw error;
  //   }
  // }

  export async function createHeading_1(
    input: INotion.ICreateChildContentTypeHeading_1Input,
  ): Promise<void> {
    try {
      const { pageId, secretKey, ...rest } = input;
      const notion = await createClient(secretKey);
      await notion.blocks.children.append({
        block_id: pageId,
        children: [removeChildren(rest)],
      });
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function createHeading_2(
    input: INotion.ICreateChildContentTypeHeading_2Input,
  ): Promise<void> {
    try {
      const { pageId, secretKey, ...rest } = input;
      const notion = await createClient(secretKey);
      await notion.blocks.children.append({
        block_id: pageId,
        children: [removeChildren(rest)],
      });
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function createHeading_3(
    input: INotion.ICreateChildContentTypeHeading_3Input,
  ): Promise<void> {
    try {
      const { pageId, secretKey, ...rest } = input;
      const notion = await createClient(secretKey);
      await notion.blocks.children.append({
        block_id: pageId,
        children: [removeChildren(rest)],
      });
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function createParagraph(
    input: INotion.ICreateChildContentTypeParagraphInput,
  ): Promise<void> {
    try {
      const { pageId, secretKey, ...rest } = input;
      const notion = await createClient(secretKey);
      await notion.blocks.children.append({
        block_id: pageId,
        children: [removeChildren(rest)],
      });
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function createBulletedListItem(
    input: INotion.ICreateChildContentTypeBulletedListItemInput,
  ): Promise<void> {
    try {
      const { pageId, secretKey, ...rest } = input;
      const notion = await createClient(secretKey);
      await notion.blocks.children.append({
        block_id: pageId,
        children: [removeChildren(rest)],
      });
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function createNumberedListItem(
    input: INotion.ICreateChildContentTypeNumberedListItemInput,
  ): Promise<void> {
    try {
      const { pageId, secretKey, ...rest } = input;
      const notion = await createClient(secretKey);
      await notion.blocks.children.append({
        block_id: pageId,
        children: [removeChildren(rest)],
      });
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function createQuote(
    input: INotion.ICreateChildContentTypeQuoteInput,
  ): Promise<void> {
    try {
      const { pageId, secretKey, ...rest } = input;
      const notion = await createClient(secretKey);
      await notion.blocks.children.append({
        block_id: pageId,
        children: [removeChildren(rest)],
      });
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function createToDo(
    input: INotion.ICreateChildContentTypeToDoInput,
  ): Promise<void> {
    try {
      const { pageId, secretKey, ...rest } = input;
      const notion = await createClient(secretKey);
      await notion.blocks.children.append({
        block_id: pageId,
        children: [removeChildren(rest)],
      });
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function createToggle(
    input: INotion.ICreateChildContentTypeToggleInput,
  ): Promise<void> {
    try {
      const { pageId, secretKey, ...rest } = input;
      const notion = await createClient(secretKey);
      await notion.blocks.children.append({
        block_id: pageId,
        children: [removeChildren(rest)],
      });
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  // export async function createCallout(
  //   input: INotion.ICreateChildContentTypeCalloutInput,
  // ): Promise<void> {
  //   try {
  //     const { pageId, secretKey, ...rest } = input;
  //     const notion = await createClient(secretKey);
  //     await notion.blocks.children.append({
  //       block_id: pageId,
  //       children: [removeChildren(rest)],
  //     });
  //   } catch (error) {
  //     console.error(JSON.stringify(error));
  //     throw error;
  //   }
  // }

  // export async function createSyncedBlock(
  //   input: INotion.ICreateChildContentTypeSyncedBlockInput,
  // ): Promise<void> {
  //   try {
  //     const { pageId, secretKey, ...rest } = input;
  //     const notion = await createClient(secretKey);
  //     await notion.blocks.children.append({
  //       block_id: pageId,
  //       children: [removeChildren(rest)],
  //     });
  //   } catch (error) {
  //     console.error(JSON.stringify(error));
  //     throw error;
  //   }
  // }

  export async function createPage(
    input: INotion.ICreatePageInput,
  ): Promise<INotion.ICreatePageOutput> {
    try {
      const notion = await createClient(input.secretKey);
      const res = await notion.pages.create({
        parent: { type: "page_id", page_id: input.parentPageId },
        properties: { title: { title: [{ text: { content: input.title } }] } },
      });
      const pageId = res.id;

      if (!pageId) {
        throw new HttpException(
          "Failed Create Page",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return { id: pageId, title: input.title };
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function readPageContents(
    input: INotion.IReadPageContentInput,
  ): Promise<INotion.MarkdownBlock[]> {
    try {
      const { block_id } = input;

      async function getPageContent(block_id: string, indent: number = 0) {
        indent++;
        const blocks = await getAllPageContents({ ...input, block_id }, indent);

        await Promise.allSettled(
          blocks.map(async (block) => {
            block.children = (await getPageContent(block.id)).blocks;
          }),
        );
        // for await (const block of blocks) {
        //   block.children = (await getPageContent(block.id)).blocks;
        // }

        indent--;
        return { blocks: blocks };
      }

      const blocks = (await getPageContent(block_id)).blocks;
      return typia.misc.assertClone<INotion.MarkdownBlock[]>(blocks);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  export async function getAllPageContents(
    input: INotion.IReadPageContentInput,
    indent: number = 0,
  ) {
    let response: any[] = [];
    let next_cursor = null;
    do {
      const url = `https://api.notion.com/v1/blocks/${input.block_id}/children`;
      const headers = await getHeaders(input.secretKey);
      const res = await axios.get(url, { headers: headers });

      response = response.concat(res.data.results);
      next_cursor = res.data.next_cursor;
    } while (next_cursor !== null);

    return blocksToMarkdown(response, indent);
  }

  export async function readPageList(
    input: INotion.ISecret,
  ): Promise<INotion.IReadPageOutput[]> {
    try {
      const headers = await getHeaders(input.secretKey);
      const res = await axios.post(
        `https://api.notion.com/v1/search`,
        {
          filter: {
            value: "page",
            property: "object",
          },
        },
        {
          headers: headers,
        },
      );

      const pageList = res.data.results.filter(
        (page: any) => page.parent.type !== "database_id",
      );
      const pageOutput: INotion.IReadPageOutput[] = [];

      for (const page of pageList) {
        const pageInfo: INotion.IReadPageOutput = {
          pageId: page.id,
          title:
            page.properties.title.title.length === 0
              ? "제목없음"
              : page.properties.title.title[0].plain_text,
        };
        pageOutput.push(pageInfo);
      }

      return pageOutput;
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function appendPageToContent(
    pageId: string,
    input: INotion.IAppendPageToContentInput,
  ): Promise<void> {
    try {
      const notion = await createClient(input.secretKey);
      await notion.blocks.children.append({
        block_id: pageId,
        children: [
          {
            object: "block",
            type: "paragraph",
            paragraph: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: input.content,
                  },
                },
              ],
            },
          },
        ],
      });
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function getDatabaseInfo(
    input: INotion.ISecret,
    databaseId: string,
  ): Promise<INotion.IDatabaseInfo> {
    try {
      /**
       * notion sdk의 database.retrieve method를 사용하여 properties의 정보를 받아올 수 있지만
       * database의 title을 가져올 수 없음.
       */
      const headers = await getHeaders(input.secretKey);
      const res = await axios.get(
        `https://api.notion.com/v1/databases/${databaseId}`,
        {
          headers: headers,
        },
      );

      const database = res.data;
      return {
        id: databaseId,
        title: database.title[0].plain_text,
        properties: database.properties,
      };
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function getDatabaseListInfo(
    input: INotion.ISecret,
  ): Promise<INotion.IDatabaseInfo[]> {
    try {
      const notion = await createClient(input.secretKey);
      const searchResult = await notion.search({});
      const databaseIds = searchResult.results
        .filter((result) => result.object === "database")
        .map((result) => result.id);

      const databaseListInfo: INotion.IDatabaseInfo[] = [];
      for (const databaseId of databaseIds) {
        const databaseInfo = await getDatabaseInfo(
          { secretKey: input.secretKey },
          databaseId,
        );
        databaseListInfo.push(databaseInfo);
      }
      return databaseListInfo;
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function createDatabaseItem(
    input: INotion.ICreateDatabaseItemInput,
    databaseId: string,
  ): Promise<INotion.IDatabaseItemOutput> {
    try {
      const databaseInfo = await getDatabaseInfo(
        { secretKey: input.secretKey },
        databaseId,
      );
      /**
       * 데이터베이스에 아이템을 추가할 때 필요한 데이터베이스별 프로퍼티 정보
       */
      const properties = formattingDatabaseProperties(
        input,
        databaseInfo.properties,
      );

      const headers = await getHeaders(input.secretKey);

      /**
       * 데이터베이스에 페이지 생성
       */
      const res = await axios.post(
        "https://api.notion.com/v1/pages",
        {
          parent: { database_id: databaseId },
          properties: properties,
          children: [
            {
              object: "block",
              type: "paragraph",
              paragraph: {
                rich_text: [
                  {
                    type: "text",
                    text: {
                      content: input.content ?? "",
                    },
                  },
                ],
              },
            },
          ],
        },
        { headers: headers },
      );

      const createdDatabaseItem: INotion.IDatabaseItemOutput = res.data;
      return createdDatabaseItem;
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function updateDatabaseItem(
    input: INotion.IUpdateDatabaseItemInput,
    databaseId: string,
  ): Promise<INotion.IDatabaseItemOutput> {
    try {
      const databaseInfo = await getDatabaseInfo(
        { secretKey: input.secretKey },
        databaseId,
      );
      /**
       * 업데이트 할 데이터베이스 아이템 프로퍼티 값
       */
      const properties = formattingDatabaseProperties(
        input,
        databaseInfo.properties,
      );

      const headers = await getHeaders(input.secretKey);
      /**
       *
       * 데이터베이스 아이템 업데이트
       */
      const res = await axios.patch(
        `https://api.notion.com/v1/pages/${input.pageId}`,
        {
          properties: properties,
        },
        { headers: headers },
      );

      /**
       * 데이터베이스 안의 페이지 내용 업데이트
       */
      const response = await axios.get(
        `https://api.notion.com/v1/blocks/${input.pageId}/children`,
        {
          headers: headers,
        },
      );

      const firstBlockId = response.data.results[0].id;
      const originalContent =
        response.data.results[0].paragraph.rich_text[0].plain_text;
      await axios.patch(
        `https://api.notion.com/v1/blocks/${firstBlockId}`,
        {
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: input.content ?? originalContent,
                },
              },
            ],
          },
        },
        { headers: headers },
      );

      const updatedDatabaseItem: INotion.IDatabaseItemOutput = res.data;
      return updatedDatabaseItem;
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function getUsers(
    input: INotion.ISecret,
  ): Promise<INotion.IUserOutput[]> {
    try {
      const headers = await getHeaders(input.secretKey);
      const people = await axios.get(`https://api.notion.com/v1/users`, {
        headers: headers,
      });
      const userInfoList: INotion.IUser[] = people.data.results;
      const users: INotion.IUserOutput[] = [];

      for (const userInfo of userInfoList) {
        const user: INotion.IUserOutput = {
          id: userInfo.id,
          name: userInfo.name,
        };

        users.push(user);
      }
      return users;
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function findPageByTitle(
    input: INotion.IFindPageOrDatabaseItemInput,
  ): Promise<INotion.IFindPageByTitleOutput> {
    const headers = await getHeaders(input.secretKey);
    const res = await axios.post(
      `https://api.notion.com/v1/search`,
      {
        query: input.title,
        filter: {
          value: "page",
          property: "object",
        },
      },
      {
        headers: headers,
      },
    );
    const pageOutput: INotion.IFindPageByTitleOutput = res.data.results[0];
    if (!pageOutput) {
      throw new HttpException(
        "Cannot Find Page by title",
        HttpStatus.NOT_FOUND,
      );
    }
    return pageOutput;
  }

  export async function findDatabaseItemList(
    input: INotion.ISecret,
    databaseId: string,
  ): Promise<INotion.IDatabaseItemOutput[]> {
    try {
      const headers = await getHeaders(input.secretKey);
      const res = await axios.post(
        `https://api.notion.com/v1/databases/${databaseId}/query`,
        {},
        {
          headers: headers,
        },
      );

      const databaseItemList = res.data.results;
      return databaseItemList;
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function findDatabaseItem(
    input: INotion.IFindDatabaseItemInput,
    databaseId: string,
  ): Promise<INotion.IDatabaseItemOutput> {
    try {
      const database = await getDatabaseInfo(
        { secretKey: input.secretKey },
        databaseId,
      );

      const propertiesInfo: Record<string, INotion.DatabaseProperty> =
        database.properties;

      const filters = [];

      for (const key in propertiesInfo) {
        const property = propertiesInfo[key];
        /**
         * 데이터베이스 아이템을 찾을 때 필터 조건으로 가능한 프로퍼티는
         * title, rich_text, email, url, phone_number, number 프로퍼티로 필터 생성 가능
         */
        for (const inputKey in input) {
          /**
           * input의 key로 property의 type과 value를 받음
           * ex) number: 1 , title: "뤼튼" ....
           */
          if (inputKey === property.type && input[inputKey] !== undefined) {
            const filter = {
              property: property.name,
              [property.type]: { equals: input[inputKey] },
            };
            filters.push(filter);
          }
        }
      }
      const headers = await getHeaders(input.secretKey);

      const res = await axios.post(
        `https://api.notion.com/v1/databases/${databaseId}/query`,
        {
          filter: {
            /**
             * and 조건을 사용해서 입력한 모든 조건이 만족하는 데이터베이스만 찾도록 필터 적용
             * docs: https://developers.notion.com/reference/post-database-query-filter
             */
            and: filters,
          },
        },
        {
          headers: headers,
        },
      );

      const databaseItem = res.data.results[0];
      if (!databaseItem) {
        throw new HttpException(
          "Cannot Find Database Item for condition",
          HttpStatus.NOT_FOUND,
        );
      }

      return databaseItem;
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  /**
   * 데이터베이스 아이템 생성 및 업데이트시 프로퍼티 별 형식에 맞추어 프로퍼티 값 적용
   */
  function formattingDatabaseProperties(
    input: INotion.ICreateDatabaseItemInput,
    propertiesInfo: Record<string, INotion.DatabaseProperty>,
  ): INotion.IDatabasePropertyInput {
    const properties: INotion.IDatabasePropertyInput = {};

    for (const [, property] of Object.entries(propertiesInfo)) {
      const key = property.name;

      // 데이터베이스 아이템 업데이트 시 업데이트 하지 않는 프로퍼티가 있을 수 있음
      if (input[key] === undefined) continue;

      switch (property.type) {
        case "multi_select": {
          properties[key] = {
            multi_select: input[key].map((item: string) => ({ name: item })),
          };
          break;
        }
        case "select": {
          properties[key] = { select: { name: input[key] } };
          break;
        }
        case "title": {
          properties[key] = { title: [{ text: { content: input[key] } }] };
          break;
        }
        case "rich_text": {
          properties[key] = { rich_text: [{ text: { content: input[key] } }] };
          break;
        }
        case "number":
        case "email":
        case "url":
        case "phone_number":
        case "checkbox": {
          properties[key] = { [property.type]: input[key] };
          break;
        }
        // start는 필수, end는 optional(null 가능)
        case "date": {
          properties[key] = {
            date: { start: input[key].start, end: input[key].end },
          };
          break;
        }
        // getUsers() 함수로 부터 받아온 워크스페이스에 속한 사람들 id
        case "people": {
          properties[key] = {
            people: input[key].map((item: string) => ({ id: item })),
          };
          break;
        }
      }
    }
    return properties;
  }

  async function createClient(accessToken: string) {
    const secret = await OAuthSecretProvider.getSecretValue(accessToken);
    const refreshToken =
      typeof secret === "string"
        ? secret
        : (secret as IOAuthSecret.ISecretValue).value;
    return new Client({ auth: refreshToken });
  }

  async function getHeaders(accessToken: string) {
    const secret = await OAuthSecretProvider.getSecretValue(accessToken);
    const refreshToken =
      typeof secret === "string"
        ? secret
        : (secret as IOAuthSecret.ISecretValue).value;
    return {
      "content-type": "application/json",
      Authorization: `Bearer ${refreshToken}`,
      "Notion-Version": "2022-06-28",
      accept: "application/json",
    };
  }

  export function removeChildren<T extends object | object[]>(target: T): T {
    if (target instanceof Array) {
      target.forEach((el) => removeChildren(el));
    } else {
      Object.entries(target).forEach(([key, value]) => {
        if (key === "children") {
          if ((value as any[]).length === 0) {
            delete (target as any)["children"];
          }

          removeChildren(value);
        } else {
          if (typeof value === "object" && value !== null) {
            removeChildren(value);
          }
        }
      });
    }

    return target;
  }

  export async function appendBlocksByMarkdown(
    input: INotion.IAppendPageByMarkdownInput,
  ): Promise<void> {
    try {
      const blocks = markdownToBlocks(input.markdown);
      const notion = await createClient(input.secretKey);

      while (blocks.length !== 0) {
        const blocksToInsert = blocks.splice(0, 100) as BlockObjectRequest[];
        await notion.blocks.children.append({
          block_id: input.pageId,
          children: blocksToInsert,
        });
      }
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function createPageByMarkdown(
    input: INotion.ICreatePageByMarkdownInput,
  ): Promise<INotion.ICreatePageOutput> {
    try {
      const page = await createPage(input);
      await NotionProvider.appendBlocksByMarkdown({
        ...input,
        pageId: page.id,
      });

      return { id: page.id, title: input.title };
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export function blocksToMarkdown<T extends Block & { id: string }>(
    blocks: T[],
    indent: number = 0,
  ): INotion.AccurateMarkdownBlock[] {
    return blocks.map((block: T) => {
      if (block.type === "audio") {
      } else if (block.type === "bookmark") {
      } else if (block.type === "breadcrumb") {
      } else if (block.type === "bulleted_list_item") {
        const rich_text = block[block["type"]]["rich_text"];
        if (rich_text instanceof Array) {
          const text = rich_text
            .map((el) => (el.type === "text" ? el.text.content : ""))
            .join("");

          return { ...block, text };
        }
      } else if (block.type === "callout") {
        const rich_text = block[block["type"]]["rich_text"];
        if (rich_text instanceof Array) {
          const text = rich_text
            .map((el) => (el.type === "text" ? el.text.content : ""))
            .join("");

          return { ...block, text };
        }
      } else if (block.type === "code") {
        const rich_text = block[block["type"]]["rich_text"];
        if (rich_text instanceof Array) {
          const text = rich_text
            .map((el) => (el.type === "text" ? el.text.content : ""))
            .join("");

          return { ...block, text };
        }
      } else if (block.type === "column") {
      } else if (block.type === "column_list") {
      } else if (block.type === "divider") {
      } else if (block.type === "embed") {
      } else if (block.type === "equation") {
      } else if (block.type === "file") {
      } else if (block.type === "heading_1") {
        const rich_text = block[block["type"]]["rich_text"];
        if (rich_text instanceof Array) {
          const text = rich_text
            .map((el) => (el.type === "text" ? el.text.content : ""))
            .join("");

          return { ...block, text };
        }
      } else if (block.type === "heading_2") {
        const rich_text = block[block["type"]]["rich_text"];
        if (rich_text instanceof Array) {
          const text = rich_text
            .map((el) => (el.type === "text" ? el.text.content : ""))
            .join("");

          return { ...block, text };
        }
      } else if (block.type === "heading_3") {
        const rich_text = block[block["type"]]["rich_text"];
        if (rich_text instanceof Array) {
          const text = rich_text
            .map((el) => (el.type === "text" ? el.text.content : ""))
            .join("");

          return { ...block, text };
        }
      } else if (block.type === "image") {
      } else if (block.type === "link_to_page") {
      } else if (block.type === "numbered_list_item") {
        const rich_text = block[block["type"]]["rich_text"];
        if (rich_text instanceof Array) {
          const text = rich_text
            .map((el) => (el.type === "text" ? el.text.content : ""))
            .join("");

          return { ...block, text };
        }
      } else if (block.type === "paragraph") {
        const rich_text = block[block["type"]]["rich_text"];
        if (rich_text instanceof Array) {
          const text = rich_text
            .map((el) => (el.type === "text" ? el.text.content : ""))
            .join("");

          return { ...block, text };
        }
      } else if (block.type === "pdf") {
      } else if (block.type === "quote") {
        const rich_text = block[block["type"]]["rich_text"];
        if (rich_text instanceof Array) {
          const text = rich_text
            .map((el) => (el.type === "text" ? el.text.content : ""))
            .join("");

          return { ...block, text };
        }
      } else if (block.type === "synced_block") {
      } else if (block.type === "table") {
      } else if (block.type === "table_of_contents") {
      } else if (block.type === "table_row") {
      } else if (block.type === "template") {
        const rich_text = block[block["type"]]["rich_text"];
        if (rich_text instanceof Array) {
          const text = rich_text
            .map((el) => (el.type === "text" ? el.text.content : ""))
            .join("");

          return { ...block, text };
        }
      } else if (block.type === "to_do") {
        const rich_text = block[block["type"]]["rich_text"];
        if (rich_text instanceof Array) {
          const text = rich_text
            .map((el) => (el.type === "text" ? el.text.content : ""))
            .join("");

          return { ...block, text };
        }
      } else if (block.type === "toggle") {
        const rich_text = block[block["type"]]["rich_text"];
        if (rich_text instanceof Array) {
          const text = rich_text
            .map((el) => (el.type === "text" ? el.text.content : ""))
            .join("");

          return { ...block, text };
        }
      } else if (block.type === "video") {
      }

      return block;
    });
  }
}
