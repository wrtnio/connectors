import { Prisma } from "@prisma/client";
import { IEntity } from "@wrtn/connector-api/lib/structures/common/IEntity";
import { IExternalUser } from "@wrtn/connector-api/lib/structures/common/IExternalUser";
import { IArticle } from "@wrtn/connector-api/lib/structures/connector/articles/IArticle";
import { randomUUID } from "crypto";
import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { BbsArticleSnapshotProvider } from "./BbsArticleSnapshotProvider";

export namespace BbsArticleProvider {
  export namespace summary {
    export const transform = (
      input: Prisma.bbs_articlesGetPayload<ReturnType<typeof summary.select>>,
    ): IArticle.ISummary => {
      const snapshot = input.mv_last?.snapshot!;
      return {
        id: input.id,
        snapshot: {
          ...BbsArticleSnapshotProvider.json.transform(snapshot),
          body: input.mv_last!.snapshot.body.slice(0, 100),
        },
        created_at: input.created_at.toISOString(),
      };
    };

    export const select = () => {
      return {
        select: {
          id: true,
          mv_last: {
            select: {
              snapshot: BbsArticleSnapshotProvider.json.select(),
            },
          },
          created_at: true,
        },
      } satisfies Prisma.bbs_articlesFindManyArgs;
    };
  }

  export namespace json {
    export const transform = (
      input: Prisma.bbs_articlesGetPayload<ReturnType<typeof select>>,
    ): IArticle => {
      return {
        id: input.id,
        external_user_id: input.external_user_id,
        password: input.password,
        snapshots: input.snapshots
          .sort((a, b) => a.created_at.getTime() - b.created_at.getTime())
          .map(BbsArticleSnapshotProvider.json.transform),
        created_at: input.created_at.toISOString(),
        deleted_at: input.deleted_at?.toISOString() ?? null,
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

  export const remove = (article: IEntity) => async () => {
    await ConnectorGlobal.prisma.bbs_articles.update({
      data: {
        deleted_at: new Date().toISOString(),
      },
      where: {
        id: article.id,
      },
    });
  };

  export const collect =
    <
      Input extends IArticle.ICreate,
      Snapshot extends Prisma.bbs_article_snapshotsCreateWithoutArticleInput,
    >(
      external_user: IExternalUser,
      type: string,
      snapshotFactory: (input: Input) => Snapshot,
    ) =>
    (input: Input) => {
      const created_at = new Date();
      const snapshot = snapshotFactory(input);
      return {
        id: randomUUID(),
        external_user_id: external_user.id,
        password: external_user.password,
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
      } satisfies Prisma.bbs_articlesUncheckedCreateInput;
    };

  export const at = async (input: IEntity) => {
    const article = await ConnectorGlobal.prisma.bbs_articles.findFirstOrThrow({
      ...BbsArticleProvider.json.select(),
      where: {
        id: input.id,
      },
    });

    return BbsArticleProvider.json.transform(article);
  };
}
