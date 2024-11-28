import { Prisma } from "@prisma/client";
import { IArticle } from "@wrtn/connector-api/lib/structures/connector/articles/IArticles";
import { randomUUID } from "crypto";

export namespace ArticleProvider {
  export const collect =
    <
      Input extends IArticle.ICreate,
      Snapshot extends Prisma.bbs_article_snapshotsCreateWithoutArticleInput,
    >(
      type: string,
      snapshotFactory: (input: Input) => Snapshot,
    ) =>
    (input: Input) => {
      const created_at = new Date();
      const snapshot = snapshotFactory(input);
      return {
        id: randomUUID(),
        type,
        created_at,
        snapshots: {
          create: [snapshot],
        },
        mv_last: {
          create: {
            snapshot: {
              connect: { id: snapshot.id },
            },
          },
        },
      } satisfies Prisma.bbs_articlesCreateInput;
    };
}
