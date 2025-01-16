import core, { TypedBody, TypedParam } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { IExternalUser } from "@wrtn/connector-api/lib/structures/common/IExternalUser";
import { IPage } from "@wrtn/connector-api/lib/structures/common/IPage";
import { IArticle } from "@wrtn/connector-api/lib/structures/connector/swal/article/IArticle";
import { IArticleExport } from "@wrtn/connector-api/lib/structures/connector/swal/article/IArticleExport";
import { StrictOmit } from "@wrtn/connector-api/lib/structures/types/strictOmit";
import { Prerequisite, SelectBenchmark } from "@wrtnio/decorators";
import { ExternalUser } from "../../../../decorators/ExternalUser";
import { DocumentProvider } from "../../../../providers/connector/swal/article/DocumentProvider";

@Controller("connector/swal/articles")
export class ArticleController {
  /**
   * upgrade or downgrade version of exported dev.to
   *
   * Synchronize on a snapshot basis,
   * such as upgrading or downgrading the version of a document exported to DevTo.
   * If user specify the id of the snapshot in the names from and to among the internal properties,
   * find the exported text from `from` and start synchronizing to the version of `to`.
   * If user want to revert to the past version of the snapshot,
   * user can put the current version in 'from' and the past version in 'to'.
   *
   * @summary Syncronize article version
   * @param articleId Target article's {@link IArticle.id}, Not snapshot ID
   * @param input DevTo Secret and snapshot information to sync
   * @returns Response of Synchronization
   */
  @SelectBenchmark("dev.to에 동기화해줘")
  @core.TypedRoute.Post(":id/sync/dev-to")
  async syncToDevTo(
    @ExternalUser() external_user: IExternalUser,
    @Prerequisite({
      neighbor: () => ArticleController.prototype.index,
      jmesPath: "data[].{ value: id, label: snapshot.title }",
    })
    @TypedParam("id")
    articleId: IArticle["id"],
    @TypedBody() input: IArticle.ISync.ToDevToInput,
  ): Promise<IArticle.ISync.ToDevToOutput> {
    return DocumentProvider.sync("dev_to")(external_user, articleId, input);
  }

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
  @SelectBenchmark("google docs에 동기화해줘")
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
  @SelectBenchmark("노션에 동기화해줘")
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
   * Export the text to Dev.to
   *
   * The exported text is recorded by creating a
   * {@link IArticleExport bbs_article_exports} object based on the snapshot.
   * You can upgrade and downgrade the version using
   * the 'POST /connector/swal/articles/:id/exports/sync/dev_to' connector in the future.
   * Also, it doesn't matter if you export the same version of the text multiple times.
   *
   * Because each export generates a new text,
   * you must use the `sync` connector if you want to change the version of an already exported text.
   *
   * @summary Exports specified article to dev_to
   * @param articleId Target article's {@link IArticle.id}, Not snapshot ID
   * @param input DevTo Secret and snapshot information to export
   * @returns Article Infomation and dev_to secretKey
   */
  @SelectBenchmark("dev.to로 내보내줘")
  @core.TypedRoute.Post(":id/exports/dev-to")
  async exportsToDevTo(
    @ExternalUser() external_user: IExternalUser,
    @Prerequisite({
      neighbor: () => ArticleController.prototype.index,
      jmesPath: "data[].{ value: id, label: snapshot.title }",
    })
    @TypedParam("id")
    articleId: IArticle["id"],
    @TypedBody() input: IArticle.IExport.ToDevToInput,
  ): Promise<IArticle.IExport.ToDevToOutput> {
    return DocumentProvider.exports("dev_to")(external_user, articleId, input);
  }

  /**
   * Export the text to GoogleDocs
   *
   * The exported text is recorded by creating a
   * {@link IArticleExport bbs_article_exports} object based on the snapshot.
   * You can upgrade and downgrade the version using
   * the 'POST /connector/swal/articles/:id/exports/sync/google_docs' connector in the future.
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
  @SelectBenchmark("google docs로 내보내줘")
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
   * the 'POST /connector/swal/articles/:id/exports/sync/notion' connector in the future.
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
  @SelectBenchmark("notion으로 내보내줘")
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
  @SelectBenchmark("글 내용 보여줘")
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
  @SelectBenchmark("내 글 삭제해줘")
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
  @SelectBenchmark("내 글 수정해줘")
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
   * Users can only view their own writings.
   * As this retrieves text from the connector server's database, confirm the service name if unspecified.
   * Use this connector for requests mentioning Swal, Wrtn Technologies, Wrtn, user own DB, etc.
   * Displays paginated articles with abbreviated content (up to 100 characters).
   * To view full content, export history (e.g., Notion), or detailed snapshots, use the detailed lookup connector: PATCH connector/swal/articles/:id.
   *
   * @summary List up all summarized articles
   * @param input Request info of pagination and searching options.
   * @returns Paginated summarized articles.
   */
  @SelectBenchmark("내 글 조회해줘")
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
   * Posts use a snapshot-based structure for rollback anytime.
   * Creating a post automatically generates the first snapshot, and the latest snapshot reflects the current state.
   * Edits and exports track versions through snapshots, allowing synchronization via foreign keys.
   * This system handles post-like documents (e.g., Google Docs, Notion, Reddit) efficiently.
   * Markdown is the standard format, with changes identified using a diff algorithm.
   * Compare versions, track edits, and synchronize updates across services.
   * All data is stored exclusively in the Wrtn Technologies database, independent of external APIs.
   * This setup ensures efficient document management with robust version control.
   * Editing is managed by a separate connector. Use it for updates.
   * For writing without service names, confirm with the user.
   *
   * @sumamry Write Article
   * @param input Article Information to Create
   */
  @SelectBenchmark("내 개인 DB에 글 좀 써줘")
  @core.TypedRoute.Post()
  async write(
    @ExternalUser() external_user: IExternalUser,
    @TypedBody() input: IArticle.ICreate,
  ): Promise<StrictOmit<IArticle, "password">> {
    return DocumentProvider.create(external_user, input);
  }
}
