import CApi from "@wrtn/connector-api/lib/index";
import { randomUUID } from "crypto";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

// export const test_api_connector_notion = async (
//   connection: CApi.IConnection,
// ) => {
//   const databaseId = "5735baa1-5183-4508-9070-ca0ac5a3ec4c";
//   const secretKey = "secret_yktaeuBG0D6kbWZGQJlas2zrnhA1pOXOFqj1ekfJJqx";
//   /**
//    * Create page
//    */
//   const page: INotion.ICreatePageOutput =
//     await CApi.functional.connector.notion.page.createPage(connection, {
//       parentPageId: "80b6f9600d9e402781f9ed323a2c1da3",
//       title: "페이지 생성 테스트",
//       content: "페이지 생성 테스트 입니다.",
//       secretKey,
//     });
//   typia.assertEquals<INotion.ICreatePageOutput>(page);

//   const pageId = page.id;

//   /**
//    * Read page List
//    */
//   const pageList: INotion.IReadPageOutput[] =
//     await CApi.functional.connector.notion.get.page.readPageList(connection, {
//       secretKey,
//     });
//   typia.assertEquals<INotion.IReadPageOutput[]>(pageList);

//   /**
//    * Append Content to end of page
//    */
//   await CApi.functional.connector.notion.page.content.appendPageToContent(
//     connection,
//     pageId,
//     { content: "WOW", secretKey },
//   );

//   /**
//    * Find page by title
//    */
//   const pageOutputFindByTitle: INotion.IFindPageByTitleOutput =
//     await CApi.functional.connector.notion.get_page_by_title.getPageByTitle(
//       connection,
//       {
//         title: "connector-poc-test",
//         secretKey,
//       },
//     );
//   typia.assertEquals<INotion.IFindPageByTitleOutput>(pageOutputFindByTitle);

//   /**
//    * Get DatabaseInfo List
//    */
//   const databaseListInfo: INotion.IDatabaseInfo[] =
//     await CApi.functional.connector.notion.get.database_info.getDatabaseListInfo(
//       connection,
//       {
//         secretKey,
//       },
//     );
//   typia.assertEquals<INotion.IDatabaseInfo[]>(databaseListInfo);

//   /**
//    * Get Database Info
//    */
//   const databaseInfo: INotion.IDatabaseInfo =
//     await CApi.functional.connector.notion.get.database_info.getDatabaseInfo(
//       connection,
//       {
//         secretKey,
//       },
//       databaseId,
//     );
//   typia.assertEquals<INotion.IDatabaseInfo>(databaseInfo);

//   /**
//    * Get User list
//    */
//   const users: INotion.IUserOutput[] =
//     await CApi.functional.connector.notion.get.users.getUsers(connection, {
//       secretKey,
//     });
//   typia.assertEquals<INotion.IUserOutput[]>(users);

//   /**
//    * Create Database Item
//    */
//   const createdDatabaseItem: INotion.IDatabaseItemOutput =
//     await CApi.functional.connector.notion.database_item.createDatabaseItem(
//       connection,
//       {
//         /**
//          * 데이터베이스가 가지고 있는 프로퍼티에 따라 동적으로 달라짐.
//          * 추후 구조 확정되면 리팩토링 필요.
//          */
//         다중선택: ["태그1", "태그2"],
//         숫자: 10,
//         이름: "데이터베이스 아이템 생성 테스트",
//         선택: "선택1",
//         텍스트: "데이터베이스 아이템 생성",
//         이메일: "123@123.com",
//         URL: "https://wrtn.ai",
//         상태: "진행 중",
//         전화번호: `010-1234-1234`,
//         체크박스: true,
//         날짜: {
//           start: "2024-01-31",
//           end: null,
//         },
//         사람: ["ef7bcb1a-d894-4cfb-af5c-37861954503a"],

//         /**
//          * 데이터베이스 페이지 안에 생성할 텍스트
//          */
//         content: "데이터베이스 아이템 생성 성공",
//         contentType: "plainText",
//         secretKey,
//       },
//       databaseId,
//     );
//   typia.assertEquals<INotion.IDatabaseItemOutput>(createdDatabaseItem);

