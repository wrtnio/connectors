import { HttpException, HttpStatus } from "@nestjs/common";
import { Client } from "@notionhq/client";
import axios from "axios";

import { ICommon } from "@wrtn/connector-api/lib/structures/connector/common/ISecretValue";
import { INotion } from "@wrtn/connector-api/lib/structures/connector/notion/INotion";

/**
 * notion-sdk-js 링크: https://github.com/makenotion/notion-sdk-js
 * notion에서 제공하는 sdk(라이브러리)를 통해 구현할 수 없는 function들은 axios 사용해서 구현
 * 구현할 수 없는 이유는 sdk의 response type으로 접근 불가능한 필드들이 너무 많음
 * ex) response field에는 id, object만 주는데 우리는 properties에 접근할 수 있어야 함.
 */
export namespace NotionProvider {
  export async function createPage(input: INotion.ICreatePageInput): Promise<INotion.ICreatePageOutput> {
    try {
      const notion = createClient(input.secretKey);
      const res = await notion.pages.create({
        parent: {
          type: "page_id",
          page_id: input.parentPageId,
        },
        properties: {
          title: {
            title: [
              {
                text: {
                  content: input.title,
                },
              },
            ],
          },
        },
        /**
         * 해당 children을 만드는 형태를 동일하게 여러 군데 사용을 하는데 하나의 함수로 만들어서 재사용 하고자 했으나, notion-sdk에서 제공하는 BlockObject type을 꺼내올 수 없어서 그대로 사용
         */
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
      const pageId = res.id;

      if (!pageId) {
        throw new HttpException("Failed Create Page", HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return { id: pageId };
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function readPageList(input: ICommon.ISecret<"notion">): Promise<INotion.IReadPageOutput[]> {
    try {
      const headers = getHeaders(input.secretKey);
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

      const pageList = res.data.results.filter((page: any) => page.parent.type !== "database_id");
      const pageOutput: INotion.IReadPageOutput[] = [];

      for (const page of pageList) {
        const pageInfo: INotion.IReadPageOutput = {
          pageId: page.id,
          title: page.properties.title.title[0].plain_text,
        };
        pageOutput.push(pageInfo);
      }

      return pageOutput;
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function appendPageToContent(pageId: string, input: INotion.IAppendPageToContentInput): Promise<void> {
    try {
      const notion = createClient(input.secretKey);
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
    input: ICommon.ISecret<"notion">,
    databaseId: string,
  ): Promise<INotion.IDatabaseInfo> {
    try {
      /**
       * notion sdk의 database.retrieve method를 사용하여 properties의 정보를 받아올 수 있지만
       * database의 title을 가져올 수 없음.
       */
      const headers = getHeaders(input.secretKey);
      const res = await axios.get(`https://api.notion.com/v1/databases/${databaseId}`, {
        headers: headers,
      });

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

  export async function getDatabaseListInfo(input: ICommon.ISecret<"notion">): Promise<INotion.IDatabaseInfo[]> {
    try {
      const notion = createClient(input.secretKey);
      const searchResult = await notion.search({});
      const databaseIds = searchResult.results
        .filter((result) => result.object === "database")
        .map((result) => result.id);

      const databaseListInfo: INotion.IDatabaseInfo[] = [];
      for (const databaseId of databaseIds) {
        const databaseInfo = await getDatabaseInfo({ secretKey: input.secretKey }, databaseId);
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
      const databaseInfo = await getDatabaseInfo({ secretKey: input.secretKey }, databaseId);
      /**
       * 데이터베이스에 아이템을 추가할 때 필요한 데이터베이스별 프로퍼티 정보
       */
      const properties = formattingDatabaseProperties(input, databaseInfo.properties);

      const headers = getHeaders(input.secretKey);

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
      const databaseInfo = await getDatabaseInfo({ secretKey: input.secretKey }, databaseId);
      /**
       * 업데이트 할 데이터베이스 아이템 프로퍼티 값
       */
      const properties = formattingDatabaseProperties(input, databaseInfo.properties);

      const headers = getHeaders(input.secretKey);
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
      const response = await axios.get(`https://api.notion.com/v1/blocks/${input.pageId}/children`, {
        headers: headers,
      });

      const firstBlockId = response.data.results[0].id;
      const originalContent = response.data.results[0].paragraph.rich_text[0].plain_text;
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

  export async function getUsers(input: ICommon.ISecret<"notion">): Promise<INotion.IUserOutput[]> {
    try {
      const headers = getHeaders(input.secretKey);
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
    const headers = getHeaders(input.secretKey);
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
      throw new HttpException("Cannot Find Page by title", HttpStatus.NOT_FOUND);
    }
    return pageOutput;
  }

  export async function findDatabaseItemList(
    input: ICommon.ISecret<"notion">,
    databaseId: string,
  ): Promise<INotion.IDatabaseItemOutput[]> {
    try {
      const headers = getHeaders(input.secretKey);
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
      const database = await getDatabaseInfo({ secretKey: input.secretKey }, databaseId);

      const propertiesInfo: Record<string, INotion.DatabaseProperty> = database.properties;

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
      const headers = getHeaders(input.secretKey);

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
        throw new HttpException("Cannot Find Database Item for condition", HttpStatus.NOT_FOUND);
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

  function createClient(accessToken: string) {
    return new Client({ auth: accessToken });
  }

  function getHeaders(accessToken: string) {
    return {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "Notion-Version": "2022-06-28",
      accept: "application/json",
    };
  }
}
