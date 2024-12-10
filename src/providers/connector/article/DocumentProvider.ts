import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { IExternalUser } from "@wrtn/connector-api/lib/structures/common/IExternalUser";
import { IPage } from "@wrtn/connector-api/lib/structures/common/IPage";
import { IArticle } from "@wrtn/connector-api/lib/structures/connector/articles/IArticle";
import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { PaginationUtil } from "../../../utils/PaginationUtil";
import { GoogleProvider } from "../../internal/google/GoogleProvider";
import { GoogleDocsProvider } from "../google_docs/GoogleDocsProvider";
import { NotionProvider } from "../notion/NotionProvider";
import { BbsArticleExportProvider } from "./BbsArticleExportProvider";
import { BbsArticleProvider } from "./BbsArticleProvider";
import { BbsArticleSnapshotProvider } from "./BbsArticleSnapshotProvider";

/**
 * 현재는 분리되어 있는 DocumentProvider를 생성하되 실제로는 BbsArticleProvider를 그대로 사용하는 것으로 작성한다.
 * 이렇게 분리한 까닭은 {@link IArticle} 타입이 본디 목적이 하위 타입, 즉 base로서 정의된 것이기에 추후 기능 확장이 될 여지가 남아있기 때문이다.
 */
export namespace DocumentProvider {
  const GoogleDocs = new GoogleDocsProvider(new GoogleProvider());

  export function sync(provider: "google_docs"): ReturnType<any>; // NOT IMPLEMENT
  export function sync(provider: "notion"): typeof sync.notion;
  export function sync(provider: "notion" | "google_docs") {
    if (provider === "notion") {
      return sync.notion;
    } else if (provider === "google_docs") {
      return sync.google_docs;
    }

    throw new Error("Cannot sync to this service.");
  }

  export namespace sync {
    export const google_docs = async (
      external_user: IExternalUser,
      articleId: IArticle["id"],
      input: IArticle.ISync.ToGoogleDocsInput,
    ): Promise<IArticle.ISync.ToGoogleDocsOutput> => {
      let isSuccess: boolean = false;

      const article = await BbsArticleProvider.at({ id: articleId });
      const before = article.snapshots.find(
        (el) => el.id === input.snapshot.from,
      );

      const article_snapshot_exports = before?.bbs_article_exports
        .filter(
          (bbs_article_export) => bbs_article_export.provider === "google_docs",
        )
        .filter((bbs_article_export) =>
          input.snapshot.article_snapshot_exports?.ids?.length
            ? input.snapshot.article_snapshot_exports?.ids?.includes(
                bbs_article_export.id,
              )
            : true,
        );

      if (before && article_snapshot_exports?.length) {
        const created_at = new Date().toISOString();
        for await (const bbs_article_export of article_snapshot_exports) {
          const pageId = bbs_article_export.uid!;
          const secretKey = input.google_docs.secretKey as string;

          const snapshot = article.snapshots.find(
            (el) => el.id === input.snapshot.to,
          )!;

          await GoogleDocs.update(pageId, {
            secretKey,
            title: snapshot.title,
            contents: snapshot.body,
          });

          await BbsArticleExportProvider.sync(bbs_article_export)({
            bbs_article_snapshot_id: input.snapshot.to,
            created_at,
          });

          isSuccess = true;
        }
      }

      const response = await DocumentProvider.at(external_user, articleId);
      return { article: response, isSuccess };
    };

