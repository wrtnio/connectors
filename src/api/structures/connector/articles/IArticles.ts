import { tags } from "typia";
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

  /**
   * @title Article to update
   */
  export type IUpdate = ICreate;

  /**
   * @title Article to write
   */
  export interface ICreate extends ICommon.ISecret<"ecosystem"> {
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

  export interface ISnapshot extends StrictOmit<ICreate, "secretKey"> {
    /**
     *  Primary Key.
     */
    id: string;

    /**
     *  Creation time of snapshot record.
     *
     *  In other words, creation time or update time or article.
     */
    created_at: string & tags.Format<"date-time">;
  }
}

export interface IArticle<
  Snapshot extends IArticle.ISnapshot = IArticle.ISnapshot,
> {
  /**
   *  Primary Key.
   */
  id: string & tags.Format<"uuid">;

  /**
   *  List of snapshot contents.
   *
   *  It is created for the first time when an article is created, and is
   *  accumulated every time the article is modified.
   */
  snapshots: Snapshot[] & tags.MinItems<1>;

  /**
   *  Creation time of article.
   */
  created_at: string & tags.Format<"date-time">;
}
