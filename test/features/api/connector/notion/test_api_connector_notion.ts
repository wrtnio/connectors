import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { INotion } from "@wrtn/connector-api/lib/structures/connector/notion/INotion";

export const test_api_connector_notion = async (
  connection: CApi.IConnection,
) => {
  const databaseId = "5735baa1-5183-4508-9070-ca0ac5a3ec4c";
  const secretKey = "secret_yktaeuBG0D6kbWZGQJlas2zrnhA1pOXOFqj1ekfJJqx";
  /**
   * Create page
   */
  const page: INotion.ICreatePageOutput =
    await CApi.functional.connector.notion.page.createPage(connection, {
      parentPageId: "80b6f9600d9e402781f9ed323a2c1da3",
      title: "페이지 생성 테스트",
      content: "페이지 생성 테스트 입니다.",
      secretKey,
    });
  typia.assertEquals<INotion.ICreatePageOutput>(page);

  const pageId = page.id;

  /**
   * Read page List
   */
  const pageList: INotion.IReadPageOutput[] =
    await CApi.functional.connector.notion.get.page.readPageList(connection, {
      secretKey,
    });
  typia.assertEquals<INotion.IReadPageOutput[]>(pageList);

  /**
   * Append Content to end of page
   */
  await CApi.functional.connector.notion.page.content.appendPageToContent(
    connection,
    pageId,
    { content: "WOW", secretKey },
  );

  /**
   * Find page by title
   */
  const pageOutputFindByTitle: INotion.IFindPageByTitleOutput =
    await CApi.functional.connector.notion.get_page_by_title.getPageByTitle(
      connection,
      {
        title: "connector-poc-test",
        secretKey,
      },
    );
  typia.assertEquals<INotion.IFindPageByTitleOutput>(pageOutputFindByTitle);

  /**
   * Get DatabaseInfo List
   */
  const databaseListInfo: INotion.IDatabaseInfo[] =
    await CApi.functional.connector.notion.get.database_info.getDatabaseListInfo(
      connection,
      {
        secretKey,
      },
    );
  typia.assertEquals<INotion.IDatabaseInfo[]>(databaseListInfo);

  /**
   * Get Database Info
   */
  const databaseInfo: INotion.IDatabaseInfo =
    await CApi.functional.connector.notion.get.database_info.getDatabaseInfo(
      connection,
      {
        secretKey,
      },
      databaseId,
    );
  typia.assertEquals<INotion.IDatabaseInfo>(databaseInfo);

  /**
   * Get User list
   */
  const users: INotion.IUserOutput[] =
    await CApi.functional.connector.notion.get.users.getUsers(connection, {
      secretKey,
    });
  typia.assertEquals<INotion.IUserOutput[]>(users);

  /**
   * Create Database Item
   */
  const createdDatabaseItem: INotion.IDatabaseItemOutput =
    await CApi.functional.connector.notion.database_item.createDatabaseItem(
      connection,
      {
        /**
         * 데이터베이스가 가지고 있는 프로퍼티에 따라 동적으로 달라짐.
         * 추후 구조 확정되면 리팩토링 필요.
         */
        다중선택: ["태그1", "태그2"],
        숫자: 10,
        이름: "데이터베이스 아이템 생성 테스트",
        선택: "선택1",
        텍스트: "데이터베이스 아이템 생성",
        이메일: "123@123.com",
        URL: "https://wrtn.ai",
        상태: "진행 중",
        전화번호: `010-1234-1234`,
        체크박스: true,
        날짜: {
          start: "2024-01-31",
          end: null,
        },
        사람: ["ef7bcb1a-d894-4cfb-af5c-37861954503a"],

        /**
         * 데이터베이스 페이지 안에 생성할 텍스트
         */
        content: "데이터베이스 아이템 생성 성공",
        contentType: "plainText",
        secretKey,
      },
      databaseId,
    );
  typia.assertEquals<INotion.IDatabaseItemOutput>(createdDatabaseItem);

  /**
   * Update Database Item
   */
  const updatedDatabaseItem: INotion.IDatabaseItemOutput =
    await CApi.functional.connector.notion.database_item.updateDatabaseItem(
      connection,
      {
        pageId: createdDatabaseItem.id,
        /**
         * 데이터베이스가 가지고 있는 프로퍼티에 따라 동적으로 달라짐.
         * 추후 구조 확정되면 리팩토링 필요.
         */
        숫자: 12341234,
        이름: "아이템 업데이트",
        선택: "선택1",
        텍스트: "업데이트 성공",
        이메일: "update@123.com",
        URL: "https://studio.wrtn.ai",
        상태: "진행 중",
        전화번호: `02-1234-5678`,
        체크박스: true,
        날짜: {
          start: "2024-01-31",
          end: "2024-02-01",
        },
        사람: ["ef7bcb1a-d894-4cfb-af5c-37861954503a"],

        /**
         * 데이터베이스 페이지 안에 업데이트 할 텍스트
         */
        content: "데이터베이스 아이템 업데이트 성공",
        secretKey,
      },
      databaseId,
    );
  typia.assertEquals<INotion.IDatabaseItemOutput>(updatedDatabaseItem);

  /**
   * Find DatabaseItem List
   */
  const databaseItemList: INotion.IDatabaseItemOutput[] =
    await CApi.functional.connector.notion.find_item_list.getDatabaseItemList(
      connection,
      {
        secretKey,
      },
      databaseId,
    );
  typia.assertEquals<INotion.IDatabaseItemOutput[]>(databaseItemList);

  /**
   * Find Database Item
   */
  const databaseItem: INotion.IDatabaseItemOutput =
    await CApi.functional.connector.notion.find_item.getDatabaseItem(
      connection,
      {
        number: 1,
        rich_text: "텍스트1",
        secretKey,
      },
      databaseId,
    );
  typia.assertEquals<INotion.IDatabaseItemOutput>(databaseItem);
};