    export const notion = async (
      external_user: IExternalUser,
      articleId: IArticle["id"],
      input: IArticle.ISync.ToNotionInput,
    ): Promise<IArticle.ISync.ToNotionOutput> => {
      let isSuccess: boolean = false;

      const article = await BbsArticleProvider.at({ id: articleId });
      const before = article.snapshots.find(
        (el): boolean => el.id === input.snapshot.from,
      );

      const article_snapshot_exports = before?.bbs_article_exports
        .filter(
          (bbs_article_export) => bbs_article_export.provider === "notion",
        )
        .filter((bbs_article_export) =>
          input.snapshot.article_snapshot_exports?.ids?.length
            ? input.snapshot.article_snapshot_exports?.ids?.includes(
                bbs_article_export.id,
              )
            : true,
        );

      if (before && article_snapshot_exports?.length) {
        const created_at = new Date().toISOString();
        for await (const bbs_article_export of article_snapshot_exports) {
          const pageId = bbs_article_export.uid!;
          const secretKey = input.notion.secretKey;

          if ((await NotionProvider.clear({ pageId, secretKey })) === true) {
            const snapshot = article.snapshots.find(
              (el) => el.id === input.snapshot.to,
            )!;

            await NotionProvider.updatePageTitle({
              title: snapshot.title,
              pageId,
              secretKey,
            });

            await NotionProvider.appendBlocksByMarkdown({
              markdown: snapshot?.body,
              pageId,
              secretKey,
            });

            await BbsArticleExportProvider.sync(bbs_article_export)({
              bbs_article_snapshot_id: input.snapshot.to,
              created_at,
            });

            isSuccess = true;
          }
        }
      }

      const response = await DocumentProvider.at(external_user, articleId);
      return { article: response, isSuccess };
    };
  }

  export function exports(provider: "google_docs"): ReturnType<any>; // NOT IMPLEMENT
  export function exports(provider: "notion"): typeof exports.notion;
  export function exports(provider: "notion" | "google_docs") {
    if (provider === "notion") {
      return exports.notion;
    } else if (provider === "google_docs") {
      return exports.google_docs;
    }

    throw new Error("Cannot export to this service.");
  }

  export namespace exports {
    export const google_docs = async (
      external_user: IExternalUser,
      articleId: IArticle["id"],
      input: IArticle.IExport.ToGoogleDocsInput,
    ): Promise<IArticle.IExport.ToGoogleDocsOutput> => {
      const { snapshots } = await DocumentProvider.at(external_user, articleId);
      const snapshot = snapshots.find(({ id }) => id === input.snapshot.id)!;

      const { googleDocs } = await GoogleDocs.write({
        name: snapshot.title,
        markdown: snapshot.body,
        folderId: input.google_docs.folderId,
        secretKey: input.google_docs.secretKey,
      });

      const article_snapshot_exports = await BbsArticleExportProvider.exports(
        snapshot,
      )({
        provider: "google_docs",
        uid: googleDocs.id,
        url: `https://docs.google.com/document/d/${googleDocs.id as string}/`,
        created_at: new Date().toISOString(),
      });

      return {
        google_docs: {
          id: googleDocs.id,
          title: snapshot.title,
          link: `https://docs.google.com/document/d/${googleDocs.id as string}/`,
        },
        article_snapshot_exports,
      };
    };

    export const notion = async (
      external_user: IExternalUser,
      articleId: IArticle["id"],
      input: IArticle.IExport.ToNotionInput,
    ): Promise<IArticle.IExport.ToNotionOutput> => {
      const { snapshots } = await DocumentProvider.at(external_user, articleId);
      const snapshot = snapshots.find(({ id }) => id === input.snapshot.id)!;
      const notion = await NotionProvider.createPageByMarkdown({
        secretKey: input.notion.secretKey,
        parentPageId: input.notion.parentPageId,
        title: snapshot.title,
        markdown: snapshot.body,
      });

      const article_snapshot_exports = await BbsArticleExportProvider.exports(
        snapshot,
      )({
        provider: "notion",
        uid: notion.id,
        url: notion.link,
        created_at: new Date().toISOString(),
      });

      return { notion, article_snapshot_exports };
    };
  }

