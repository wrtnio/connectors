import { tags } from "typia";

export namespace IDallE3 {
  /**
   * @title Information for image creation
   */
  export interface IRequest {
    /**
     * Prompt to create an image
     *
     * @title prompt
     */
    prompt: string;

    /**
     * Preset image size to generate.
     *
     * Only three possible values are available: "square", "landscape", and "portrait".
     *
     * @title Image Size
     */
    image_ratio:
      | tags.Constant<"square", { title: "정사각형"; description: "1024x1024" }>
      | tags.Constant<"landscape", { title: "풍경"; description: "1792x1024" }>
      | tags.Constant<"portrait", { title: "인물"; description: "1024x1792" }>;
  }

  /**
   * @title Image creation result
   */
  export interface IResponse {
    /**
     * Generated image url
     *
     * @title Generated image Url
     */
    imgUrl: string & tags.Format<"uri"> & tags.ContentMediaType<"image/*">;
  }
}
