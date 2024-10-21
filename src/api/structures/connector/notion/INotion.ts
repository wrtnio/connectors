import { JMESPath, Placeholder, Prerequisite } from "@wrtnio/decorators";
import { tags } from "typia";

import {
  BlockObjectRequest,
  CreatePageParameters,
} from "@notionhq/client/build/src/api-endpoints";
import { Hierarchy } from "../../types/Hierarchy";
import { MyPick } from "../../types/MyPick";
import { StrictOmit } from "../../types/strictOmit";
import { ICommon } from "../common/ISecretValue";

export namespace INotion {
  /**
   * - plainText: text
   * - markdown: markdown
   *
   * @title The type of content in the database item page
   */
  type ContentType = "plainText" | "markdown";

  /**
   * @title color
   */
  type Color =
    | "default"
    | "gray"
    | "brown"
    | "orange"
    | "yellow"
    | "green"
    | "blue"
    | "purple"
    | "pink"
    | "red";

  /**
   * @title Database Date Attribute
   */
  type DateDatabaseProperty = {
    id: string;
    name: string;
    type: "date";
    date: Record<string, never>;
  };

  /**
   * @title Database Checkbox Properties
   */
  type CheckboxDatabaseProperty = {
    id: string;
    name: string;
    type: "checkbox";
    checkbox: Record<string, never>;
  };

  /**
   * @title Database Creator Attributes
   */
  type CreatedByDatabaseProperty = {
    id: string;
    name: string;
    type: "created_by";
  };

  /**
   * @title Database Creation Time Attribute
   */
  type CreatedTimeDatabaseProperty = {
    id: string;
    name: string;
    type: "created_time";
    created_time: Record<string, never>;
  };

  /**
   * @title Database Email Attributes
   */
  type EmailDatabaseProperty = {
    id: string;
    name: string;
    type: "email";
    email: Record<string, never>;
  };

  /**
   * @title Database File Properties
   */
  type FilesDatabaseProperty = {
    id: string;
    name: string;
    type: "files";
    files: Record<string, never>;
  };

  /**
   * @title Database official properties
   */
  type FormulaDatabaseProperty = {
    id: string;
    name: string;
    type: "formula";
    formula: {
      expression: string;
    };
  };

  /**
   * @title Database Last Modified Attribute
   */
  type LastEditedByDatabaseProperty = {
    id: string;
    name: string;
    type: "last_edited_by";
    last_edited_by: Record<string, never>;
  };

  /**
   * @title Database Modification Time Attribute
   */
  type LastEditedTimeDatabaseProperty = {
    id: string;
    name: string;
    type: "last_edited_time";
    last_edited_time: Record<string, never>;
  };

  /**
   * @title Database Multi-Select Attribute
   */
  type MultiSelectDatabaseProperty = {
    id: string;
    name: string;
    type: "multi_select";
    multi_select: {
      options: {
        id: string;
        name: string;
        color: Color;
      }[];
    };
  };

  /**
   * @title Database Number Format
   */
  type NumberFormat =
    | "number"
    | "number_with_commas"
    | "percent"
    | "dollar"
    | "canadian_dollar"
    | "singapore_dollar"
    | "euro"
    | "pound"
    | "yen"
    | "ruble"
    | "rupee"
    | "won"
    | "yuan"
    | "real"
    | "lira"
    | "rupiah"
    | "franc"
    | "hong_kong_dollar"
    | "new_zealand_dollar"
    | "krona"
    | "norwegian_krone"
    | "mexican_peso"
    | "rand"
    | "new_taiwan_dollar"
    | "danish_krone"
    | "zloty"
    | "baht"
    | "forint"
    | "koruna"
    | "shekel"
    | "chilean_peso"
    | "philippine_peso"
    | "dirham"
    | "colombian_peso"
    | "riyal"
    | "ringgit"
    | "leu"
    | "argentine_peso"
    | "uruguayan_peso"
    | "peruvian_sol";

  /**
   * @title Database numeric properties
   */
  type NumberDatabaseProperty = {
    id: string;
    name: string;
    type: "number";
    number: {
      format: NumberFormat;
    };
  };

  /**
   * @title database people properties
   */
  type PeopleDatabaseProperty = {
    id: string;
    name: string;
    type: "people";
    people: Record<string, never>;
  };

  /**
   * @title Database Phone Number Attribute
   */
  type PhoneNumberDatabaseProperty = {
    id: string;
    name: string;
    type: "phone_number";
    phone_number: Record<string, never>;
  };

  /**
   * @title Database Relationship Properties
   */
  type RelationDatabaseProperty = {
    id: string;
    name: string;
    type: "relation";
    relation: {
      database_id: string;
      synced_property_id: string;
      synced_property_name: string;
    };
  };

  /**
   * @title database text property
   */
  type RichTextDatabaseProperty = {
    id: string;
    name: string;
    type: "rich_text";
    rich_text: Record<string, never>;
  };

