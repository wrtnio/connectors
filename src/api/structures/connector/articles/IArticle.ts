import { Prerequisite, SecretKey } from "@wrtnio/decorators";
import { tags } from "typia";
import { IPage } from "../../common/IPage";
import { StrictOmit } from "../../types/strictOmit";
import { INotion } from "../notion/INotion";
import { IArticleExport } from "./IArticleExport";
import { IAttachmentFile } from "./IAttachmentFile";

export namespace IArticle {
  export interface IExportToNotionOutput {
    /**
     * @title About the note page that was successfully exported
     */
    notion: INotion.ICreatePageOutput;

    /**
     * @title Exporting infomation
     */
    article_snapshot_exports: StrictOmit<IArticleExport, "deleted_at">;
  }

  export interface IExportToNotionInput {
    /**
     * @title Notion SecretKey and Parent Page ID to export
     */
    notion: {
      /**
       * @title Notion Secret Key for exporting
       */
      secretKey: string & SecretKey<"notion">;

      /**
       * @title Parent Page ID for exporting
       */
      parentPageId: INotion.PageIdInput["pageId"];
    };

    /**
     * @title snapshot information to export
     */
    snapshot: {
      /**
       * @title Snapshot ID of the post you want to export to another service
       */
      id: string &
        Prerequisite<{
          method: "patch";
          path: "/connector/articles/:id";
          jmesPath: "snapshot[].{ value: id, label: ['created_at ', created_at].join(':', @) }";
        }>;
    };
  }

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
   * The most recent snapshot made is the higher version,
   * and in fact, this time value can serve as the version.
   *
   * @title Creation time of article
   */
  created_at: string & tags.Format<"date-time">;

  /**
   * @title Deletion time of article
   */
  deleted_at: (string & tags.Format<"date-time">) | null;
}
