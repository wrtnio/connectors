import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { ICommon } from "@wrtn/connector-api/lib/structures/connector/common/ISecretValue";
import { INotion } from "@wrtn/connector-api/lib/structures/connector/notion/INotion";

import { NotionProvider } from "../../../providers/connector/notion/NotionProvider";

@Controller("connector/notion")
export class NotionController {
  /**
   * 노션 페이지를 생성합니다.
   *
   * @summary 페이지 생성
   *
   * @param input 페이지 생성에 필요한 정보
   *
   * @returns 생성된 페이지 고유 id
   *
   * @tag Notion
   */
  @core.TypedRoute.Post("/page")
  async createPage(
    @core.TypedBody() input: INotion.ICreatePageInput,
  ): Promise<INotion.ICreatePageOutput> {
    return NotionProvider.createPage(input);
  }

  /**
   * 노션 워크스페이스에 존재하는 모든 페이지 목록을 조회합니다.
   *
   * @summary 페이지 목록 조회
   *
   * @returns 페이지 정보들
   *
   * @tag Notion
   */
  @core.TypedRoute.Post("/get/page")
  async readPageList(
    @core.TypedBody() input: ICommon.ISecret<"notion">,
  ): Promise<INotion.IReadPageOutput[]> {
    return NotionProvider.readPageList(input);
  }

  /**
   * 워크스페이스에 있는 유저 목록을 조회합니다.
   *
   * @summary 유저 목록 조회
   *
   * @returns 유저 정보들
   *
   * @tag Notion
   */
  @core.TypedRoute.Post("get/users")
  async getUsers(
    @core.TypedBody() input: ICommon.ISecret<"notion">,
  ): Promise<INotion.IUserOutput[]> {
    return NotionProvider.getUsers(input);
  }

  /**
   * 페이지 끝에 내용을 추가합니다.
   *
   * @summary 페이지에 내용 추가
   *
   * @param input 페이지에 추가할 내용 및 추가할 페이지 정보
   *
   * @returns void
   *
   * @tag Notion
   */
  @core.TypedRoute.Post("/page/content/:pageId")
  async appendPageToContent(
    @core.TypedParam("pageId") pageId: string,
    @core.TypedBody() input: INotion.IAppendPageToContentInput,
  ): Promise<void> {
    return NotionProvider.appendPageToContent(pageId, input);
  }

  /**
   * 데이터베이스에 아이템을 생성하기 위해 데이터베이스 목록을 조회합니다.
   *
   * @summary 데이터베이스 목록 조회
   *
   * @returns 데이터베이스 정보 목록
   *
   * @tag Notion
   */
  @core.TypedRoute.Post("get/database-info")
  async getDatabaseListInfo(
    @core.TypedBody() input: ICommon.ISecret<"notion">,
  ): Promise<INotion.IDatabaseInfo[]> {
    return NotionProvider.getDatabaseListInfo(input);
  }

  /**
   * 데이터베이스에 아이템을 생성하기 위한 데이터베이스 정보를 조회합니다.
   *
   * @summary 데이터베이스 정보 조회
   *
   * @param databaseId 데이터베이스 고유 id
   *
   * @returns 데이터베이스 정보
   *
   * @tag Notion
   */
  @core.TypedRoute.Post("get/database-info/:databaseId")
  async getDatabaseInfo(
    @core.TypedBody() input: ICommon.ISecret<"notion">,
    @core.TypedParam("databaseId") databaseId: string,
  ): Promise<INotion.IDatabaseInfo> {
    return NotionProvider.getDatabaseInfo(input, databaseId);
  }

  /**
   * 노션 테이블 데이터베이스에 아이템을 생성합니다.
   *
   * @summary 데이터베이스 아이템 생성
   *
   * @param input 데이터베이스 아이템 생성에 필요한 정보
   *
   * @param databaseId 아이템을 생성할 데이터베이스 고유 id
   *
   * @returns 생성된 데이터베이스 아이템 정보
   *
   * @tag Notion
   */
  @core.TypedRoute.Post("/database-item/:databaseId")
  async createDatabaseItem(
    @core.TypedBody() input: INotion.ICreateDatabaseItemInput,
    @core.TypedParam("databaseId") databaseId: string,
  ): Promise<INotion.IDatabaseItemOutput> {
    return NotionProvider.createDatabaseItem(input, databaseId);
  }

  /**
   * 데이터베이스에 있는 아이템 정보를 수정합니다.
   *
   * @summary 데이터베이스 아이템 수정
   *
   * @param input 수정할 데이터베이스 아이템 정보
   *
   * @param databaseId 수정할 데이터베이스 고유 id
   *
   * @returns 수정된 데이터베이스 아이템 정보
   *
   * @tag Notion
   */
  @core.TypedRoute.Patch("/database-item/:pageId")
  async updateDatabaseItem(
    @core.TypedBody() input: INotion.IUpdateDatabaseItemInput,
    @core.TypedParam("pageId") databaseId: string,
  ): Promise<INotion.IDatabaseItemOutput> {
    return NotionProvider.updateDatabaseItem(input, databaseId);
  }

  /**
   * 제목으로 페이지를 검색합니다.
   *
   * @summary 제목으로 페이지 검색
   *
   * @param input 페이지 제목
   *
   * @returns 검색된 페이지 정보
   *
   * @tag Notion
   */
  @core.TypedRoute.Post("/get-page-by-title")
  async getPageByTitle(
    @core.TypedBody() input: INotion.IFindPageOrDatabaseItemInput,
  ): Promise<INotion.IFindPageByTitleOutput> {
    return NotionProvider.findPageByTitle(input);
  }

  /**
   * 테이블 데이터베이스에 존재하는 아이템 목록을 조회합니다.
   *
   * @summary 데이터베이스 아이템 목록 조회
   *
   * @param databaseId 데이터베이스 고유 id
   *
   * @returns 조회된 데이터베이스 아이템 목록 정보
   *
   * @tag Notion
   */
  @core.TypedRoute.Post("/find-item-list/:databaseId")
  async getDatabaseItemList(
    @core.TypedBody() input: ICommon.ISecret<"notion">,
    @core.TypedParam("databaseId") databaseId: string,
  ): Promise<INotion.IDatabaseItemOutput[]> {
    return NotionProvider.findDatabaseItemList(input, databaseId);
  }

  /**
   * 테이블 데이터베이스에 존재하는 아이템을 조회합니다.
   *
   * @summary 데이터베이스 아이템 조회
   *
   * @param input 데이터베이스 아이템 조회에 필요한 정보
   *
   * @param databaseId 데이터베이스 고유 id
   *
   * @returns 조회된 데이터베이스 아이템 정보
   *
   * @tag Notion
   */
  @core.TypedRoute.Post("/find-item/:databaseId")
  async getDatabaseItem(
    @core.TypedBody() input: INotion.IFindDatabaseItemInput,
    @core.TypedParam("databaseId") databaseId: string,
  ): Promise<INotion.IDatabaseItemOutput> {
    return NotionProvider.findDatabaseItem(input, databaseId);
  }
}