  /**
   * @title Aggregate Function
   */
  type RollupFunction =
    | "count"
    | "count_values"
    | "empty"
    | "not_empty"
    | "unique"
    | "show_unique"
    | "percent_empty"
    | "percent_not_empty"
    | "sum"
    | "average"
    | "median"
    | "min"
    | "max"
    | "range"
    | "earliest_date"
    | "latest_date"
    | "date_range"
    | "checked"
    | "unchecked"
    | "percent_checked"
    | "percent_unchecked"
    | "count_per_group"
    | "percent_per_group"
    | "show_original";

  /**
   * @title Database Aggregate Properties
   */
  type RollupDatabaseProperty = {
    type: "rollup";
    rollup: {
      rollup_property_name: string;
      relation_property_name: string;
      rollup_property_id: string;
      relation_property_id: string;
      function: RollupFunction;
    };
    id: string;
    name: string;
  };

  /**
   * @title Database Selection Attributes
   */
  type SelectDatabaseProperty = {
    id: string;
    name: string;
    type: "select";
    select: {
      options: {
        id: string;
        name: string;
        color: Color;
      }[];
    };
  };

  /**
   * @title Database status properties
   */
  type StatusDatabaseProperty = {
    id: string;
    name: string;
    type: "status";
    status: {
      options: {
        id: string;
        name: string;
        color: Color;
      }[];
      groups: {
        id: string;
        name: string;
        color: Color;
        option_ids: Array<string>;
      }[];
    };
  };

  /**
   * @title Database title property
   */
  type TitleDatabaseProperty = {
    type: "title";
    title: Record<string, never>;
    id: string;
    name: string;
  };

  /**
   * @title Database Url property
   */
  type UrlDatabaseProperty = {
    type: "url";
    url: Record<string, never>;
    id: string;
    name: string;
  };

  /**
   * @title database properties
   */
  export type DatabaseProperty =
    | NumberDatabaseProperty
    | FormulaDatabaseProperty
    | SelectDatabaseProperty
    | MultiSelectDatabaseProperty
    | StatusDatabaseProperty
    | RelationDatabaseProperty
    | RollupDatabaseProperty
    | TitleDatabaseProperty
    | RichTextDatabaseProperty
    | UrlDatabaseProperty
    | PeopleDatabaseProperty
    | FilesDatabaseProperty
    | EmailDatabaseProperty
    | PhoneNumberDatabaseProperty
    | DateDatabaseProperty
    | CheckboxDatabaseProperty
    | CreatedByDatabaseProperty
    | CreatedTimeDatabaseProperty
    | LastEditedByDatabaseProperty
    | LastEditedTimeDatabaseProperty;

  /**
   * - database: database
   * - page: page
   * - user: person
   * - block: block
   * - property_item: property item
   * - list: list
   * - comment: comment
   *
   * @title Notion Object Type
   */
  export type NotionObject =
    | "database"
    | "page"
    | "user"
    | "block"
    | "property_item"
    | "list"
    | "comment";

  /**
   * - emoji: emoji
   * - external: external image
   * - file: image file
   *
   * @title Type of Notion page icon
   */
  type IconType = "emoji" | "external" | "file";

  export type AccurateMarkdownBlock = {
    type?: string;
    id: string & tags.Format<"uuid">;
    text?: string;
    children?: MarkdownBlock[];
    hasChild?: boolean;
  };

  export type MarkdownBlock = StrictOmit<AccurateMarkdownBlock, "children"> & {
    children?: MarkdownBlock[];
  };

  export type IMarkdownBlock = StrictOmit<AccurateMarkdownBlock, "children"> & {
    // 재귀 타입은 빌드가 불가능하기 때문에 any로 바꾸되, Provider 레벨에서는 `MarkdownBlock` 타입을 쓴다.
    children?: any[];
  };

  export type IReadPageContentOutput = IMarkdownBlock[];
  export interface IReadPageContentInput extends INotion.ISecret {
    /**
     * @title block_id
     *
     * Indicates the ID of the page.
     * you can put the block ID back into this factor and use it to look up the child blocks.
     */
    block_id: PageIdInput["pageId"];
  }

  /**
   * @title Conditions required to create a page
   */
  export interface ICreatePageInput extends ICommon.ISecret<"notion"> {
    parentPageId: PageIdInput["pageId"];

    /**
     * New page title to be created
     *
     * @title Page title
     */
    title: string & Placeholder<"테스트 페이지.">;
  }

  export interface ICreatePageContentInput
    extends MyPick<CreatePageParameters, "children"> {
    children: BlockObjectRequest[];
  }

  export type LookUp<U extends { type?: string }, T> = U extends { type?: T }
    ? U
    : never;

