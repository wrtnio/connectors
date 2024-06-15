import axios from "axios";

import { IImweb } from "@wrtn/connector-api/lib/structures/connector/imweb/IImweb";

export namespace ImwebProvider {
  export async function getProducts(
    input: IImweb.IGetProductInput,
  ): Promise<IImweb.IGetProductOutput> {
    try {
      const res = await axios.get(
        `https://api.imweb.me/v2/shop/products?product_status=${input.prod_status}&category=${input.category}`,
        {
          headers: {
            "access-token": input.secretKey,
          },
        },
      );

      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  export async function getAccessToken(
    input: IImweb.Credential,
  ): Promise<IImweb.IGetAccessTokenOutput> {
    const res = await axios.get(
      `https://api.imweb.me/v2/auth?key=${input.key}&secret=${input.secret}`,
    );
    return res.data;
  }
}
