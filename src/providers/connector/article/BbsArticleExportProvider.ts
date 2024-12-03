import { Prisma } from "@prisma/client";
import { IEntity } from "@wrtn/connector-api/lib/structures/common/IEntity";
import { IArticleExport } from "@wrtn/connector-api/lib/structures/connector/articles/IArticleExport";
import { StrictOmit } from "@wrtn/connector-api/lib/structures/types/strictOmit";
import { randomUUID } from "crypto";
import { ConnectorGlobal } from "../../../ConnectorGlobal";

export namespace BbsArticleExportProvider {
  export namespace json {
    export const transform = (
      input: Prisma.bbs_article_exportsGetPayload<ReturnType<typeof select>>,
    ): IArticleExport => {
      return {
        id: input.id,
        bbs_article_snapshot_id: input.bbs_article_snapshot_id,
        provider: input.provider as string,
        uid: input.uid,
        url: input.url,
        created_at: input.created_at.toISOString(),
        deleted_at: input.deleted_at?.toISOString() ?? null,
      };
    };

    export const select = () => {
      return {} satisfies Prisma.bbs_article_exportsFindManyArgs;
    };
  }

  export const collect = (
    articleSnapshot: IEntity,
    input: StrictOmit<
      IArticleExport.ICreate,
      "bbs_article_snapshot_id" | "created_at" | "deleted_at"
    >,
  ) => {
    const created_at = new Date().toISOString();
    return {
      id: randomUUID(),
      bbs_article_provider: {
        connectOrCreate: {
          create: {
            id: randomUUID(),
            name: input.provider,
            created_at,
          },
          where: {
            name: input.provider,
          },
        },
      },
      provider: input.provider,
      snapshot: {
        connect: {
          id: articleSnapshot.id,
        },
      },
      uid: input.uid ?? null,
      url: input.url ?? null,
      created_at,
    } satisfies Prisma.bbs_article_exportsCreateInput;
  };

  export const exports =
    (articleSnapshot: IEntity) =>
    async (
      input: StrictOmit<
        IArticleExport.ICreate,
        "bbs_article_snapshot_id" | "created_at" | "deleted_at"
      >,
    ) => {
      const exports = await ConnectorGlobal.prisma.bbs_article_exports.create({
        ...BbsArticleExportProvider.json.select(),
        data: {
          ...BbsArticleExportProvider.collect(articleSnapshot, input),
        },
      });

      return BbsArticleExportProvider.json.transform(exports);
    };

  export const update =
    (bbs_article_export: IEntity) => async (input: IArticleExport.IUpdate) => {
      await ConnectorGlobal.prisma.bbs_article_exports.update({
        data: {
          bbs_article_snapshot_id: input.bbs_article_snapshot_id,
        },
        where: {
          id: bbs_article_export.id,
        },
      });
    };
}