  export interface ICreateChildContentTypeFileInput
    extends ICommon.ISecret<"notion">,
      PageIdInput,
      StrictOmit<
        LookUp<BlockObjectRequest, `file`>,
        "type" | "object" | "file"
      > {
    /**
     * @title file
     */
    file: {
      /**
       * @title external
       */
      external: {
        /**
         * @title url
         *
         * You can enter the path of the file you want to upload.
         */
        url: string & tags.Format<"iri">;
      };

      /**
       * @title filename
       */
      name?: string;

      /**
       * @title caption for this file
       */
      caption?: INotion.OnlyOneTextLine;
    };
  }

  export interface ICreateChildContentTypeEmbedInput
    extends ICommon.ISecret<"notion">,
      PageIdInput,
      StrictOmit<
        LookUp<BlockObjectRequest, `embed`>,
        "type" | "object" | "embed"
      > {
    /**
     * @title embed
     */
    embed: {
      /**
       * @title url
       *
       * You can enter the path of the file you want to embed.
       */
      url: string & tags.Format<"iri">;

      /**
       * @title caption of this embed
       */
      caption?: INotion.OnlyOneTextLine;
    };
  }

  export interface ICreateChildContentTypeBookmarkInput
    extends ICommon.ISecret<"notion">,
      PageIdInput,
      StrictOmit<
        LookUp<BlockObjectRequest, `bookmark`>,
        "type" | "object" | "bookmark"
      > {
    /**
     * @title bookmark
     */
    bookmark: {
      /**
       * @title url
       *
       * You can enter the path of the file you want to bookmark.
       */
      url: string & tags.Format<"iri">;

      /**
       * @title caption of this bookmark
       */
      caption?: INotion.OnlyOneTextLine;
    };
  }

  export interface ICreateChildContentTypeImageInput
    extends ICommon.ISecret<"notion">,
      PageIdInput,
      StrictOmit<
        LookUp<BlockObjectRequest, `image`>,
        "type" | "object" | "image"
      > {
    /**
     * @title image
     */
    image: {
      /**
       * @title external
       */
      external: {
        /**
         * @title url
         *
         * image file's extension is one of: 'bmp', 'gif', 'heic', 'jpg', 'jpeg', 'png', 'svg', 'tif', 'tiff'.
         */
        url: string &
          tags.Format<"uri"> &
          tags.Pattern<".*\\.(bmp|gif|heic|jpe?g|png|svg|tiff?)(\\?.*)?">;
      };

      /**
       * @title caption of this image
       */
      caption?: INotion.OnlyOneTextLine;
    };
  }

  export interface ICreateChildContentTypeVideoInput
    extends ICommon.ISecret<"notion">,
      PageIdInput,
      StrictOmit<
        LookUp<BlockObjectRequest, `video`>,
        "type" | "object" | "video"
      > {
    video: {
      external: {
        /**
         * @title url
         *
         * video file must be one of: 'amv' ,'asf' ,'avi' ,'f4v' ,'flv' ,'gifv' ,'mkv' ,'mov' ,'mpg' ,'mpeg' ,'mpv' ,'mp4' ,'m4v' ,'qt' ,'wmv'
         * OR
         * YouTube video links that include embed or watch.
         * E.g. https://www.youtube.com/watch?v=[id], https://www.youtube.com/embed/[id]
         */
        url: string & tags.Format<"iri">;
      };

      /**
       * @title caption of this embed
       */
      caption?: INotion.OnlyOneTextLine;
    };
  }

  export interface ICreateChildContentTypePdfInput
    extends ICommon.ISecret<"notion">,
      PageIdInput,
      StrictOmit<LookUp<BlockObjectRequest, `pdf`>, "type" | "object" | "pdf"> {
    /**
     * @title pdf
     */
    pdf: {
      /**
       * @title external
       */
      external: {
        /**
         * @title url
         */
        url: string & tags.Format<"iri"> & tags.Pattern<".*\\.(pdf)(\\?.*)?">;
      };

      /**
       * @title caption of this pdf
       */
      caption?: INotion.OnlyOneTextLine;
    };
  }

  export interface ICreateChildContentTypeAudioInput
    extends ICommon.ISecret<"notion">,
      PageIdInput,
      StrictOmit<
        LookUp<BlockObjectRequest, `audio`>,
        "type" | "object" | "audio"
      > {
    audio: {
      /**
       * @title external
       */
      external: {
        /**
         * @title url
         */
        url: string & tags.Format<"iri">;
      };

      /**
       * @title caption of this embed
       */
      caption?: INotion.OnlyOneTextLine;
    };
  }

