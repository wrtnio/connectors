import core, { TypedBody, TypedParam } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { IExternalUser } from "@wrtn/connector-api/lib/structures/common/IExternalUser";
import { IPage } from "@wrtn/connector-api/lib/structures/common/IPage";
import { IArticle } from "@wrtn/connector-api/lib/structures/connector/articles/IArticle";
import { StrictOmit } from "@wrtn/connector-api/lib/structures/types/strictOmit";
import { ExternalUser } from "../../../decorators/ExternalUser";
import { DocumentProvider } from "../../../providers/connector/article/DocumentProvider";

@Controller("connector/articles")
export class ArticlesController {
  // @core.TypedRoute.Post(":id/exports/sync/notion")
  // async syncToNotion(
  //   @ExternalUser() external_user: IExternalUser,
  //   @TypedParam("id") articleId: IArticle["id"],
  //   @TypedBody() input: IArticle.ISync.ToNotionInput,
  // ) {}

  /**
   * @summary Exports specified article to notion
   * @param id Target article's {@link IArticle.id}
   * @returns Article Infomation and notion secretKey
   */
  @core.TypedRoute.Post(":id/exports/notion")
  async exportsToNotion(
    @ExternalUser() external_user: IExternalUser,
    @TypedParam("id") articleId: IArticle["id"],
    @TypedBody() input: IArticle.IExport.ToNotionInput,
  ): Promise<IArticle.IExport.ToNotionOutput> {
    return DocumentProvider.exports("notion")(external_user, articleId, input);
  }

  /**
   * Reads an article with its every {@link IArticle.ISnapshot snapshots}
   *
   * @sumamry Read individual article
   * @param id Target article's {@link IArticle.id}
   * @returns Article Infomation
   */
  @core.TypedRoute.Patch(":id")
  async at(
    @ExternalUser() external_user: IExternalUser,
    @TypedParam("id") articleId: IArticle["id"],
  ): Promise<StrictOmit<IArticle, "password">> {
    return DocumentProvider.at(external_user, articleId);
  }

  /**
   * Erase an article
   *
   * Performs soft deletion to the article.
   *
   * @summary Remove an specified article
   * @param id Target article's {@link IArticle.id}
   * @param input Password of the article.
   */
  @core.TypedRoute.Delete(":id")
  async remove(
    @ExternalUser() external_user: IExternalUser,
    /**
     * @title Article ID to remove
     */
    @TypedParam("id") articleId: IArticle["id"],
  ): Promise<void> {
    return DocumentProvider.remove(external_user, articleId);
  }

  /**
   * Update an existing article in the User Database
   *
   * This function takes the updated article data as input and updates the corresponding
   * article record in the User Database. It uses the DocumentProvider to apply the changes.
   * The input must adhere to the structure defined by `IArticle.IUpdate`.
   * Returns the updated document or the result of the update operation.
   *
   * @summary Updates the specified article with new data
   * @param input - The new data to update the article. It must match the `IArticle.IUpdate` type.
   * @returns The result of the update operation from the DocumentProvider.
   */
  @core.TypedRoute.Put(":id")
  async update(
    @ExternalUser() external_user: IExternalUser,
    /**
     * @title Article ID to update
     */
    @TypedParam("id") articleId: IArticle["id"],
    @TypedBody() input: IArticle.IUpdate,
  ): Promise<IArticle.ISnapshot> {
    return DocumentProvider.update(external_user, articleId, input);
  }

  /**
   * List up all summarized articles with pagination and searching options
   *
   * @summary List up all summarized articles
   * @param input Request info of pagination and searching options.
   * @returns Paginated summarized articles.
   */
  @core.TypedRoute.Patch()
  async index(
    @ExternalUser() external_user: IExternalUser,
    @TypedBody() input: IArticle.IRequest,
  ): Promise<IPage<IArticle.ISummary>> {
    return DocumentProvider.index(external_user, input);
  }

  /**
   * Write Article to User Database
   *
   * Posts are managed in a snapshot-based structure, enabling rollback at any time.
   * When a post is created, the system automatically generates the first snapshot.
   * The most recent snapshot reflects the current state of the post.
   * By editing the post or exporting it to external services, you can track which version—i.e., which snapshot—was exported and synchronize it using foreign keys.
   * This system is designed to efficiently handle any post-like documents, such as those from Google Docs, Notion, or Reddit.
   * Using Markdown as the standard format for writing and versioning, it identifies changes through a diff algorithm whenever edits are made.
   * This allows you to compare previous and current versions, track changes, and synchronize updates across services.
   * As these APIs store data exclusively in the Wrtn Technologies Ecosystem Team's database without relying on external APIs,
   * this setup serves as an ideal starting point for creating and managing documents efficiently with robust version control.
   *
   * @sumamry Write Article
   */
  @core.TypedRoute.Post()
  async write(
    @ExternalUser() external_user: IExternalUser,
    @TypedBody() input: IArticle.ICreate,
  ): Promise<StrictOmit<IArticle, "password">> {
    return DocumentProvider.create(external_user, input);
  }
}
