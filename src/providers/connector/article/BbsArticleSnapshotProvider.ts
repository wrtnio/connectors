import { Prisma } from "@prisma/client";
import { IArticle } from "@wrtn/connector-api/lib/structures/connector/articles/IArticles";
import { randomUUID } from "crypto";
import typia from "typia";
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