  export interface ICreateChildContentTypeCodeInput
    extends ICommon.ISecret<"notion">,
      PageIdInput,
      StrictOmit<
        LookUp<BlockObjectRequest, `code`>,
        | "code" // 코드를 완전히 새로 구현하기 위함
        | "type"
        | "object"
      > {
    code: {
      /**
       * @title programming language name
       */
      language:
        | "abap"
        | "agda"
        | "arduino"
        | "assembly"
        | "bash"
        | "basic"
        | "bnf"
        | "c"
        | "c#"
        | "c++"
        | "clojure"
        | "coffeescript"
        | "coq"
        | "css"
        | "dart"
        | "dhall"
        | "diff"
        | "docker"
        | "ebnf"
        | "elixir"
        | "elm"
        | "erlang"
        | "f#"
        | "flow"
        | "fortran"
        | "gherkin"
        | "glsl"
        | "go"
        | "graphql"
        | "groovy"
        | "haskell"
        | "html"
        | "idris"
        | "java"
        | "javascript"
        | "json"
        | "julia"
        | "kotlin"
        | "latex"
        | "less"
        | "lisp"
        | "livescript"
        | "llvm ir"
        | "lua"
        | "makefile"
        | "markdown"
        | "markup"
        | "matlab"
        | "mathematica"
        | "mermaid"
        | "nix"
        | "notion formula"
        | "objective-c"
        | "ocaml"
        | "pascal"
        | "perl"
        | "php"
        | "plain text"
        | "powershell"
        | "prolog"
        | "protobuf"
        | "purescript"
        | "python"
        | "r"
        | "racket"
        | "reason"
        | "ruby"
        | "rust"
        | "sass"
        | "scala"
        | "scheme"
        | "scss"
        | "shell"
        | "solidity"
        | "sql"
        | "swift"
        | "toml"
        | "typescript"
        | "vb.net"
        | "verilog"
        | "vhdl"
        | "visual basic"
        | "webassembly"
        | "xml"
        | "yaml"
        | "java/c/c++/c#";

      /**
       * @title rich text for this codebox
       */
      rich_text: INotion.MultipleTextLine;
    };
  }

  export interface ICreateChildContentTypeEquationInput
    extends ICommon.ISecret<"notion">,
      PageIdInput,
      StrictOmit<
        LookUp<BlockObjectRequest, `equation`>,
        "type" | "object" | "equation"
      > {
    /**
     * @title equation
     */
    equation: {
      /**
       * @title expression
       *
       * an equation in mathematics
       */
      expression: "y = 2x";
    };
  }

  export interface ICreateChildContentTypeDividerInput
    extends ICommon.ISecret<"notion">,
      PageIdInput,
      StrictOmit<LookUp<BlockObjectRequest, `divider`>, "type" | "object"> {
    /**
     * @title divider
     */
    divider: Record<string, never>;
  }

  export interface ICreateChildContentTypeBreadcrumbInput
    extends ICommon.ISecret<"notion">,
      PageIdInput,
      StrictOmit<LookUp<BlockObjectRequest, `breadcrumb`>, "type" | "object"> {
    /**
     * @title breadcrumb
     *
     * You only need to match the key name correctly, so you just need to pass on an empty object.
     */
    breadcrumb: Record<string, never>;
  }

  export interface ICreateChildContentTypeTableOfContentsInput
    extends ICommon.ISecret<"notion">,
      PageIdInput,
      StrictOmit<
        LookUp<BlockObjectRequest, `table_of_contents`>,
        "type" | "object" | "table_of_contents"
      > {
    /**
     * @title table_of_contents
     */
    table_of_contents: {
      /**
       * @title color
       *
       * It must be one of :
       * "default", "gray", "brown", "orange", "yellow", "green", "blue", "purple", "pink", "red", "gray_background", "brown_background", "orange_background", "yellow_background", "green_background", "blue_background", "purple_background", "pink_background", "red_background"
       */
      color: ApiColor;
    };
  }

  export interface ICreateChildContentTypeLinkToPageInput
    extends ICommon.ISecret<"notion">,
      PageIdInput,
      StrictOmit<
        LookUp<BlockObjectRequest, `link_to_page`>,
        "type" | "object" | "link_to_page"
      > {
    /**
     * @title link_to_page
     */
    link_to_page: {
      /**
       * @title page_id
       *
       * You can look up the page by passing the page ID as a parameter at the end of the notion link.
       * For example, in the format 'https://www.notion.so/ :pageId'.
       */
      page_id: string & PageIdInput["pageId"];
    };
  }

  export interface ICreateChildContentTypeTableRowInput
    extends ICommon.ISecret<"notion">,
      PageIdInput,
      StrictOmit<LookUp<BlockObjectRequest, `table_row`>, "type" | "object"> {}

  export interface ICreateChildContentTypeTableInput
    extends ICommon.ISecret<"notion">,
      PageIdInput,
      StrictOmit<LookUp<BlockObjectRequest, `table`>, "type" | "object"> {}

  export interface ICreateChildContentTypeColumnListInput
    extends ICommon.ISecret<"notion">,
      PageIdInput,
      StrictOmit<
        LookUp<BlockObjectRequest, `column_list`>,
        "type" | "object"
      > {}

  export interface ICreateChildContentTypeColumnInput
    extends ICommon.ISecret<"notion">,
      PageIdInput,
      StrictOmit<LookUp<BlockObjectRequest, `column`>, "type" | "object"> {}

