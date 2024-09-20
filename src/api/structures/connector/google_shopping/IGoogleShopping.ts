import { tags } from "typia";

export namespace IGoogleShopping {
  /**
   * @title Product search conditions
   */
  export interface IRequestStandAlone {
    /**
     * Enter the keyword you want to search for.
     *
     * @title Search term
     */
    keyword: string;

    /**
     * Set the number of search results.
     *
     * @title Number of search results
     */
    max_results: number & tags.Type<"int32">;
  }

  export interface IRequest extends IRequestStandAlone {
    /**
     * @title Category
     */
    category: string;
  }

  /**
   * @title Product search results
   */
  export interface IResponse {
    /**
     * @title Product name
     */
    title: string;

    /**
     * @title Product Link
     */
    link:
      | (string & tags.Format<"uri">)
      | (string & tags.Constant<"#", { title: "알 수 없는 링크" }>);

    /**
     * ₩57,600 Format
     *
     * @title Product Price
     */
    price: string;

    /**
     * @title Product Source
     */
    source?: string;

    /**
     * @title Shipping fee
     */
    deliveryCost?: string;

    /**
     * @title Product Image
     */
    thumbnail: string & tags.Format<"uri"> & tags.ContentMediaType<"image/*">;
  }
}