//   /**
//    * Update Database Item
//    */
//   const updatedDatabaseItem: INotion.IDatabaseItemOutput =
//     await CApi.functional.connector.notion.database_item.updateDatabaseItem(
//       connection,
//       {
//         pageId: createdDatabaseItem.id,
//         /**
//          * 데이터베이스가 가지고 있는 프로퍼티에 따라 동적으로 달라짐.
//          * 추후 구조 확정되면 리팩토링 필요.
//          */
//         숫자: 12341234,
//         이름: "아이템 업데이트",
//         선택: "선택1",
//         텍스트: "업데이트 성공",
//         이메일: "update@123.com",
//         URL: "https://studio.wrtn.ai",
//         상태: "진행 중",
//         전화번호: `02-1234-5678`,
//         체크박스: true,
//         날짜: {
//           start: "2024-01-31",
//           end: "2024-02-01",
//         },
//         사람: ["ef7bcb1a-d894-4cfb-af5c-37861954503a"],

//         /**
//          * 데이터베이스 페이지 안에 업데이트 할 텍스트
//          */
//         content: "데이터베이스 아이템 업데이트 성공",
//         secretKey,
//       },
//       databaseId,
//     );
//   typia.assertEquals<INotion.IDatabaseItemOutput>(updatedDatabaseItem);

//   /**
//    * Find DatabaseItem List
//    */
//   const databaseItemList: INotion.IDatabaseItemOutput[] =
//     await CApi.functional.connector.notion.find_item_list.getDatabaseItemList(
//       connection,
//       {
//         secretKey,
//       },
//       databaseId,
//     );
//   typia.assertEquals<INotion.IDatabaseItemOutput[]>(databaseItemList);

//   /**
//    * Find Database Item
//    */
//   const databaseItem: INotion.IDatabaseItemOutput =
//     await CApi.functional.connector.notion.find_item.getDatabaseItem(
//       connection,
//       {
//         number: 1,
//         rich_text: "텍스트1",
//         secretKey,
//       },
//       databaseId,
//     );
//   typia.assertEquals<INotion.IDatabaseItemOutput>(databaseItem);
// };