  export interface ICreateChildContentTypeHeading_1Input
    extends ICommon.ISecret<"notion">,
      PageIdInput,
      StrictOmit<
        LookUp<BlockObjectRequest, `heading_1`>,
        "type" | "object" | "heading_1"
      > {
    /**
     * @title heading_1
     */
    heading_1: {
      /**
       * @title rich_text
       */
      rich_text: INotion.MultipleTextLine;
    };
  }

  export interface ICreateChildContentTypeHeading_2Input
    extends ICommon.ISecret<"notion">,
      PageIdInput,
      StrictOmit<
        LookUp<BlockObjectRequest, `heading_2`>,
        "type" | "object" | "heading_2"
      > {
    /**
     * @title heading_2
     */
    heading_2: {
      /**
       * @title rich_text
       */
      rich_text: INotion.MultipleTextLine;
    };
  }

  export interface ICreateChildContentTypeHeading_3Input
    extends ICommon.ISecret<"notion">,
      PageIdInput,
      StrictOmit<
        LookUp<BlockObjectRequest, `heading_3`>,
        "type" | "object" | "heading_3"
      > {
    /**
     * @title heading_3
     */
    heading_3: {
      /**
       * @title rich_text
       */
      rich_text: INotion.MultipleTextLine;
    };
  }

  export interface ICreateChildContentTypeParagraphInput
    extends ICommon.ISecret<"notion">,
      PageIdInput,
      StrictOmit<
        LookUp<BlockObjectRequest, `paragraph`>,
        "type" | "object" | "paragraph"
      >,
      WithChilden<
        {
          /**
           * @title paragraph
           */
          paragraph: {
            /**
             * @title rich_text
             */
            rich_text: INotion.MultipleTextLine;
          };
        },
        "paragraph"
      > {}

  export interface ICreateChildContentTypeBulletedListItemInput
    extends ICommon.ISecret<"notion">,
      PageIdInput,
      StrictOmit<
        LookUp<BlockObjectRequest, `bulleted_list_item`>,
        "type" | "object" | "bulleted_list_item"
      >,
      WithChilden<
        {
          /**
           * @title bulleted_list_item
           */
          bulleted_list_item: {
            /**
             * @title rich_text
             */
            rich_text: INotion.MultipleTextLine;
          };
        },
        "bulleted_list_item"
      > {}

  export interface ICreateChildContentTypeNumberedListItemInput
    extends ICommon.ISecret<"notion">,
      PageIdInput,
      StrictOmit<
        LookUp<BlockObjectRequest, `numbered_list_item`>,
        "type" | "object" | "numbered_list_item"
      >,
      WithChilden<
        {
          /**
           * @title numbered_list_item
           */
          numbered_list_item: {
            /**
             * @title rich_text
             */
            rich_text: INotion.MultipleTextLine;
          };
        },
        "numbered_list_item"
      > {}

  export interface ICreateChildContentTypeQuoteInput
    extends ICommon.ISecret<"notion">,
      PageIdInput,
      StrictOmit<
        LookUp<BlockObjectRequest, `quote`>,
        "type" | "object" | "quote"
      >,
      WithChilden<
        {
          /**
           * @title quote
           */
          quote: {
            /**
             * @title rich_text
             */
            rich_text: INotion.MultipleTextLine;
          };
        },
        "quote"
      > {}

  export interface ICreateChildContentTypeToDoInput
    extends ICommon.ISecret<"notion">,
      PageIdInput,
      StrictOmit<
        LookUp<BlockObjectRequest, `to_do`>,
        "type" | "object" | "to_do"
      >,
      WithChilden<
        {
          /**
           * @title to_do
           */
          to_do: {
            /**
             * @title rich_text
             */
            rich_text: INotion.MultipleTextLine;

            /**
             * @title checked
             */
            checked?: boolean;

            /**
             * @title color
             */
            color?: ApiColor;
          };
        },
        "to_do"
      > {}

  export interface ICreateChildContentTypeToggleInput
    extends ICommon.ISecret<"notion">,
      PageIdInput,
      StrictOmit<
        LookUp<BlockObjectRequest, `toggle`>,
        "type" | "object" | "toggle"
      >,
      WithChilden<
        {
          /**
           * @title toggle
           */
          toggle: {
            /**
             * @title rich_text
             */
            rich_text: INotion.MultipleTextLine;

            /**
             * @title color
             */
            color?: ApiColor;
          };
        },
        "toggle"
      > {}

  export interface ICreateChildContentTypeCalloutInput
    extends ICommon.ISecret<"notion">,
      PageIdInput,
      StrictOmit<LookUp<BlockObjectRequest, `callout`>, "type" | "object"> {}

  export interface ICreateChildContentTypeSyncedBlockInput
    extends ICommon.ISecret<"notion">,
      PageIdInput,
      StrictOmit<
        LookUp<BlockObjectRequest, `synced_block`>,
        "type" | "object"
      > {}

