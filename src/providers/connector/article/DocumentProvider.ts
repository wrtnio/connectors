import { ForbiddenException } from "@nestjs/common";
import { IExternalUser } from "@wrtn/connector-api/lib/structures/common/IExternalUser";
import { IArticle } from "@wrtn/connector-api/lib/structures/connector/articles/IArticles";
import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { BbsArticleProvider } from "./BbsArticleProvider";
import { BbsArticleSnapshotProvider } from "./BbsArticleSnapshotProvider";

/**
 * 현재는 분리되어 있는 DocumentProvider를 생성하되 실제로는 BbsArticleProvider를 그대로 사용하는 것으로 작성한다.
 * 이렇게 분리한 까닭은 {@link IArticle} 타입이 본디 목적이 하위 타입, 즉 base로서 정의된 것이기에 추후 기능 확장이 될 여지가 남아있기 때문이다.
 */
export namespace DocumentProvider {
  export const update = async (
    external_user: IExternalUser,
    articleId: IArticle["id"],
    input: IArticle.IUpdate,
  ): Promise<IArticle.ISnapshot> => {
    const article = await BbsArticleProvider.at({ id: articleId });
    if (article.external_user_id !== external_user.id) {
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
