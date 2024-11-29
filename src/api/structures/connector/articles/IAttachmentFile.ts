import { tags } from "typia";

export namespace IAttachmentFile {
  export interface ICreate {
    /**
     *  File name, except extension.
     *
     *  Possible to make empy string like `.gitignore` case.
     */
    name: string & tags.MaxLength<255>;

    /**
     *  Extension.
     *
     *  Possible to omit like `README` case.
     */
    extension: null | (string & tags.MinLength<1> & tags.MaxLength<8>);

    /**
     *  URL path of the real file.
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
