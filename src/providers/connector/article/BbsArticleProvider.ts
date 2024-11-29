import { Prisma } from "@prisma/client";
import { IArticle } from "@wrtn/connector-api/lib/structures/connector/articles/IArticles";
import { randomUUID } from "crypto";
import { BbsArticleSnapshotProvider } from "./BbsArticleSnapshotProvider";

export namespace BbsArticleProvider {
  export namespace json {
    export const transform = (
      input: Prisma.bbs_articlesGetPayload<ReturnType<typeof select>>,
    ): IArticle => {
      return {
        id: input.id,
        snapshots: input.snapshots
          .sort((a, b) => a.created_at.getTime() - b.created_at.getTime())
          .map(BbsArticleSnapshotProvider.json.transform),
        created_at: input.created_at.toISOString(),
      };
    };

    export const select = () => {
      return {
        include: {
          snapshots: BbsArticleSnapshotProvider.json.select(),
        },
      } satisfies Prisma.bbs_articlesFindManyArgs;
    };
  }

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
