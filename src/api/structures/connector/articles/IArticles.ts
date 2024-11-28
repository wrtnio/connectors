import { tags } from "typia";
import { ICommon } from "../common/ISecretValue";

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
    // files: IAttachmentFile.ICreate[];
  }
}