  export interface PageIdInput {
    /**
     * @title pageId
     *
     * Indicates the page on which you want to add a block.
     * At the bottom of this page, a block is added to match the requested object here.
     * Calling this connector requires the correct page ID,
     * so it should only be called if you have previously created a page to obtain that ID, viewed the page,
     * or obtained a link or page ID from the user in advance.
     */
    pageId: string &
      (
        | Prerequisite<{
            method: "post";
            path: "/connector/notion/get/page";
            jmesPath: JMESPath<
              IReadPageOutput[],
              "[].{value:pageId, label:title}"
            >;
          }>
        | Prerequisite<{
            method: "post";
            path: "/connector/notion/page";
            jmesPath: JMESPath<IReadPageOutput[], "[].{value:id, label:id}">;
          }>
      ) &
      Placeholder<"부모 페이지를 선택하세요.">;
  }

  /**
   * @title Page creation result
   */
  export interface ICreatePageOutput {
    /**
     * Unique id of the generated page
     *
     * @title page id
     */
    id: string;

    /**
     * @title tilte
     *
     * Title of the document you just created
     */
    title: string;
  }

  /**
   * @title User Information
   */
  export interface IUser {
    /**
     * Object type of user information
     *
     * @title Object type
     */
    object: NotionObject;

    /**
     * User unique id
     *
     * @title unique id
     */
    id: string;

    /**
     * User's name
     *
     * @title Name
     */
    name: string;

    /**
     * Profile picture url
     *
     * @title Profile picture url
     */
    avatar_url: string | null;

    /**
     * - person: person
     * - bot: automated bot
     *
     * @title User Type
     */
    type: "person" | "bot";

    /**
     * Information when the user type is human
     *
     * @title User Information
     */
    person?: {
      /**
       * User Email
       *
       * @title Email
       */
      email: string;
    };

    /**
     * Information when the user type is bot
     *
     * @title bot information
     */
    bot?: {
      /**
       * Information about the user who owns the bot
       *
       * @title Ownership Information
       */
      owner: {
        /**
         * Type of user you own
         *
         * @title Type
         */
        type: string;

        /**
         * Whether it is a workspace
         *
         * @title Whether it is a workspace
         */
        workspace: boolean;
      };
      /**
       * Workspace Name
       *
       * @title Workspace Name
       */
      workspace_name: string;
    };
  }

  /**
   * @title User list query results
   */
  export interface IUserOutput {
    /**
     * User unique id
     *
     * @title id
     */
    id: string;

    /**
     * Username
     *
     * @title Name
     */
    name: string;
  }

  /**
   * @title Page list query results
   */
  export interface IReadPageOutput {
    /**
     * 페이지 고유 id
     *
     * @title id
     *
     * Indicates the page on which you want to add a block.
     * At the bottom of this page, a block is added to match the requested object here.
     */
    pageId: string &
      Prerequisite<{
        method: "post";
        path: "/connector/notion/get/page";
        jmesPath: JMESPath<IReadPageOutput[], "[].{value:pageId, label:title}">;
      }>;

    /**
     * Page Title
     *
     * @title Title
     */
    title: string;
  }

  /**
   * @title Information needed to add content to the page
   */
  export interface IAppendPageToContentInput extends ICommon.ISecret<"notion"> {
    /**
     * What to add to the page
     *
     * @title Content
     */
    content: string & Placeholder<"뤼튼 스튜디오">;
  }

  /**
   * @title Database property information
   *
   * TODO: Need to change type and inspector structure accordingly
   */
  export interface IDatabasePropertyInput {
    /**
     * The types of values that can be inserted by database properties are all different
     * First, I declared it as any, but I need to think about the structure to see if I should specify the types of values that can be inserted by property as Union.
     *
     * TODO: Type confirmation and changes to fit the inspector structure are needed
     */
    [key: string]: any;
  }

  /**
   * @title Information required to add an item to the database
   */
  export interface ICreateDatabaseItemInput
    extends IDatabasePropertyInput,
      ICommon.ISecret<"notion"> {
    /**
     * Value to add to database property
     *
     * @title property value
     */
    value?: string;

    /**
     * What to put on the database item page you want to create
     *
     * What to put on the @title page
     */
    content?: string;

    /**
     * Database item page content type to create
     *
     * @title Page content type
     */
    contentType?: ContentType;
  }

  /**
   * @title Information required to modify an item that exists in the database
   */
  export interface IUpdateDatabaseItemInput
    extends IDatabasePropertyInput,
      ICommon.ISecret<"notion"> {
    /**
     * Page to update
     *
     * @title Page
     */
    pageId: string &
      Prerequisite<{
        method: "post";
        path: "/connector/notion/get/page";
        jmesPath: JMESPath<IReadPageOutput[], "[].{value:pageId, label:title}">;
      }>;

    /**
     * Database page content to update
     *
     * @title Content
     */
    content?: string;

    /**
     * Database property value to update
     *
     * @title property value
     */
    value?: string;
  }

