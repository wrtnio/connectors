import axios from "axios";
import { IImwebService } from "../structures/IImwebService";

export class ImwebService {
  constructor(private readonly props: IImwebService.IProps) {}

  async getProducts(
    input: IImwebService.IGetProductInput,
  ): Promise<IImwebService.Product[]> {
    try {
      const { access_token } = await this.getAccessToken();
      const queryParameter = Object.entries({
        prod_status: input.prod_status,
        category: input.category,
      })
        .filter(([_key, value]) => value !== undefined)
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

      const data = res.data as IImwebService.IGetProductOutput;
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

  async getAccessToken(): Promise<IImwebService.IGetAccessTokenOutput> {
    try {
      const res = await axios.get(
        `https://api.imweb.me/v2/auth?key=${this.props.key}&secret=${this.props.secret}`,
      );

      return res.data;
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }
}
