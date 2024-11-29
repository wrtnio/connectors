import { IArticle } from "@wrtn/connector-api/lib/structures/connector/articles/IArticles";
import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { BbsArticleProvider } from "./BbsArticleProvider";
import { BbsArticleSnapshotProvider } from "./BbsArticleSnapshotProvider";

export namespace DocumentProvider {
  export const create = async (input: IArticle.ICreate) => {
    const article = await ConnectorGlobal.prisma.bbs_articles.create({
      ...BbsArticleProvider.json.select(),
      data: BbsArticleProvider.collect(
        "document" as const,
        BbsArticleSnapshotProvider.collect,
      )(input),
    });

    return BbsArticleProvider.json.transform(article);
  };
}