  export const index = async (
    external_user: IExternalUser,
    input: IArticle.IRequest,
  ): Promise<IPage<IArticle.ISummary>> => {
    return await PaginationUtil.paginate({
      schema: ConnectorGlobal.prisma.bbs_articles,
      payload: BbsArticleProvider.summary.select(),
      transform: BbsArticleProvider.summary.transform,
    })({
      where: {
        AND: [...search(external_user, input.search)],
      },
      orderBy: input.sort?.length
        ? PaginationUtil.orderBy(orderBy)(input.sort)
        : [{ created_at: "desc" }],
    })(input);
  };

  export const search = (
    external_user: IExternalUser,
    input?: IArticle.IRequest.ISearch,
  ) => {
    const condition: Prisma.bbs_articlesWhereInput["AND"] = [
      {
        external_user_id: external_user.id,
        password: external_user.password,
        deleted_at: null,
      },
    ];

    if (input?.ids !== undefined) {
      condition.push({
        id: {
          in: input.ids,
        },
      });
    }

    if (input?.snapshot?.format) {
      condition.push({
        mv_last: {
          snapshot: {
            format: input?.snapshot?.format,
          },
        },
      });
    }

    if (input?.snapshot?.title) {
      condition.push({
        mv_last: {
          snapshot: {
            title: {
              contains: input?.snapshot?.title,
            },
          },
        },
      });
    }

    return condition;
  };

  export const orderBy = (
    key: IArticle.IRequest.SortableColumns,
    direction: "asc" | "desc",
  ) => {
    return (
      key === "created_at"
        ? { created_at: direction }
        : key === "snapshot.created_at"
          ? { mv_last: { snapshot: { created_at: direction } } }
          : key === "snapshot.title"
            ? { mv_last: { snapshot: { title: direction } } }
            : {}
    ) satisfies Prisma.bbs_articlesOrderByWithRelationInput;
  };

  export const at = async (
    external_user: IExternalUser,
    articleId: IArticle["id"],
  ): Promise<IArticle> => {
    const article = await ConnectorGlobal.prisma.bbs_articles.findFirst({
      ...BbsArticleProvider.json.select(),
      where: {
        id: articleId,
      },
    });

    if (article === null) {
      throw new NotFoundException("Not Found article");
    }

    if (article.external_user_id !== external_user.id) {
      throw new ForbiddenException("This article is not yours.");
    }

    if (article.password !== external_user.password) {
      throw new ForbiddenException("This article is not yours.");
    }

    return BbsArticleProvider.json.transform(article);
  };

  export const remove = async (
    external_user: IExternalUser,
    articleId: IArticle["id"],
  ) => {
    const article = await BbsArticleProvider.at({ id: articleId });
    if (article.external_user_id !== external_user.id) {
      throw new ForbiddenException("This article is not yours.");
    }

    if (article.password !== external_user.password) {
      throw new ForbiddenException("This article is not yours.");
    }

    return BbsArticleProvider.remove({ id: articleId })();
  };

  export const update = async (
    external_user: IExternalUser,
    articleId: IArticle["id"],
    input: IArticle.IUpdate,
  ): Promise<IArticle.ISnapshot> => {
    const article = await BbsArticleProvider.at({ id: articleId });
    if (article.external_user_id !== external_user.id) {
      throw new ForbiddenException("This article is not yours.");
    }

    if (article.password !== external_user.password) {
      throw new ForbiddenException("This article is not yours.");
    }

    const lastSnapshot = article.snapshots[article.snapshots.length - 1];
    if (BbsArticleSnapshotProvider.equals(lastSnapshot)(input.props)) {
      return BbsArticleSnapshotProvider.at({ id: lastSnapshot.id });
    }

    return BbsArticleSnapshotProvider.create({ id: articleId })(input.props);
  };

  export const create = async (
    external_user: IExternalUser,
    input: IArticle.ICreate,
  ) => {
    const article = await ConnectorGlobal.prisma.bbs_articles.create({
      ...BbsArticleProvider.json.select(),
      data: BbsArticleProvider.collect(
        external_user,
        "document" as const,
        BbsArticleSnapshotProvider.collect,
      )(input),
    });

    return BbsArticleProvider.json.transform(article);
  };
}
