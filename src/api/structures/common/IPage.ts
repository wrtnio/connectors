import { tags } from "typia";

/**
 * A page
 *
 * Collection of records with pagination indformation
 *
 * @author Samchon
 */
export interface IPage<T extends object> {
  /**
   * Page information
   */
  pagination: IPage.IPagination;

  /**
   * List of records
   */
  data: T[];
}
export namespace IPage {
  /**
   * Page information
   */
  export interface IPagination {
    /**
     * Current page number
     */
    current: number & tags.Type<"uint32">;

    /**
     * Limitation of records per a page
     */
    limit: number & tags.Type<"uint32"> & tags.Default<100>;

    /**
     * Count of total records in database
     */
    records: number & tags.Type<"uint32">;

    /**
     * Number of total pages
     *
     * Equal to {@link records} / {@link limit} with ceiling.
     */
    pages: number & tags.Type<"uint32">;
  }

  /**
   * Page request data
   */
  export interface IRequest {
    /**
     * Page number.
     */
    page?: number & tags.Type<"uint32">;

    /**
     * Limitation of records per a page.
     */
    limit?: number & tags.Type<"uint32">;
  }

  /**
   * Sorting column specialization.
   *
   * The plus means ascending order and the minus means descending order.
   */
  export type Sort<Literal extends string> = Array<
    `-${Literal}` | `+${Literal}`
  >;
}
