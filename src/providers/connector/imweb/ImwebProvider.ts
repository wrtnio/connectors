import axios from "axios";

import { IImweb } from "@wrtn/connector-api/lib/structures/connector/imweb/IImweb";

export namespace ImwebProvider {
  export async function getProducts(
    input: IImweb.IGetProductInput,
  ): Promise<IImweb.Product[]> {
    try {
      const { access_token } = await ImwebProvider.getAccessToken(input);
      const queryParameter = Object.entries({
        prod_status: input.prod_status,
        category: input.category,
      })
        .filter(([key, value]) => value !== undefined)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");

      const res = await axios.get(
        `https://api.imweb.me/v2/shop/products?${queryParameter}`,
        {
          headers: {
            "access-token": access_token,
          },
        },
      );

      const data = res.data as IImweb.IGetProductOutput;
      return (
        data.data.list.map((product) => {
          const image_url = Object.values(product.image_url).map(
            (url) => `https://cdn.imweb.me/upload/${url}`,
          );

          return { ...product, image_url };
        }) ?? []
      );
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function getAccessToken(
    input: IImweb.Credential,
  ): Promise<IImweb.IGetAccessTokenOutput> {
    try {
      const res = await axios.get(
        `https://api.imweb.me/v2/auth?key=${input.key}&secret=${input.secret}`,
      );
      return res.data;
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }
}
