import { TypedBody } from "@nestia/core";
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

  async write(@TypedBody() input: IArticle.ICreate): Promise<any> {
    return DocumentProvider.create(input);
  }
}
