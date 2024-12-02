import core, { TypedBody, TypedParam } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { IExternalUser } from "@wrtn/connector-api/lib/structures/common/IExternalUser";
import { IPage } from "@wrtn/connector-api/lib/structures/common/IPage";
import { IArticle } from "@wrtn/connector-api/lib/structures/connector/articles/IArticle";
import { IArticleExport } from "@wrtn/connector-api/lib/structures/connector/articles/IArticleExport";
import { StrictOmit } from "@wrtn/connector-api/lib/structures/types/strictOmit";
import { ExternalUser } from "../../../decorators/ExternalUser";
import { DocumentProvider } from "../../../providers/connector/article/DocumentProvider";

@Controller("connector/articles")
export class ArticlesController {
  /**
   * Synchronize version
   *
   * Synchronize on a snapshot basis,
   * such as upgrading or downgrading the version of a document exported to Notion.
   * If you specify the id of the snapshot in the names from and to among the internal properties,
   * find the exported text from `from` and start synchronizing to the version of `to`.
   *
   * @summary Syncronize article version
   * @param articleId Target article's {@link IArticle.id}
   * @param input Notion Secret and snapshot information to sync
   * @returns Response of Synchronization
   */
  @core.TypedRoute.Post(":id/sync/notion")
  async syncToNotion(
    @ExternalUser() external_user: IExternalUser,
    @TypedParam("id") articleId: IArticle["id"],
    @TypedBody() input: IArticle.ISync.ToNotionInput,
  ): Promise<IArticle.ISync.ToNotionOutput> {
    return DocumentProvider.sync("notion")(external_user, articleId, input);
  }

  /**
   * Export the text to Notion
   *
   * The exported text is recorded by creating a
   * {@link IArticleExport bbs_article_exports} object based on the snapshot.
   * You can upgrade and downgrade the version using
   * the 'POST /connector/articles/:id/exports/sync/notion' connector in the future.
   * Also, it doesn't matter if you export the same version of the text multiple times.
   *
   * @summary Exports specified article to notion
   * @param articleId Target article's {@link IArticle.id}
   * @param input Notion Secret and snapshot information to export
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
   * Reads an article with its every snapshots
   *
   * Reads an article with its every snapshots {@link IArticle.ISnapshot snapshots}
   * This detail contains the entire content created for each version of the document,
   * as well as the connection information to the external services from which it was exported.
   *
   * @sumamry Read individual article
   * @param articleId Target article's {@link IArticle.id}
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
   * This makes the article no longer available, regardless of the number of snapshots.
   *
   * @summary Remove an specified article
   * @param articleId Target article's {@link IArticle.id}
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
   * Because it is a call to a text stored in the connector server's own DB,
   * it may be appropriate to call this connector if the user asks to call the text without saying the service name.
   * It is recommended that you first ask the user for the service name.
   * If you are asked to look up the text under the names of `Swal`, `Wrtn Technologies`, `Wrtn`, `user own DB`, `user DB`, etc., you should call this connector.
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
   * If the user asked to edit the text, it would most likely not be this connector.
   * There is a separate connector for the update, so please use it.
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
