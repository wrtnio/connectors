import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { IExternalUser } from "@wrtn/connector-api/lib/structures/common/IExternalUser";
import { IPage } from "@wrtn/connector-api/lib/structures/common/IPage";
import { IArticle } from "@wrtn/connector-api/lib/structures/connector/articles/IArticle";
import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { PaginationUtil } from "../../../utils/PaginationUtil";
import { NotionProvider } from "../notion/NotionProvider";
import { BbsArticleExportProvider } from "./BbsArticleExportProvider";
import { BbsArticleProvider } from "./BbsArticleProvider";
import { BbsArticleSnapshotProvider } from "./BbsArticleSnapshotProvider";

/**
 * 현재는 분리되어 있는 DocumentProvider를 생성하되 실제로는 BbsArticleProvider를 그대로 사용하는 것으로 작성한다.
 * 이렇게 분리한 까닭은 {@link IArticle} 타입이 본디 목적이 하위 타입, 즉 base로서 정의된 것이기에 추후 기능 확장이 될 여지가 남아있기 때문이다.
 */
export namespace DocumentProvider {
  export function exports(provider: "google_docs"): ReturnType<any>; // NOT IMPLEMENT
  export function exports(provider: "notion"): typeof exports.notion;
  export function exports(provider: "notion" | "google_docs") {
    if (provider === "notion") {
      return exports.notion;
    } else if (provider === "google_docs") {
      return function something(
        external_user: IExternalUser,
        articleId: IArticle["id"],
        input: {
          google_docs: {
            secretKey: string;
            folder_id?: string;
          };
        },
      ) {};
    }

    throw new Error("Cannot export to this service.");
  }

  export namespace exports {
    export const notion = async (
      external_user: IExternalUser,
      articleId: IArticle["id"],
      input: IArticle.IExportToNotionInput,
    ): Promise<IArticle.IExportToNotionOutput> => {
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

    if (input?.id !== undefined) {
      condition.push({
        id: input.id,
      });
    }

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
