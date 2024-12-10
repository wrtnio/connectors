import core, { TypedBody, TypedParam } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { IExternalUser } from "@wrtn/connector-api/lib/structures/common/IExternalUser";
import { IPage } from "@wrtn/connector-api/lib/structures/common/IPage";
import { IArticle } from "@wrtn/connector-api/lib/structures/connector/articles/IArticle";
import { IArticleExport } from "@wrtn/connector-api/lib/structures/connector/articles/IArticleExport";
import { StrictOmit } from "@wrtn/connector-api/lib/structures/types/strictOmit";
import { Prerequisite } from "@wrtnio/decorators";
import { ExternalUser } from "../../../../decorators/ExternalUser";
import { DocumentProvider } from "../../../../providers/connector/swal/article/DocumentProvider";

@Controller("connector/swal/articles")
export class ArticleController {
  /**
   * upgrade or downgrade version of exported google docs file
   *
   * Synchronize on a snapshot basis,
   * such as upgrading or downgrading the version of a document exported to GoogleDocs.
   * If user specify the id of the snapshot in the names from and to among the internal properties,
   * find the exported text from `from` and start synchronizing to the version of `to`.
   * If user want to revert to the past version of the snapshot,
   * user can put the current version in 'from' and the past version in 'to'.
   *
   * @summary Syncronize article version
   * @param articleId Target article's {@link IArticle.id}, Not snapshot ID
   * @param input GoogleDocs Secret and snapshot information to sync
   * @returns Response of Synchronization
   */
  @core.TypedRoute.Post(":id/sync/google-docs")
  async syncToGoogleDocs(
    @ExternalUser() external_user: IExternalUser,
    @Prerequisite({
      neighbor: () => ArticleController.prototype.index,
      jmesPath: "data[].{ value: id, label: snapshot.title }",
    })
    @TypedParam("id")
    articleId: IArticle["id"],
    @TypedBody() input: IArticle.ISync.ToGoogleDocsInput,
  ): Promise<IArticle.ISync.ToGoogleDocsOutput> {
    return DocumentProvider.sync("google_docs")(
      external_user,
      articleId,
      input,
    );
  }

  /**
   * upgrade or downgrade version of exported notion page
   *
   * Synchronize on a snapshot basis,
   * such as upgrading or downgrading the version of a document exported to Notion.
   * If user specify the id of the snapshot in the names from and to among the internal properties,
   * find the exported text from `from` and start synchronizing to the version of `to`.
   * If user want to revert to the past version of the snapshot,
   * user can put the current version in 'from' and the past version in 'to'.
   *
   * @summary Syncronize article version
   * @param articleId Target article's {@link IArticle.id}, Not snapshot ID
   * @param input Notion Secret and snapshot information to sync
   * @returns Response of Synchronization
   */
  @core.TypedRoute.Post(":id/sync/notion")
  async syncToNotion(
    @ExternalUser() external_user: IExternalUser,
    @Prerequisite({
      neighbor: () => ArticleController.prototype.index,
      jmesPath: "data[].{ value: id, label: snapshot.title }",
    })
    @TypedParam("id")
    articleId: IArticle["id"],
    @TypedBody() input: IArticle.ISync.ToNotionInput,
  ): Promise<IArticle.ISync.ToNotionOutput> {
    return DocumentProvider.sync("notion")(external_user, articleId, input);
  }

