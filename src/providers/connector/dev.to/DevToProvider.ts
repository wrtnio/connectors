import { IDevTo } from "@wrtn/connector-api/lib/structures/connector/dev.to/IDevTo";
import axios from "axios";

export namespace DevToProvider {
  export const create = async (
    input: IDevTo.ICreateInput,
  ): Promise<IDevTo.ICreateOutput> => {
    const url = `https://dev.to/api/articles`;

    const res = await axios.post(
      url,
      {
        article: {
          title: input.article.title,
          description: input.article.description,
          body_markdown: input.article.body_markdown,
          published: true,
        },
      },
      {
        headers: {
          api_key: input.secretKey,
        },
      },
    );

    return res.data;
  };
}
