import { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { IArticles } from "@wrtn/connector-api/lib/structures/connector/articles/IArticles";
import { ArticlesProvider } from "../../../providers/connector/articles/ArticlesProvider";

@Controller("connector/articles")
export class ArticlesController {
  constructor(private readonly articlesProvider: ArticlesProvider) {}

  /**
   * Exports some article to other service, for example notion, google docs or others.
   *
   * @summary Exports Article to other service
   */
  // @core.TypedRoute.Post("exports")
  async exports(
    @TypedBody()
    input: IArticles.IExportSecretInput,
  ): Promise<1> {
    input;
    return 1 as const;
  }
}
