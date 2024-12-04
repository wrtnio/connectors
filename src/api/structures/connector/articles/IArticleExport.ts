import { tags } from "typia";
import { StrictOmit } from "../../types/strictOmit";

export namespace IArticleExport {
  export interface IUpdate {
    /**
     * @title ID of the snapshot that will be a later version of the update
     */
    bbs_article_snapshot_id: string & tags.Format<"uuid">;

    /**
     * @title Creation time ot {@link IArticleExport}
     */
    created_at: string & tags.Format<"date-time">;
  }

  export type ICreate = StrictOmit<IArticleExport, "id">;
}

export interface IArticleExport {
  /**
   * @title Primary Key
   */
  id: string & tags.Format<"uuid">;

  /**
   * @title Snapshot ID
   */
  bbs_article_snapshot_id: string & tags.Format<"uuid">;

  /**
   * It means the name of the service from which the post was exported,
   * and if the service name is motion,
   * it means that the same post is posted in the corresponding url of the provider service.
   *
   * @title provider name
   */
  provider: "notion" | "google_docs" | (string & {});

  /**
   * @title Unique Document ID in external service
   */
  uid: string | null;

  /**
   * This is a redirect link that allows you to locate the exported document,
   * which is stored at export time.
   *
   * @title URL
   */
  url: (string & tags.Format<"iri">) | null;

  /**
   * @title Creation time ot {@link IArticleExport}
   */
  created_at: string & tags.Format<"date-time">;

  /**
   * @title Deletion time ot {@link IArticleExport}
   */
  deleted_at: (string & tags.Format<"date-time">) | null;
}
