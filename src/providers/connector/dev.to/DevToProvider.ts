import { IDevTo } from "@wrtn/connector-api/lib/structures/connector/dev.to/IDevTo";
import axios, { AxiosError } from "axios";
import { OAuthSecretProvider } from "../../internal/oauth_secret/OAuthSecretProvider";

export namespace DevToProvider {
  export const create = async (
    input: IDevTo.ICreateInput,
  ): Promise<IDevTo.ICreateOutput> => {
    const url = `https://dev.to/api/articles`;

    const api_key = await OAuthSecretProvider.getSecretValue(input.secretKey);
    const res = await axios.post(
      url,
      {
        article: {
          title: input.article.title,
          description: input.article.description,
          ...(input.article.body_markdown && {
            body_markdown: input.article.body_markdown,
          }),
          published: true,
        },
      },
      {
        headers: {
          api_key: api_key,
        },
      },
    );

    return res.data;
  };

  export const update =
    (article_id: string) =>
    async (input: IDevTo.IUpdateInput): Promise<IDevTo.IUpdateOutput> => {
      const url = `https://dev.to/api/articles/${article_id}`;

      const api_key = await OAuthSecretProvider.getSecretValue(input.secretKey);
      try {
        const res = await axios.put(
          url,
          {
            article: {
              ...(input.article?.title && {
                title: input.article?.title,
              }),
              ...(input.article?.description && {
                description: input.article?.description,
              }),
              ...(input.article?.body_markdown && {
                body_markdown: input.article?.body_markdown,
              }),
            },
          },
          {
            headers: {
              api_key: api_key,
            },
          },
        );

        return res.data;
      } catch (err) {
        if (err instanceof AxiosError) {
          console.error(JSON.stringify(err.response?.data));
        } else {
          console.error(JSON.stringify(err));
        }
        throw err;
      }
    };
}
