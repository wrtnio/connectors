import type { tags } from "typia";
import type { IJira } from "./IJira";

export type BulletListNode_1 = {
  type: "bulletList";

  /**
   * @title content
   *
   * content can contain one or more listItem nodes.
   */
  content: ListItemNode_1[];
};

export type OrderedListNode_1 = {
  type: "orderedList";
  attrs: {
    /**
     * order defines the number of the first item in the list. For example, 3 would mean the list starts at number three. When not specified, the list starts from 1.
     */
    order: number & tags.Type<"int64"> & tags.Minimum<0>;
  };

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
    | ({ kakasoo_type?: "BulletListNode_2" } & { type: "bulletList" }) // token limit...
    | IJira.CodeBlockNode
    | IJira.MediaSingleNode
    | ({ kakasoo_type?: "OrderedListNode_2" } & { type: "orderedList" }) // token limit...
    | IJira.ParagraphContentWithoutNoMarks
  )[];
};

// export type BulletListNode_2 = {
//   type: "bulletList";

//   /**
//    * @title content
//    *
//    * content can contain one or more listItem nodes.
//    */
//   content: ListItemNode_2[];
// };

// export type OrderedListNode_2 = {
//   type: "orderedList";
//   attrs: {
//     /**
//      * order defines the number of the first item in the list. For example, 3 would mean the list starts at number three. When not specified, the list starts from 1.
//      */
//     order: number & tags.Type<"int64"> & tags.Minimum<0>;
//   };

//   content: ListItemNode_2[];
// };

// export type ListItemNode_2 = {
//   type: "listItem";

//   /**
//    * @title content
//    * content must contain at least one of the following nodes:
//    * - bulletList
//    * - codeBlock with no marks
//    * - mediaSingle
//    * - orderedList
//    * - paragraph with no marks
//    */
//   content: (
//     | BulletListNode_3
//     | IJira.CodeBlockNode
//     | IJira.MediaSingleNode
//     | OrderedListNode_3
//     | IJira.ParagraphContentWithoutNoMarks
//   )[];
// };

// export type BulletListNode_3 = {
//   type: "bulletList";

//   /**
//    * @title content
//    *
//    * content can contain one or more listItem nodes.
//    */
//   content: ListItemNode_3[];
// };

// export type OrderedListNode_3 = {
//   type: "orderedList";
//   attrs: {
//     /**
//      * order defines the number of the first item in the list. For example, 3 would mean the list starts at number three. When not specified, the list starts from 1.
//      */
//     order: number & tags.Type<"int64"> & tags.Minimum<0>;
//   };

//   content: ListItemNode_3[];
// };

// export type ListItemNode_3 = {
//   type: "listItem";

//   /**
//    * @title content
//    * content must contain at least one of the following nodes:
//    * - bulletList
//    * - codeBlock with no marks
//    * - mediaSingle
//    * - orderedList
//    * - paragraph with no marks
//    */
//   content: (
//     | BulletListNode_4
//     | IJira.CodeBlockNode
//     | IJira.MediaSingleNode
//     | OrderedListNode_4
//     | IJira.ParagraphContentWithoutNoMarks
//   )[];
// };

// export type BulletListNode_4 = {
//   type: "bulletList";

//   /**
//    * @title content
//    *
//    * content can contain one or more listItem nodes.
//    */
//   content: ListItemNode_4[];
// };

// export type OrderedListNode_4 = {
//   type: "orderedList";
//   attrs: {
//     /**
//      * order defines the number of the first item in the list. For example, 3 would mean the list starts at number three. When not specified, the list starts from 1.
//      */
//     order: number & tags.Type<"int64"> & tags.Minimum<0>;
//   };

//   content: ListItemNode_4[];
// };

// export type ListItemNode_4 = {
//   type: "listItem";

//   /**
//    * @title content
//    * content must contain at least one of the following nodes:
//    * - bulletList
//    * - codeBlock with no marks
//    * - mediaSingle
//    * - orderedList
//    * - paragraph with no marks
//    */
//   content: (
//     | BulletListNode_5
//     | IJira.CodeBlockNode
//     | IJira.MediaSingleNode
//     | OrderedListNode_5
//     | IJira.ParagraphContentWithoutNoMarks
//   )[];
// };

// export type BulletListNode_5 = {
//   type: "bulletList";

//   /**
//    * @title content
//    *
//    * content can contain one or more listItem nodes.
//    */
//   content: ListItemNode_5[];
// };

// export type OrderedListNode_5 = {
//   type: "orderedList";
//   attrs: {
//     /**
//      * order defines the number of the first item in the list. For example, 3 would mean the list starts at number three. When not specified, the list starts from 1.
//      */
//     order: number & tags.Type<"int64"> & tags.Minimum<0>;
//   };

//   content: ListItemNode_5[];
// };

// export type ListItemNode_5 = {
//   type: "listItem";

//   /**
//    * @title content
//    * content must contain at least one of the following nodes:
//    * - bulletList
//    * - codeBlock with no marks
//    * - mediaSingle
//    * - orderedList
//    * - paragraph with no marks
//    */
//   content: (
//     | BulletListNode_6
//     | IJira.CodeBlockNode
//     | IJira.MediaSingleNode
//     | OrderedListNode_6
//     | IJira.ParagraphContentWithoutNoMarks
//   )[];
// };

// export type BulletListNode_6 = {
//   type: "bulletList";

//   /**
//    * @title content
//    *
//    * content can contain one or more listItem nodes.
//    */
//   content: ListItemNode_6[];
// };

// export type OrderedListNode_6 = {
//   type: "orderedList";
//   attrs: {
//     /**
//      * order defines the number of the first item in the list. For example, 3 would mean the list starts at number three. When not specified, the list starts from 1.
//      */
//     order: number & tags.Type<"int64"> & tags.Minimum<0>;
//   };

//   content: ListItemNode_6[];
// };

// export type ListItemNode_6 = {
//   type: "listItem";

//   /**
//    * @title content
//    * content must contain at least one of the following nodes:
//    * - codeBlock with no marks
//    * - mediaSingle
//    * - orderedList
//    * - paragraph with no marks
//    */
//   content: (
//     | IJira.CodeBlockNode
//     | IJira.MediaSingleNode
//     | IJira.ParagraphContentWithoutNoMarks
//   )[];
// };
