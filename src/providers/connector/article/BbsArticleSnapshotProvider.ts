import { Prisma } from "@prisma/client";
import { IEntity } from "@wrtn/connector-api/lib/structures/common/IEntity";
import { IArticle } from "@wrtn/connector-api/lib/structures/connector/articles/IArticles";
import { randomUUID } from "crypto";
import typia from "typia";
import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { AttachmentFileProvider } from "./AttachmentFileProvider";

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
        },
      } satisfies Prisma.bbs_article_snapshotsFindManyArgs;
    };
  }

  export const collect = (input: IArticle.IUpdate["props"]) => {
    return {
      id: randomUUID(),
      title: input.title,
      body: input.body,
      format: "md",
      created_at: new Date().toISOString(),
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
}