  /**
   * @title Database Information
   */
  export interface IDatabaseInfo {
    /**
     * database unique id
     *
     * @title id
     */
    id: string;

    /**
     * Database Title
     *
     * @title TitleP
     */
    title: string;

    /**
     * Database property information
     *
     * @title property
     */
    properties: Record<string, DatabaseProperty>;
  }

  /**
   * @title Database property information
   */
  export interface IDatabasePropertyInfo {
    /**
     * database property unique id
     *
     * @title id
     */
    id: string;

    /**
     * Database property name
     *
     * @title name
     */
    name: string;

    /**
     * Database property type
     *
     * @title type
     */
    type: string;

    /**
     * Database property value information
     *
     * @title value
     *
     * TODO: Type confirmation and inspector structure needs to be changed
     */
    [key: string]: any;
  }

  /**
   * @title Information needed to search the page
   */
  export interface IFindPageOrDatabaseItemInput
    extends ICommon.ISecret<"notion"> {
    /**
     * Page Title
     *
     * @title Title
     */
    title: string;
  }

  /**
   * @title Information needed to find an item in the database
   */
  export interface IFindDatabaseItemInput extends ICommon.ISecret<"notion"> {
    /**
     * The title of the item in the database item
     *
     * @title Title
     */
    title?: string;

    /**
     * Number in database item
     *
     * @title Number
     */
    number?: number & tags.Type<"int32">;

    /**
     * url in database item
     *
     * @title url
     */
    url?: string & tags.Format<"iri">;

    /**
     * Email address in database item
     *
     * @title Email address
     */
    email?: string & tags.Format<"email">;

    /**
     * Text in database item
     *
     * @title text
     */
    rich_text?: string;

    /**
     * Phone number in database item
     *
     * @title Phone number
     */
    phone_number?: string;

    /**
     * When searching for a database item, multiple attributes can come up (title, number, url, email, text, phone number)
     * Since the values coming for each attribute are different, declare it as any
     *
     * TODO: Type confirmation and changes to fit the inspector structure are needed
     */
    [key: string]: any;
  }

  /**
   * @title Page Information
   */
  interface ICommonPageOutputInterface extends ICreatePageOutput {
    /**
     * Type of page object
     *
     * @title Object Type
     */
    object: NotionObject;

    /**
     * Date the page was created
     *
     * @title Date created
     */
    created_time: string;

    /**
     * Date the page was last modified
     *
     * @title Last modified
     */
    last_edited_time: string;

    /**
     * Information about who created the page
     *
     * @title Created by
     */
    created_by: {
      /**
       * The type of the object that created the page
       *
       * @title Object Type
       */
      object: NotionObject;

      /**
       * Unique id of the person who created the page
       *
       * @title id
       */
      id: string;
    };

    /**
     * Information about who last modified the page
     *
     * @title Last modified by
     */
    last_edited_by: {
      /**
       * The type of object that last modified the page
       *
       * @title Object Type
       */
      object: NotionObject;

      /**
       * Unique id of the last person to edit the page
       *
       * @title id
       */
      id: string;
    };

    /**
     * Page Background Image Information
     *
     * @title Background Image
     */
    cover: IPageCover | null;

    /**
     * Page Icon Information
     *
     * @title Icon
     */
    icon: IPageIcon | null;

    /**
     * Whether to archive the page
     *
     * @title Whether to archive the page
     */
    archived: boolean;

    /**
     * Page url
     *
     * @title url
     */
    url: string & tags.Format<"iri">;

    /**
     * Page public url
     *
     * @title public url
     */
    public_url: (string & tags.Format<"iri">) | null;
  }

  /**
   * @title External image information
   */
  interface IExternalImage {
    /**
     * image url
     *
     * @title url
     */
    url: string & tags.Format<"iri">;
  }

  /**
   * @title Page background image information
   */
  interface IPageCover {
    /**
     * Image Type
     *
     * @title Type
     */
    type: string;

    /**
     * Image information
     *
     * @title Image
     */
    external: IExternalImage;
  }

  /**
   * @title Page Icon Information
   */
  interface IPageIcon {
    /**
     * Icon Type
     *
     * @title Type
     */
    type: IconType;

    /**
     * Icon information when the icon type is emoji
     *
     * @title Emoji icon
     */
    emoji?: string | null;

    /**
     * Icon information when the icon type is icon
     *
     * @title Icon
     */
    external?: IExternalImage | null;

    /**
     * Icon information when the icon type is file
     *
     * @title Icon file
     */
    file?: {
      /**
       * file url
       *
       * @title url
       */
      url: string & tags.Format<"iri">;

      /**
       * Image file expiration time
       *
       * @title expiration time
       */
      expiry_time: string;
    };
  }

