import core, { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { IArticle } from "@wrtn/connector-api/lib/structures/connector/articles/IArticles";
import { DocumentProvider } from "../../../providers/connector/article/DocumentProvider";

@Controller("connector/articles")
export class ArticlesController {
  constructor() {}

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