  /**
   * Export the text to GoogleDocs
   *
   * The exported text is recorded by creating a
   * {@link IArticleExport bbs_article_exports} object based on the snapshot.
   * You can upgrade and downgrade the version using
   * the 'POST /connector/articles/:id/exports/sync/google_docs' connector in the future.
   * Also, it doesn't matter if you export the same version of the text multiple times.
   *
   * Because each export generates a new text,
   * you must use the `sync` connector if you want to change the version of an already exported text.
   *
   * @summary Exports specified article to google_docs
   * @param articleId Target article's {@link IArticle.id}, Not snapshot ID
   * @param input GoogleDocs Secret and snapshot information to export
   * @returns Article Infomation and google_docs secretKey
   */
  @core.TypedRoute.Post(":id/exports/google-docs")
  async exportsToGoogleDocs(
    @ExternalUser() external_user: IExternalUser,
    @Prerequisite({
      neighbor: () => ArticleController.prototype.index,
      jmesPath: "data[].{ value: id, label: snapshot.title }",
    })
    @TypedParam("id")
    articleId: IArticle["id"],
    @TypedBody() input: IArticle.IExport.ToGoogleDocsInput,
  ): Promise<IArticle.IExport.ToGoogleDocsOutput> {
    return DocumentProvider.exports("google_docs")(
      external_user,
      articleId,
      input,
    );
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
   * Because each export generates a new text,
   * you must use the `sync` connector if you want to change the version of an already exported text.
   *
   * @summary Exports specified article to notion
   * @param articleId Target article's {@link IArticle.id}, Not snapshot ID
   * @param input Notion Secret and snapshot information to export
   * @returns Article Infomation and notion secretKey
   */
  @core.TypedRoute.Post(":id/exports/notion")
  async exportsToNotion(
    @ExternalUser() external_user: IExternalUser,
    @Prerequisite({
      neighbor: () => ArticleController.prototype.index,
      jmesPath: "data[].{ value: id, label: snapshot.title }",
    })
    @TypedParam("id")
    articleId: IArticle["id"],
    @TypedBody() input: IArticle.IExport.ToNotionInput,
  ): Promise<IArticle.IExport.ToNotionOutput> {
    return DocumentProvider.exports("notion")(external_user, articleId, input);
  }

  /**
   * Read an entire contents of article with its every snapshots
   *
   * All text content that is not omitted is shown here, so you can also see how the text has been modified at once.
   * This connector reads an article with its every snapshots {@link IArticle.ISnapshot snapshots}
   * This detail contains the entire content created for each version of the document,
   * as well as the connection information to the external services from which it was exported.
   *
   * @sumamry Read individual detailed article includes body
   * @param articleId Target article's {@link IArticle.id}, Not snapshot ID
   * @returns Article Infomation
   */
  @core.TypedRoute.Patch(":id")
  async at(
    @ExternalUser() external_user: IExternalUser,
    @Prerequisite({
      neighbor: () => ArticleController.prototype.index,
      jmesPath: "data[].{ value: id, label: snapshot.title }",
    })
    @TypedParam("id")
    articleId: IArticle["id"],
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
   * @param articleId Target article's {@link IArticle.id}, Not snapshot ID
   * @param input Password of the article.
   */
  @core.TypedRoute.Delete(":id")
  async remove(
    @ExternalUser() external_user: IExternalUser,
    /**
     * @title Article ID to remove
     */
    @Prerequisite({
      neighbor: () => ArticleController.prototype.index,
      jmesPath: "data[].{ value: id, label: snapshot.title }",
    })
    @TypedParam("id")
    articleId: IArticle["id"],
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
    @Prerequisite({
      neighbor: () => ArticleController.prototype.index,
      jmesPath: "data[].{ value: id, label: snapshot.title }",
    })
    @TypedParam("id")
    articleId: IArticle["id"],
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
   * A list of pageed articles will appear.
   * The article contains abbreviated body content, so you can infer what you have from the title and body.
   *
   * If you want to see the full text instead of the omitted text,
   * or if you want to see the history of this article being exported to Notion or other services,
   * please look up the details.
   * Here, we only show the content of the text up to 100 characters, so if you want to see the latter, you need to look up the details.
   * You can view all the snapshots of this article if you want to look at them in detail.
   * The detailed lookup connector is 'PATCH connector/articles/:id'.
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
   * If the user asks you to write without any service names,
   * you may be referring to this connector.
   * Ask the user to confirm.
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
