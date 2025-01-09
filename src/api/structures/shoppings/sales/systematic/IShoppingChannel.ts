import { tags } from "typia";

import { IPage } from "../../../common/IPage";
import { IShoppingChannelCategory } from "./IShoppingChannelCategory";

/**
 * Channel information.
 *
 * `IShoppingChannel` is a concept that shapes the distribution channel in the
 * market. Therefore, the difference in the channel in this e-commerce system
 * means that it is another site or application.
 *
 * By the way, if your shopping mall system requires only one channel, then
 * just use only one. This concept is designed to be expandable in the future.
 *
 * @author Samchon
 */
export interface IShoppingChannel extends IShoppingChannel.ICreate {
  /**
   * Primary Key.
   */
  id: string & tags.Format<"uuid">;

  /**
   * Creation time of record.
   */
  created_at: string & tags.Format<"date-time">;
}
export namespace IShoppingChannel {
  /**
   * Hierarchical channel information with children categories.
   */
  export interface IHierarchical extends IShoppingChannel {
    /**
     * Children categories with hierarchical structure.
     */
    categories: IShoppingChannelCategory.IHierarchical[];
  }

  /**
   * Request of the channels with pagination and searching/sorting options.
   */
  export interface IRequest extends IPage.IRequest {
    search?: null | IRequest.ISearch;
    sort?: null | IPage.Sort<IRequest.SortableColumns>;
  }
  export namespace IRequest {
    export interface ISearch {
      code?: null | string;
      name?: null | string;
    }
    export type SortableColumns =
      | "channel.code"
      | "channel.name"
      | "channel.created_at";
  }

  /**
   * Creation information of the channel.
   */
  export interface ICreate {
    /**
     * Identifier code.
     */
    code: string;

    /**
     * Name of the channel.
     */
    name: string;
  }

  /**
   * Updating information of the channel.
   */
  export interface IUpdate {
    /**
     * Name of the channel.
     */
    name: string;
  }
}