export const test_api_connector_notion_create_page = async (
  connection: CApi.IConnection,
) => {
  const page = await CApi.functional.connector.notion.page.createPage(
    connection,
    {
      parentPageId: "804989a1bb91410db6539034b212ebf5",
      title: randomUUID(),
      secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
    },
  );

  await CApi.functional.connector.notion.page.file.createFile(connection, {
    file: {
      external: {
        url: "https://fe-web-assets.wow.wrtn.ai/og-image.png",
      },
    },
    pageId: page.id,
    secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
  });

  await CApi.functional.connector.notion.page.embed.createEmbed(connection, {
    embed: {
      url: "https://fe-web-assets.wow.wrtn.ai/og-image.png",
    },
    pageId: page.id,
    secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
  });

  await CApi.functional.connector.notion.page.bookmark.createBookmark(
    connection,
    {
      bookmark: {
        url: "https://fe-web-assets.wow.wrtn.ai/og-image.png",
      },
      pageId: page.id,
      secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
    },
  );

  await CApi.functional.connector.notion.page.image.createImage(connection, {
    image: {
      external: {
        url: "https://velog.velcdn.com/images/bryant/post/4615e070-ebc7-4e2c-93e6-f915ba0f54c8/image.png",
      },
    },
    pageId: page.id,
    secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
  });

  await CApi.functional.connector.notion.page.video.createVideo(connection, {
    video: {
      external: {
        url: "https://www.youtube.com/watch?v=55V-DiFVbJE&list=PL5S9DUu9MPplAmM_bZ4fIsdpYeK92fdUX",
      },
    },
    pageId: page.id,
    secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
  });

  await CApi.functional.connector.notion.page.pdf.createPdf(connection, {
    pdf: {
      external: {
        url: `https://studio-api-bucket.s3.ap-northeast-2.amazonaws.com/11.%E1%84%92%E1%85%A1%E1%86%AB%E1%84%80%E1%85%AE%E1%86%A8%E1%84%8B%E1%85%A5%E1%84%92%E1%85%A1%E1%86%A8%E1%84%80%E1%85%AA.pdf`,
      },
    },
    pageId: page.id,
    secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
  });

  // await CApi.functional.connector.notion.page.audio.createAudio(connection, {
  //   audio: {
  //     external: {
  //       url: "https://www.youtube.com/watch?v=55V-DiFVbJE&list=PL5S9DUu9MPplAmM_bZ4fIsdpYeK92fdUX",
  //     },
  //   },
  //   pageId: page.id,
  //   secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
  // });

  await CApi.functional.connector.notion.page.code.createCode(connection, {
    code: {
      language: "typescript",
      rich_text: [
        {
          text: {
            content: "console.log(1);\nconsole.log(2);",
          },
        },
      ],
    },
    pageId: page.id,
    secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
  });

  await CApi.functional.connector.notion.page.equation.createEquation(
    connection,
    {
      equation: {
        expression: "y = 2x",
      },
      pageId: page.id,
      secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
    },
  );

  await CApi.functional.connector.notion.page.divider.createDivider(
    connection,
    {
      divider: {},
      pageId: page.id,
      secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
    },
  );

  await CApi.functional.connector.notion.page.breadcrumb.createBreadcrumb(
    connection,
    {
      breadcrumb: {},
      pageId: page.id,
      secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
    },
  );

  await CApi.functional.connector.notion.page.table_of_contents.createTableOfContents(
    connection,
    {
      table_of_contents: {
        color: "blue",
      },
      pageId: page.id,
      secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
    },
  );

  await CApi.functional.connector.notion.page.link_to_page.createLinkToPage(
    connection,
    {
      link_to_page: {
        page_id: page.id,
      },
      pageId: page.id,
      secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
    },
  );

  // await CApi.functional.connector.notion.page.table_row.createTableRow(
  //   connection,
  //   {
  //     table_row: {
  //       cells: [[{}]],
  //     },
  //     pageId: page.id,
  //     secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
  //   },
  // );

  // await CApi.functional.connector.notion.page.table.createTable(connection, {
  //   ...typia.random<INotion.ICreateChildContentTypeTableInput>(),
  //   pageId: page.id,
  //   secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
  // });

  // await CApi.functional.connector.notion.page.column_list.createColumnList(
  //   connection,
  //   {
  //     ...typia.random<INotion.ICreateChildContentTypeColumnListInput>(),
  //     pageId: page.id,
  //     secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
  //   },
  // );

  // await CApi.functional.connector.notion.page.column.createColumn(connection, {
  //   ...typia.random<INotion.ICreateChildContentTypeColumnInput>(),
  //   pageId: page.id,
  //   secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
  // });

  await CApi.functional.connector.notion.page.heading_1.createHeading_1(
    connection,
    {
      heading_1: {
        rich_text: [
          {
            text: {
              content: "hello world!",
            },
          },
        ],
      },
      pageId: page.id,
      secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
    },
  );

  await CApi.functional.connector.notion.page.heading_2.createHeading_2(
    connection,
    {
      heading_2: {
        rich_text: [
          {
            text: {
              content: "hello world!",
            },
          },
        ],
      },
      pageId: page.id,
      secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
    },
  );

  await CApi.functional.connector.notion.page.heading_3.createHeading_3(
    connection,
    {
      heading_3: {
        rich_text: [
          {
            text: {
              content: "hello world!",
            },
          },
        ],
      },
      pageId: page.id,
      secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
    },
  );

  await CApi.functional.connector.notion.page.paragraph.createParagraph(
    connection,
    {
      paragraph: {
        rich_text: [
          {
            text: {
              content: "hello paragraph",
              link: {
                url: "https://wrtn.ai",
              },
            },
          },
        ],
        children: [],
      },
      pageId: page.id,
      secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
    },
  );

  await CApi.functional.connector.notion.page.bulleted_list_item.createBulletedListItem(
    connection,
    {
      bulleted_list_item: {
        rich_text: [
          {
            text: {
              content: "hello, bulleted list item",
            },
          },
        ],
        children: [],
      },
      pageId: page.id,
      secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
    },
  );

  await CApi.functional.connector.notion.page.numbered_list_item.createNumberedListItem(
    connection,
    {
      numbered_list_item: {
        rich_text: [
          {
            text: {
              content: "hello, numbered_list_item",
            },
          },
        ],
        children: [],
      },
      pageId: page.id,
      secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
    },
  );

  await CApi.functional.connector.notion.page.quote.createQuote(connection, {
    quote: {
      rich_text: [
        {
          text: {
            content: "hello, quote",
          },
        },
      ],
      children: [],
    },
    pageId: page.id,
    secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
  });

  await CApi.functional.connector.notion.page.to_do.createToDo(connection, {
    to_do: {
      rich_text: [
        {
          text: {
            content: "hello, quote",
          },
        },
      ],
      children: [],
    },
    pageId: page.id,
    secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
  });

  await CApi.functional.connector.notion.page.toggle.createToggle(connection, {
    toggle: {
      rich_text: [
        {
          text: {
            content: "hello, quote",
          },
        },
      ],
      children: [],
    },
    pageId: page.id,
    secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
  });

  // Cannot create a template block using the public API.
  // await CApi.functional.connector.notion.page.template.createTemplate(
  //   connection,
  //   {
  //     template: {
  //       rich_text: [
  //         {
  //           text: {
  //             content: "hello, template",
  //           },
  //         },
  //       ],
  //     },
  //     pageId: page.id,
  //     secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
  //   },
  // );

  // await CApi.functional.connector.notion.page.callout.createCallout(
  //   connection,
  //   {
  //     callout: {
  //       icon: EmojiRequest
  //     },
  //     pageId: page.id,
  //     secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
  //   },
  // );

  // await CApi.functional.connector.notion.page.synced_block.createSyncedBlock(
  //   connection,
  //   {
  //     ...typia.random<INotion.ICreateChildContentTypeSyncedBlockInput>(),
  //     pageId: page.id,
  //     secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
  //   },
  // );
};

