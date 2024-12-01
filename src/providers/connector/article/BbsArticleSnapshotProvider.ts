import { Prisma } from "@prisma/client";
import { IEntity } from "@wrtn/connector-api/lib/structures/common/IEntity";
import { IArticle } from "@wrtn/connector-api/lib/structures/connector/articles/IArticle";
import { randomUUID } from "crypto";
import std from "tstl";
import typia from "typia";
import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { AttachmentFileProvider } from "./AttachmentFileProvider";
import { BbsArticleExportProvider } from "./BbsArticleExportProvider";

export namespace BbsArticleSnapshotProvider {
  export namespace json {
    export const transform = (
      input: Prisma.bbs_article_snapshotsGetPayload<ReturnType<typeof select>>,
    ): IArticle.ISnapshot => {
      const format = typia.assert<IArticle.ISnapshot["format"]>(input.format);
      return {
        id: input.id,
        title: input.title,
        body: input.body,
        format: format,
        bbs_article_exports: input.bbs_article_exports
          .sort((a, b) => a.created_at.getTime() - b.created_at.getTime())
          .map((p) => BbsArticleExportProvider.json.transform(p)),
        files: input.to_files
          .sort((a, b) => a.sequence - b.sequence)
          .map((p) => AttachmentFileProvider.json.transform(p.file)),
        created_at: input.created_at.toISOString(),
      };
    };

    export const select = () => {
      return {
        include: {
          to_files: {
            include: {
              file: AttachmentFileProvider.json.select(),
            },
          },
          bbs_article_exports: BbsArticleExportProvider.json.select(),
        },
      } satisfies Prisma.bbs_article_snapshotsFindManyArgs;
    };
  }

  export const at = async (input: IEntity) => {
    const snapshot =
      await ConnectorGlobal.prisma.bbs_article_snapshots.findFirstOrThrow({
        ...BbsArticleSnapshotProvider.json.select(),
        where: {
          id: input.id,
        },
      });

    return BbsArticleSnapshotProvider.json.transform(snapshot);
  };

  export const collect = (input: IArticle.IUpdate["props"]) => {
    const created_at = new Date().toISOString();
    return {
      id: randomUUID(),
      title: input.title,
      body: input.body,
      format: "md",
      ...(input.files?.length && {
        to_files: {
          create: input.files.map((file, i) => ({
            id: randomUUID(),
            sequence: i,
            file: {
              create: {
                id: randomUUID(),
                name: file.name,
                url: file.url,
                extension: file.extension,
                created_at,
              },
            },
          })),
        },
      }),
      created_at,
    } satisfies Prisma.bbs_article_snapshotsCreateWithoutArticleInput;
  };

  export const create =
    (article: IEntity) =>
    async (input: IArticle.ICreate): Promise<IArticle.ISnapshot> => {
      const snapshot =
        await ConnectorGlobal.prisma.bbs_article_snapshots.create({
          data: {
            ...collect(input),
            article: { connect: { id: article.id } },
          },
          ...json.select(),
        });

      await ConnectorGlobal.prisma.mv_bbs_article_last_snapshots.update({
        where: {
          bbs_article_id: article.id,
        },
        data: {
          bbs_article_snapshot_id: snapshot.id,
        },
      });

      return json.transform(snapshot);
    };

  export const equals =
    (x: IArticle.ICreate) =>
    (y: IArticle.ICreate): boolean => {
      return (
        x.format === y.format &&
        x.title === y.title &&
        x.body === y.body &&
        std.ranges.equal(x.files ?? [], y.files ?? [])
      );
    };
}
