import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { ICommon } from "@wrtn/connector-api/lib/structures/connector/common/ISecretValue";
import { INotion } from "@wrtn/connector-api/lib/structures/connector/notion/INotion";

import { NotionProvider } from "../../../providers/connector/notion/NotionProvider";

@Controller("connector/notion")
export class NotionController {
  /**
   * Create Notion Page.
   *
   * @param input parentPageId, pageTitle, pageContent
   *
   * @returns created page id
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
   * Read Notion Page list.
   *
   * @returns read page output list
   *
   * @tag Notion
   */
  @core.TypedRoute.Post("/get/page")
  async readPageList(
    @core.TypedBody() input: ICommon.ISecret<"Notion">,
  ): Promise<INotion.IReadPageOutput[]> {
    return NotionProvider.readPageList(input);
  }

  /**
   * Get user list in workspace.
   *
   * @returns user id and name
   *
   * @tag Notion
   */
  @core.TypedRoute.Post("get/users")
  async getUsers(
    @core.TypedBody() input: ICommon.ISecret<"Notion">,
  ): Promise<INotion.IUserOutput[]> {
    return NotionProvider.getUsers(input);
  }

  /**
   * Append Content end of Notion Page.
   *
   * @param input pageId, content
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
   * Get Database list Info for create Item in database.
   *
   * @returns array of databaseId, database title, database properties info
   *
   * @tag Notion
   */
  @core.TypedRoute.Post("get/database-info")
  async getDatabaseListInfo(
    @core.TypedBody() input: ICommon.ISecret<"Notion">,
  ): Promise<INotion.IDatabaseInfo[]> {
    return NotionProvider.getDatabaseListInfo(input);
  }

  /**
   * Get Database Info for create Item in database.
   *
   * @param databaseId
   *
   * @returns  databaseId, database title, database properties info
   *
   * @tag Notion
   */
  @core.TypedRoute.Post("get/database-info/:databaseId")
  async getDatabaseInfo(
    @core.TypedBody() input: ICommon.ISecret<"Notion">,
    @core.TypedParam("databaseId") databaseId: string,
  ): Promise<INotion.IDatabaseInfo> {
    return NotionProvider.getDatabaseInfo(input, databaseId);
  }

  /**
   * Create Database Item.
   *
   * @param input database properties value for create item, database item page content, database item page content type
   *
   * @param databaseId
   *
   * @returns DatabaseItemOutput
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
   * Update Database Item.
   *
   * @param input database properties value for update item, database item page content
   *
   * @param databaseId
   *
   * @returns DatabaseItemOutput
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
   * Get Page By Title.
   *
   * @param input page title
   *
   * @returns Page Output
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
   * Get Database Item List.
   *
   * @param databaseId
   *
   * @returns Database Item List
   *
   * @tag Notion
   */
  @core.TypedRoute.Post("/find-item-list/:databaseId")
  async getDatabaseItemList(
    @core.TypedBody() input: ICommon.ISecret<"Notion">,
    @core.TypedParam("databaseId") databaseId: string,
  ): Promise<INotion.IDatabaseItemOutput[]> {
    return NotionProvider.findDatabaseItemList(input, databaseId);
  }

  /**
   * Get Database Item.
   *
   * @param input properties value for filtering database
   *
   * @param databaseId select database for find item
   *
   * @returns Database Item
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
