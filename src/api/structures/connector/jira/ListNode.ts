import type { IJira } from "./IJira";

export type ListNode = {
  /**
   * @title type
   */
  type: "bulletList" | "orderedList";

  /**
   * @title content
   */
  content: ListItemNode_1[];
};

export type ListItemNode_1 = {
  /**
   * @title type
   */
  type: "listItem";

  /**
   * content must contain at least one of the following nodes:
   * - bulletList
   * - codeBlock with no marks
   * - mediaSingle
   * - orderedList
   * - paragraph with no marks
   *
   * @title content
   */
  content: (
    | {
        /**
         * @title type
         */
        type: "bulletList" | "orderedList";
      } // token limit...
    | IJira.CodeBlockNode
    | IJira.MediaSingleNode
    | IJira.ParagraphContentWithoutNoMarks
  )[];
};
