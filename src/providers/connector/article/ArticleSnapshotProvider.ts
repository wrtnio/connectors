import { Prisma } from "@prisma/client";
import { IArticle } from "@wrtn/connector-api/lib/structures/connector/articles/IArticles";
import { randomUUID } from "crypto";

export namespace ArticleSnapshotProvider {
  export const collect = (input: IArticle.ICreate) => {
    return {
      id: randomUUID(),
      title: input.title,
      body: input.body,
      format: "md",
      created_at: new Date().toISOString(),
    } satisfies Prisma.bbs_article_snapshotsCreateWithoutArticleInput;
  };
}
