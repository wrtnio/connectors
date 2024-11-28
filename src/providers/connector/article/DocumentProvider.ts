import { IArticle } from "@wrtn/connector-api/lib/structures/connector/articles/IArticles";
import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { ArticleProvider } from "./ArticleProvider";
import { ArticleSnapshotProvider } from "./ArticleSnapshotProvider";

export namespace DocumentProvider {
  export const create = async (input: IArticle.ICreate) => {
    await ConnectorGlobal.prisma.bbs_articles.create({
      data: ArticleProvider.collect(
        "document" as const,
        ArticleSnapshotProvider.collect,
      )(input),
    });
  };
}
