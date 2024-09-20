import { Placeholder } from "@wrtnio/decorators";
import { tags } from "typia";

/**
 * @title Korea Copyright Association Type
 */
export namespace KoreaCopyrightCommission {
  /**
   * @title Copyright inquiry conditions
   */
  export interface IGetCopyRightInput {
    /**
     * @title Number of results per page
     */
    perPage?: number & tags.Type<"int32"> & tags.Default<10>;

    /**
     * @title Page number
     */
    page?: number & tags.Type<"int32"> & tags.Default<1>;

    /**
     * @title Copyright registration number
     * @description Only copyrights that match exactly are searched.
     */
    REG_ID?: string;

    /**
     * @title Title (Name)
     *
     * Title refers to the name of the work.
     */
    CONT_TITLE?: string & Placeholder<"제호 (명칭)">;

    /**
     * @title Copyright holder name
     *
     * This refers to the name of the copyright holder. It can be a person's name, or the name of a company or specific organization.
     */
    AUTHOR_NAME?: string & Placeholder<"저작자 이름">;
  }

  /**
   * @title Copyright search results
   */
  export interface IGetCopyRightOutput
    extends Pick<IGetCopyRightInput, "page" | "perPage"> {
    /**
     * @title Current page count
     */
    currentCount: number & tags.Type<"int32">;

    /**
     * @title Number of copyrights matching the search criteria
     */
    matchCount: number & tags.Type<"int32">;

    /**
     * @title Search Results
     */
    data: (Pick<IGetCopyRightInput, "REG_ID" | "CONT_TITLE" | "AUTHOR_NAME"> & {
      /**
       * @title Copyright registration date
       */
      REG_DATE: string & tags.Format<"date">;
    })[];
  }
}
