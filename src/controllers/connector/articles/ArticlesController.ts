import core, { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { IArticle } from "@wrtn/connector-api/lib/structures/connector/articles/IArticles";
import { DocumentProvider } from "../../../providers/connector/article/DocumentProvider";

@Controller("connector/articles")
export class ArticlesController {
  /**
   * Exports some article to other service, for example notion, google docs or others.
   *
   * @summary Exports Article to other service
   */
  // @core.TypedRoute.Post("exports")
  async exports(
    @TypedBody()
    input: IArticle.IExportSecretInput,
  ): Promise<1> {
    input;
    return 1 as const;
  }

  // /**
  //  * Erase an article.
  //  *
  //  * Performs soft deletion to the article.
  //  *
  //  * @param id Target article's {@link IBbsArticle.id}
  //  * @param input Password of the article.
  //  * @tag BBS
  //  *
  //  * @author Samchon
  //  */
  // @core.TypedRoute.Delete(":id")
  // public erase(
  //   @TypedParam("id") id: string & tags.Format<"uuid">,
  // ): void {
  //   id;
  // }

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
    @TypedBody() input: IArticle.IUpdate,
  ): Promise<IArticle.ISnapshot> {
    return DocumentProvider.update(input);
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
  async write(@TypedBody() input: IArticle.ICreate): Promise<IArticle> {
    return DocumentProvider.create(input);
  }
}