  /**
   * @title Page property information
   */
  interface IFindPageProperty {
    /**
     * Information about the title attribute
     *
     * @title Title attribute
     */
    title: {
      /**
       * Page property id
       *
       * @title id
       */
      id: string;

      /**
       * Page Property Type
       *
       * @title Property Type
       */
      type: string;

      /**
       * Page Title Attribute Information
       *
       * @title Title Attribute
       */
      title: IFindPageTitleProperty[];
    };
  }

  /**
   * @title Page title attribute
   */
  interface IFindPageTitleProperty {
    /**
     * Title property type
     *
     * @title type
     */
    type: string;

    /**
     * Page Title Text Information
     *
     * @title Text Information
     */
    text: IPageTitleText;

    /**
     * Page Title Additional Information
     *
     * @title Additional Information
     */
    annotations: IPageTitleAnnotation;

    /**
     * Page Title Original Text
     *
     * @title Original
     */
    plain_text: string;

    /**
     * Page Link
     *
     * @title Link
     */
    href: (string & tags.Format<"iri">) | null;
  }

  /**
   * @title Page title text information
   */

  interface IPageTitleText {
    /**
     * Title Text Content
     *
     * @title Content
     */
    content: string;

    /**
     * Page Title Link
     *
     * @title Link
     */
    link: (string & tags.Format<"iri">) | null;
  }

  /**
   * @title Page title Additional information
   */
  interface IPageTitleAnnotation {
    /**
     * Title Text Bold
     *
     * @title Bold
     */
    bold: boolean;

    /**
     * Title text italicized
     *
     * @title italicized
     */
    italic: boolean;

    /**
     * Title text strikethrough
     *
     * @title strikethrough
     */
    strikethrough: boolean;

    /**
     * Title text underline
     *
     * @title underline
     */
    underline: boolean;

    /**
     * Whether the title text is wrapped in code
     *
     * @title Whether the title text is wrapped in code
     */
    code: boolean;

    /**
     * Title Text Color
     *
     * @title Color
     */
    color: string;
  }

  export interface IFindPageByTitleOutput extends ICommonPageOutputInterface {
    /**
     * Parent Page Information
     *
     * @title Parent Page
     */
    parent: {
      /**
       * Parent Page Object Type
       *
       * @title Type
       */
      type: string;

      /**
       * Whether the parent page is a workspace
       *
       * @title Whether the workspace is
       */
      workspace: boolean;
    };

    /**
     * Page Properties Information
     *
     * @title property
     */
    properties: IFindPageProperty;
  }

  /**
   * @title Database item creation result
   */
  export interface IDatabaseItemOutput extends ICommonPageOutputInterface {
    /**
     * Parent Database Item Information
     *
     * @title Parent Database Item
     */
    parent: {
      /**
       * Parent database item object type
       *
       * @title type
       */
      type: string;

      /**
       * database item parent id
       *
       * @title database id
       */
      database_id: string;
    };

    /**
     * Database Item Properties
     *
     * @title Property
     */
    properties: any;
  }

  export type ISecret = ICommon.ISecret<"notion">;

  /**
   * @title OnlyOneTextLine
   *
   * Tuple that Length is 1
   */
  export type OnlyOneTextLine = {
    text: {
      content: string;
      link?: { url: string & tags.Format<"iri"> };
    };
  }[] &
    tags.MinItems<1> &
    tags.MaxItems<1>;

  export type MultipleTextLine = {
    text: {
      content: string;
      link?: { url: string & tags.Format<"iri"> };
    };
  }[] &
    tags.MaxItems<1>;

  export type ApiColor =
    | "default"
    | "gray"
    | "brown"
    | "orange"
    | "yellow"
    | "green"
    | "blue"
    | "purple"
    | "pink"
    | "red"
    | "gray_background"
    | "brown_background"
    | "orange_background"
    | "yellow_background"
    | "green_background"
    | "blue_background"
    | "purple_background"
    | "pink_background"
    | "red_background";

  /**
   * @title WithChildren
   *
   * A type that matches the same type as T received as an argument into an array T[] within its own property, children.
   */
  export type WithChilden<T extends object, P extends string> = Hierarchy<
    T,
    `${P}.children`,
    3,
    true
  >;

  export interface IDeleteBlockInput extends INotion.ISecret {
    /**
     * @title block_id
     *
     * Indicates the ID of the page or block within the page to be deleted.
     * If you delete the page, it will go to the trash, so recovery is possible.
     */
    block_id: PageIdInput["pageId"];
  }

  export interface IAppendPageByMarkdownInput
    extends PageIdInput,
      MarkdownInput,
      ICommon.ISecret<"notion"> {}

  export interface ICreatePageByMarkdownInput
    extends INotion.ICreatePageInput,
      MarkdownInput {}

  export interface MarkdownInput {
    /**
     * @title markdown
     *
     * If you add a markdown string, it will be converted appropriately according to the Notion's block.
     * Therefore, you don't have to use Unicode symbols to implement lists or decorate documents using letters.
     * Of course, this depends on the user, and there is no problem using the character string you want, such as inserting an emoji as well as Unicode.
     */
    markdown: string;
  }
}
