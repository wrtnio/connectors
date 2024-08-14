import type { IJira } from "./IJira";

export type ListNode = {
  type: "bulletList" | "orderedList";
  content: ListItemNode_1[];
};

export type ListItemNode_1 = {
  type: "listItem";

  /**
   * @title content
   * content must contain at least one of the following nodes:
   * - bulletList
   * - codeBlock with no marks
   * - mediaSingle
   * - orderedList
   * - paragraph with no marks
   */
  content: (
    | { type: "bulletList" | "orderedList" } // token limit...
    | IJira.CodeBlockNode
    | IJira.MediaSingleNode
    | IJira.ParagraphContentWithoutNoMarks
  )[];
};