export const test_api_connector_notion_create_paragraph_with_children = async (
  connection: CApi.IConnection,
) => {
  const page = await CApi.functional.connector.notion.page.createPage(
    connection,
    {
      parentPageId: "350633865fff4049a38a2ae7e9a04407",
      secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
      title: "TEST",
    },
  );

  await CApi.functional.connector.notion.page.paragraph.createParagraph(
    connection,
    {
      paragraph: {
        rich_text: [
          {
            text: {
              content: "hello paragraph",
              link: {
                url: "https://wrtn.ai",
              },
            },
          },
        ],
        children: [
          {
            paragraph: {
              rich_text: [
                {
                  text: {
                    content: "hello, children!",
                  },
                },
              ],
              children: [
                {
                  paragraph: {
                    rich_text: [
                      {
                        text: {
                          content: "hello, children's children",
                        },
                      },
                    ],
                    children: [],
                  },
                },
              ],
            },
          },
        ],
      },
      pageId: page.id,
      secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
    },
  );
};

export const test_api_connector_notion_create_toggle_with_children = async (
  connection: CApi.IConnection,
) => {
  const page = await CApi.functional.connector.notion.page.createPage(
    connection,
    {
      parentPageId: "350633865fff4049a38a2ae7e9a04407",
      secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
      title: "TEST",
    },
  );

  await CApi.functional.connector.notion.page.toggle.createToggle(connection, {
    toggle: {
      rich_text: [
        {
          text: {
            content: "hello toggle",
            link: {
              url: "https://wrtn.ai",
            },
          },
        },
      ],
      children: [
        {
          toggle: {
            rich_text: [
              {
                text: {
                  content: "hello, children!",
                },
              },
            ],
            children: [
              {
                toggle: {
                  rich_text: [
                    {
                      text: {
                        content: "hello, children's children",
                      },
                    },
                  ],
                  children: [],
                },
              },
            ],
          },
        },
      ],
    },
    pageId: page.id,
    secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
  });
};

export const test_api_connector_notion_transform_markdown_to_page = async (
  connection: CApi.IConnection,
) => {
  const res = await CApi.functional.connector.notion.markdown.transform(
    connection,
    {
      markdown: `## 삼성전자 추가 분석

### 최근 뉴스 및 시장 동향
1. **[Samsung Electronics Announces Results for Second Quarter of 2024](https://news.samsung.com/global/samsung-electronics-announces-results-for-second-quarter-of-2024)**
   - 삼성전자는 2024년 2분기 실적을 발표했습니다. 회사는 74.07조 원의 통합 매출을 기록했습니다.

2. **[Samsung Electronics Co., Ltd. (005930.KS) Stock Quote](https://finance.yahoo.com/quote/005930.KS/)**
   - 삼성전자 주식의 최신 정보, 주가, 뉴스 등을 제공합니다.
     - 삼성전자 주식의 최신 정보란?`,
      parentPageId: "011ff941f052423f8a203d8a84e4e71f",
      title: "TEST",
      secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
    },
  );

  typia.assert(res);
};
