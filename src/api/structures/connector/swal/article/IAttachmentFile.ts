import { tags } from "typia";

export namespace IAttachmentFile {
  export interface ICreate {
    /**
     * File name, except extension.
     *
     * Possible to make empty string like `.gitignore` case.
     *
     * @title File name
     */
    name: string & tags.MaxLength<255>;

    /**
     * Extension.
     *
     * Possible to omit like `README` case.
     * Extensions must exclude dot characters.
     *
     * @title File extension
     */
    extension: null | (string & tags.MinLength<1> & tags.MaxLength<8>);

    /**
     * URL path of the real file.
     *
     * In addition to the case of attaching a file,
     * it is recommended to attach the URL address of the file when linking within the markdown document.
     *
     * @title File url
     */
    url: string & tags.Format<"uri">;
  }
}

/**
 * @title Attachment File
 */
export interface IAttachmentFile extends IAttachmentFile.ICreate {
  /**
   *  Primary Key.
   */
  id: string & tags.Format<"uuid">;

  /**
   * @title date time for creation of this file
   */
  created_at: string & tags.Format<"date-time">;
}
