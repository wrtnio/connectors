import { tags } from "typia";
import { IPage } from "../../common/IPage";
import { StrictOmit } from "../../types/strictOmit";
import { ICommon } from "../common/ISecretValue";
import { IAttachmentFile } from "./IAttachmentFile";

export namespace IArticle {
  // 예제로 작성한 코드
  export type IExportSecretInput = ICommon.ISecretTuple<
    [
      {
        "x-wrtn-secret-key": "google";
        "x-wrtn-secret-scopes": ["a", "b"];
      },
      {
        "x-wrtn-secret-key": "notion";
        "x-wrtn-secret-scopes": ["c", "d"];
      },
    ]
  >;

  export type Format =
    | tags.Constant<"txt", { title: "txt" }>
    | tags.Constant<"md", { title: "md" }>
    | tags.Constant<"html", { title: "html" }>;

  export interface ISummary
    extends StrictOmit<
      IArticle,
      "external_user_id" | "password" | "snapshots" | "deleted_at"
    > {
    /**
     * @title Last Snapshot
     */
    snapshot: StrictOmit<IArticle.ISnapshot, "body"> & {
      /**
       * @title Summarized Body
       */
      body: string & tags.MaxLength<100>;
    };
  }

  export namespace IRequest {
    export interface ISearch {
      /**
       * @title Article ID
       */
      id?: IArticle["id"];

      /**
       * @title Article IDs
       */
      ids?: Array<IArticle["id"]>;

      /**
       * @title Last Snapshot
       */
      snapshot?: {
        /**
         * @title Format of article
         */
        format: IArticle.ISnapshot["format"];

        /**
         * @title Title of article
         */
        title: IArticle.ISnapshot["title"];
      };
    }

    export type SortableColumns =
      | "created_at"
      | "snapshot.created_at"
      | "snapshot.title";
  }

  /**
   * @title Query Condition
   */
  export interface IRequest extends IPage.IRequest {
    /**
     * @title search
     */
    search?: IRequest.ISearch;

    /**
     * @title sort
     */
    sort?: IPage.Sort<IRequest.SortableColumns>;
  }

  /**
   * @title Article to update
   */
  export interface IUpdate {
    /**
     * @title props
     */
    props: IArticle.ICreate;
  }

  /**
   * @title Article to write
   */
  export interface ICreate {
    /**
     * Format of body.
     *
     * Same meaning with extension like `html`, `md`, `txt`.
     *
     *
     * @title format
     */
    format: Extract<Format, "md">;

    /**
     * Title of article.
     */
    title: string;

    /**
     * Content body of article.
     */
    body: string;

    /**
     * List of attachment files.
     */
    files: IAttachmentFile.ICreate[];
  }

  export interface ISnapshot extends StrictOmit<ICreate, "files"> {
    /**
     * @title Primary Key
     */
    id: string;

    /**
     *  In other words, creation time or update time or article
     *
     *  @title Creation time of snapshot record
     */
    created_at: string & tags.Format<"date-time">;

    /**
     * @title List of attachment files
     */
    files: IAttachmentFile[];
  }
}

export interface IArticle<
  Snapshot extends IArticle.ISnapshot = IArticle.ISnapshot,
> {
  /**
   * @title Primary Key
   */
  id: string & tags.Format<"uuid">;

  /**
   * @title External User ID
   */
  external_user_id: string & tags.Format<"uuid">;

  /**
   * @title password
   */
  password: string;

  /**
   *  It is created for the first time when an article is created, and is
   *  accumulated every time the article is modified.
   *
   *  @title List of snapshot contents
   */
  snapshots: Snapshot[] & tags.MinItems<1>;

  /**
   * @title Creation time of article
   */
  created_at: string & tags.Format<"date-time">;

  /**
   * @title Deletion time of article
   */
  deleted_at: (string & tags.Format<"date-time">) | null;
}
