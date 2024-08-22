import type { Placeholder, Prerequisite } from "@wrtnio/decorators";
import type { tags } from "typia";
import { StrictOmit } from "../../../../utils/strictOmit";
import { MyPartial } from "../../../../utils/types/MyPartial";
import type { ICommon } from "../common/ISecretValue";
import type { ListNode } from "./ListNode";

export type LookUp<
  U extends { type: string },
  T extends U["type"],
> = U["type"] extends T ? U : never;

export namespace IJira {
  /**
   * Atlasian's token is an object with email, token, and domain information converted into a string using JSON.stringify().
   * The type that parsed this is {@link BasicAuthorization}.
   * Basic Authorization is a sensitive data that can't just be turned into text, so we're showing a dedicated input window to get it from the user.
   */
  export type IBasicSecret = ICommon.ISecret<"atlassian">;

  export type ISecret = ICommon.ISecret<
    "atlassian",
    [
      "offline_access",
      "read:me",
      "read:account",
      "read:jira-work",
      "manage:jira-project",
      "read:jira-user",
      "write:jira-work",
      "manage:jira-webhook",
      "manage:jira-data-provider",
    ]
  >;

  /**
   * @title BasicAuthorization
   *
   * To call the API in Jira, you must have API Token,
   * the domain address that will be the user's Jira workspace,
   * and the user's email address that the user is currently using in Jira.
   * This object contains this information.
   * If the user did not provide these values at the time of the connector call,
   * you should ask the user to give them.
   * There is no point in substituting any value here.
   */
  export interface BasicAuthorization {
    /**
     * @title email in Jira
     *
     * Indicates the email address that the user is using in the Jira workspace.
     * It must be an email address that Jira is using, not any email address of the user.
     * This email is used for Basic Authentication with API Token.
     */
    email: string;

    /**
     * @title jira api token
     *
     * User can access {@link https://id.atlassian.com/manage-profile/security/api-tokens} and get it issued.
     *
     * This is the user's API Token.
     * It is a token used in place of the user's basic authentication password, and if the user has not been issued, it should be able to guide the address to be issued to the user.
     * If the user does not have this token, Jira's API cannot be called.
     */
    token: string;

    /**
     * @title domain of your workspace site in Jira
     *
     * Address in the form of 'https://*.atlassian.net '.
     * It always starts with https:// and the string in the middle can vary from team to team.
     * Therefore, you must receive this address directly from the user.
     * All authentication is available only when you know both the user's email and API token for each workspace URL address.
     */
    domain: string & tags.Pattern<"^(https:\\/\\/(.*)\\.atlassian\\.net)$">;
  }

  export interface ICommonPaginationInput {
    /**
     * The index of the first item to return in a page of results (page offset).
     *
     * @title page offset
     */
    startAt?: number & tags.Type<"int64"> & tags.Default<0>;

    /**
     * The maximum number of items to return per page.
     * In the issue, it seems that up to 100 can be viewed at a time.
     *
     * @title max results
     */
    maxResults?: number & tags.Type<"int32"> & tags.Default<50>;
  }

  /**
   * @title pagination output properties
   */
  export interface ICommonPaginationOutput extends ICommonPaginationInput {
    /**
     * @title Wheather is last page
     */
    isLast?: boolean;

    /**
     * @title total count
     */
    total: number & tags.Type<"int64">;
  }

  /**
   * @title issue status
   */
  export interface Status {
    /**
     * @title status id
     */
    id: string;

    /**
     * @title status description
     */
    description: string;

    /**
     * @title status name
     */
    name: string & Placeholder<"해야 할 일">;

    /**
     * @title untranslated name
     */
    untranslatedName?: string;

    /**
     * @title status category
     */
    statusCategory: {
      /**
       * @title category id
       */
      id: number;

      /**
       * @title category key
       */
      key: string & Placeholder<"new">;
    };
  }

  export interface IGetCommentOutput extends ICommonPaginationOutput {
    /**
     * @title comments
     */
    comments: Pick<
      IJira.Comment,
      "id" | "author" | "body" | "created" | "updated" | "updateAuthor"
    >[];
  }

  export interface IGetCommentInput
    extends BasicAuthorization,
      ICommonPaginationInput {
    /**
     * @title issue id or key
     *
     * This connector doesn't matter the key or ID of the issue.
     * If you hand over one of them, you can use it to look up.
     */
    issueIdOrKey:
      | (Issue["id"] &
          Prerequisite<{
            method: "post";
            path: "/connector/jira/get-issues";
            jmesPath: "issues[].{value:id, label:key}";
          }>)
      | (Issue["key"] &
          Prerequisite<{
            method: "post";
            path: "/connector/jira/get-issues";
            jmesPath: "issues[].{value:key, label:key}";
          }>);
  }

  export interface IDeleteCommentInput extends BasicAuthorization {
    /**
     * @title issue id or key
     *
     * This connector doesn't matter the key or ID of the issue.
     * If you hand over one of them, you can use it to look up.
     */
    issueIdOrKey:
      | (Issue["id"] &
          Prerequisite<{
            method: "post";
            path: "/connector/jira/get-issues";
            jmesPath: "issues[].{value:id, label:key}";
          }>)
      | (Issue["key"] &
          Prerequisite<{
            method: "post";
            path: "/connector/jira/get-issues";
            jmesPath: "issues[].{value:key, label:key}";
          }>);

    /**
     * @title ID of comment to delete
     */
    commentId: Comment["id"];
  }

  export interface ICreateCommentOutput {
    /**
     * @title ID of comment
     */
    id: string;
  }

  export interface ICreateCommentInput extends BasicAuthorization {
    /**
     * @title issue id or key
     *
     * This connector doesn't matter the key or ID of the issue.
     * If you hand over one of them, you can use it to look up.
     */
    issueIdOrKey:
      | (Issue["id"] &
          Prerequisite<{
            method: "post";
            path: "/connector/jira/get-issues";
            jmesPath: "issues[].{value:id, label:key}";
          }>)
      | (Issue["key"] &
          Prerequisite<{
            method: "post";
            path: "/connector/jira/get-issues";
            jmesPath: "issues[].{value:key, label:key}";
          }>);

    /**
     * @title body of comment
     */
    body: Comment["body"];
  }

  /**
   * @title output of creation of issue
   */
  export interface ICreateIssueOutput {
    /**
     * @title ID of the issue that was created just now
     */
    id: Issue["id"];

    /**
     * @title Key of the issue that was created just now
     */
    key: Issue["key"];
  }

  export interface IGetTransitionOutput {
    /**
     * @title transition list of this jira issue
     */
    transitions: {
      /**
       * @title id of transition
       */
      id: string;

      /**
       * @title to
       *
       * StatusDetail.
       * Details of the issue status after the transition.
       */
      to: Pick<Status, "id" | "description" | "name" | "statusCategory">;
    }[];
  }

  export interface IUpdateStatusInput extends BasicAuthorization {
    /**
     * @title issue id or key
     *
     * This connector doesn't matter the key or ID of the issue.
     * If you hand over one of them, you can use it to look up.
     */
    issueIdOrKey:
      | (Issue["id"] &
          Prerequisite<{
            method: "post";
            path: "/connector/jira/get-issues";
            jmesPath: "issues[].{value:id, label:key}";
          }>)
      | (Issue["key"] &
          Prerequisite<{
            method: "post";
            path: "/connector/jira/get-issues";
            jmesPath: "issues[].{value:key, label:key}";
          }>);

    /**
     * @title ID of transition
     */
    transitionId: string &
      Prerequisite<{
        method: "post";
        path: "/connector/jira/issue-get-transitions";
        jmesPath: "transitions[].{value:id, label: to.name}";
      }>;
  }

  export interface IGetTransitionInput extends BasicAuthorization {
    /**
     * @title issue id or key
     *
     * This connector doesn't matter the key or ID of the issue.
     * If you hand over one of them, you can use it to look up.
     */
    issueIdOrKey:
      | (Issue["id"] &
          Prerequisite<{
            method: "post";
            path: "/connector/jira/get-issues";
            jmesPath: "issues[].{value:id, label:key}";
          }>)
      | (Issue["key"] &
          Prerequisite<{
            method: "post";
            path: "/connector/jira/get-issues";
            jmesPath: "issues[].{value:key, label:key}";
          }>);
  }

  export type IUnAssignInput = StrictOmit<IAssignInput, "asigneeId">;

  export interface IAssignInput extends BasicAuthorization {
    /**
     * @title ID of issue
     */
    issueId: Issue["id"];

    /**
     * @title accountId of the user you want to designate as the person in charge
     *
     * If you want to designate a person in charge, you need that user's ID. Therefore, you need to look up the user first. There are connectors that look up who can be assigned to a project or issue. You can find the ID of the person in charge by choosing what you want.
     * The person in charge is inevitably one of Jira's users.
     */
    asigneeId: User["accountId"] &
      (
        | Prerequisite<{
            method: "post";
            path: "/connector/jira/issues/get-users-assignable";
            jmesPath: "[].{value:accountId, label:displayName}";
          }>
        | Prerequisite<{
            method: "post";
            path: "/connector/jira/project/get-users-assignable";
            jmesPath: "[].{value:accountId, label:displayName}";
          }>
      );
  }

  export interface IUpdateCommentInput
    extends BasicAuthorization,
      MyPartial<
        StrictOmit<ICreateCommentInput, keyof BasicAuthorization | "body">
      > {
    /**
     * @title issue id or key
     *
     * This connector doesn't matter the key or ID of the issue.
     * If you hand over one of them, you can use it to look up.
     */
    issueIdOrKey:
      | (Issue["id"] &
          Prerequisite<{
            method: "post";
            path: "/connector/jira/get-issues";
            jmesPath: "issues[].{value:id, label:key}";
          }>)
      | (Issue["key"] &
          Prerequisite<{
            method: "post";
            path: "/connector/jira/get-issues";
            jmesPath: "issues[].{value:key, label:key}";
          }>);

    /**
     * @title ID of comment to update
     */
    commentId: Comment["id"];

    /**
     * @title body of comment to update
     */
    body: Comment["body"];
  }

  /**
   * @title Issue update Conditions
   */
  export interface IUpdateIssueInput
    extends BasicAuthorization,
      MyPartial<
        StrictOmit<ICreateIssueInput, keyof BasicAuthorization | "fields">
      > {
    /**
     * @title fields to update
     */
    fields: MyPartial<ICreateIssueInput["fields"]>;
  }

  /**
   * @title Issue Creation Conditions
   */
  export interface ICreateIssueInput extends BasicAuthorization {
    /**
     * @title fields
     *
     * Indicates the fields that you need to fill in when you want to create an issue.
     */
    fields: {
      /**
       * @title Specify a representative at the same time as you create
       */
      assignee?: {
        /**
         * @title accountId of the user you want to designate as the person in charge
         *
         * If you want to designate a person in charge, you need that user's ID. Therefore, you need to look up the user first. There are connectors that look up who can be assigned to a project or issue. You can find the ID of the person in charge by choosing what you want.
         * The person in charge is inevitably one of Jira's users.
         */
        id:
          | null
          | (User["accountId"] &
              (
                | Prerequisite<{
                    method: "post";
                    path: "/connector/jira/issues/get-users-assignable";
                    jmesPath: "[].{value:accountId, label:displayName}";
                  }>
                | Prerequisite<{
                    method: "post";
                    path: "/connector/jira/project/get-users-assignable";
                    jmesPath: "[].{value:accountId, label:displayName}";
                  }>
              ));
      };

      /**
       * @title description
       *
       * The content of the Jira issue consists of a combination of various contents.
       */
      description?: {
        /**
         * @title type of description
         *
         * Allow doc type only Now
         */
        type: "doc";

        /**
         * @title version
         */
        version: 1;

        /**
         * @title contents of description
         *
         * You must use node types that are configured with TopLevelBlockNodes.
         *
         * It is recommended to contain as much detail as possible on the issue raised by the user,
         * so that the next person who reads this issue can see the summary and description of this issue to resolve the issue.
         */
        content: TopLevelBlockNode[];
      };

      /**
       * @title due date
       *
       * date format type.
       * Indicates the schedule you want to be closed.Of course, it will be good to create a date or today.
       */
      duedate?: string & tags.Format<"date">;

      /**
       * @title issuetype
       */
      issuetype: {
        /**
         * @title id of issue type
         *
         * The ID of the issue.
         * Sometimes the user can say the name of the issue type,
         * such as 'bug' or 'story', but you cannot specify the issue type with the name of the issue type.
         * Because there can be types with the same name.
         * Therefore, you must check the issue type with a different connector to verify that it is an issue type that can be used in the project.
         *
         * However, if you handed over the number string type from the beginning, it could be the ID of the issue type.
         *
         * @inheritdoc
         */
        id: IssueType["id"] &
          Prerequisite<{
            method: "post";
            path: "/connector/jira/get-issue-types";
            jmesPath: "issuetypes[].{value:id, label:name}";
          }>;
      };

      /**
       * @title labels
       * You can add labels to make it easier to read issues.
       * Labels are simply strings, which can be added immediately without having to look up using other connectors.
       */
      labels?: string[];

      /**
       * @title parent of this issue
       */
      parent?: {
        /**
         * @title key of parent issue
         *
         * Sometimes an issue can be a sub-issue of another issue.
         * In this case, you need to specify the key for the parent issue.
         * If you want to know the key, use an issue list query or another connector to look up the details of the issue.
         */
        key: Issue["key"] &
          Prerequisite<{
            method: "post";
            path: "/connector/jira/get-issues";
            jmesPath: "issues[].{value:key, label:key}";
          }>;
      };

      /**
       * @title priority
       */
      priority?: {
        /**
         * @title id of proirity
         *
         * You can prioritize issues.
         * Users can also prioritize issues in natural languages such as Low, Medium, High, and so on,
         * but when creating issues, ID values for these priorities are required.
         * Therefore, you should first call a connector that looks up what priorities are available for the project and issue.
         */
        id: Priority["id"] &
          Prerequisite<{
            method: "post";
            path: "/connector/jira/get-issue-priorities";
            jmesPath: "[].{value:id, label:name}";
          }>;
      };

      /**
       * @title project
       *
       * Issues must inevitably belong to the project.
       * At this point, the project can be specified by receiving an ID or key.
       * If you do not know the key or ID of the project, you should first look up the project.
       */
      project:
        | {
            /**
             * @title id of project
             */
            id: Project["id"] &
              Prerequisite<{
                method: "post";
                path: "/connector/jira/get-projects";
                jmesPath: "[].{value:id, label:name}";
              }>;
          }
        | {
            /**
             * @title key of project
             */
            key: Project["key"] &
              Prerequisite<{
                method: "post";
                path: "/connector/jira/get-project";
                jmesPath: "[].{value:key, label:name}";
              }>;
          };

      /**
       * @title summary
       *
       * Meaning the title of the issue.
       * Make sure you write a sentence that best represents this issue.
       */
      summary: string;
    };
  }

  export interface IGetIssueLabelOutput extends ICommonPaginationOutput {
    /**
     * @title label list
     */
    values: string[];
  }

  export interface IGetIssueLabelInput
    extends BasicAuthorization,
      ICommonPaginationInput {}

  export type IGetIssuePriorityOutput = Pick<Priority, "id" | "name">[];

  export type IGetIssuePriorityInput = BasicAuthorization;

  export interface IGetIssueStatusOutput {
    statuses: (Pick<Status, "id" | "name" | "untranslatedName"> & {
      projectId?: string;
    })[];
  }

  export interface IGetIssueStatusInput extends BasicAuthorization {
    /**
     * @title id of project
     *
     * If the status does not have the project ID,
     * it means this status is beyond the scope of the project and can be selected by the entire team.
     * It can also be the default status created from the beginning by Jira.
     */
    projectId?: Project["id"] &
      Prerequisite<{
        method: "post";
        path: "/connectors/jira/get-projects";
        jmesPath: "values[].{value:id,label:name}";
      }>;
  }

  export interface IGetIssueCommonRequestInput {
    /**
     * @title key of project
     */
    project_key: Project["key"] &
      Prerequisite<{
        method: "post";
        path: "/connector/jira/get-projects";
        jmesPath: "values[].{value:key, label:name}";
      }>;

    /**
     * @title issue type
     */
    issuetype?: string &
      Prerequisite<{
        method: "post";
        path: "/connector/jira/get-issue-types";
        jmesPath: "[].{label:untranslatedName, value:untranslatedName}";
      }>;

    /**
     * @title status
     */
    status?: string &
      Prerequisite<{
        method: "post";
        path: "/connector/jira/get-statuses";
        jmesPath: "[].{value:id, label:untranslatedName}";
      }>;

    /**
     * @title name of assignee
     */
    assignee?: string;

    /**
     * @title name of reporter
     */
    reporter?: string;

    /**
     * @title Search for issues created after this date
     */
    created_start_date?: string & tags.Format<"date">;

    /**
     * @title Search for issues created after this date
     */
    created_end_date?: string & tags.Format<"date">;

    /**
     * @title search keyword
     *
     * It is a keyword you want to find in the title or explanation of an issue, which is useful when searching.
     */
    keyword?: string;

    /**
     * @title priority name
     *
     * If you want to search based on priority, deliver the name of the priority.
     * There are five priorities: 'Highest', 'High', 'Medium', 'Low', and 'Lowest'.
     * Although it is a Deprecated feature, you can still query the priority level that can be assigned to an issue with the API.
     * It also exists as our connector, so use it if necessary.
     */
    priority?: string &
      Prerequisite<{
        method: "post";
        path: "/connector/jira/get-issue-priorities";
        jmesPath: "[].{value:name, label:name}";
      }>;

    /**
     * @title label titles
     *
     * Complex searches are possible using various labels.
     */
    labels?: string[];
  }

  export interface IGetIssueDetailOutput extends Issue {
    /**
     * @title labels attached to the issue
     */
    labels?: string[];

    /**
     * @title Details of the issue
     */
    fields: DetailedIssueField;
  }

  /**
   * @title content with only text
   */
  export type TextContent = {
    /**
     * @title text type
     */
    type: "text";

    /**
     * @title content of this text content
     */
    text: string;

    /**
     * @title marks
     *
     * It means the emphasis of the markdown format, and it means that there is a string between the backticks.
     */
    marks?: Mark[];
  };

  /**
   * @title Blockquote node
   *
   * The blockquote node is a container for quotes.
   * blockquote is a top-level block node.
   */
  export type BlockquoteNode = {
    /**
     * @title blockquote type
     */
    type: "blockquote";

    /**
     * content must contain array of one or more of the following nodes:
     * - paragraph with no marks.
     * - bulletList
     * - orderedList
     */
    content: (ParagraphContentWithoutNoMarks | ListNode)[] & tags.MinItems<1>;
  };

  /**
   * @title code block
   */
  export type CodeBlockNode = {
    type: "codeBlock";

    /**
     * @title attrs
     *
     * If you do not specify a programming language, this property may not exist.
     */
    attrs?: {
      /**
       * @title programming language name
       */
      language?: string & Placeholder<"TypeScript">;
    };

    /**
     * @title code content
     *
     * content takes an array of one or more text nodes without marks.
     */
    content?: [
      {
        type: "text";

        /**
         * @title text includeing code
         */
        text: string;
      },
    ];
  };

  /**
   * @title emoji node
   */
  export type EmojiNode = {
    /**
     * @title emoji type
     */
    type: "emoji";

    /**
     * @title attributes of emoji node
     */
    attrs: {
      /**
       * Emoji service ID of the emoji
       *
       * For custom emojis by atlasian or user, you may have an ID.
       */
      id?: string;

      /**
       * @title icon name
       *
       * A string exists between a colon and a colon, meaning a name for representing the emoji.
       */
      shortName: `:${string}:`;

      /**
       * @title emoji icon
       */
      text?: string;
    };
  };

  /**
   * @title hard break node
   */
  export type HardBreakNode = {
    /**
     * @title hardBreak type
     */
    type: "hardBreak";

    /**
     * @title attributes of hard break node
     */
    attrs?: {
      /**
       * @title text
       *
       * It can be only `\n` text for braking.
       */
      text?: "\n";
    };
  };

  /**
   * @title heading node
   *
   * It means h1, h2, h3, h4, h5, h6 node.
   */
  export type HeadingNode = {
    /**
     * @title heading type
     */
    type: "heading";

    /**
     * @title content
     *
     * Heading node's content can be combined with only inline nodes.
     */
    content: InlineNode[];

    /**
     * @title attributes of heading node
     */
    attrs: {
      /**
       * level represents the depth of the heading following the same convention as HTML: when level is set to 1 it's the equivalent of <h1>.
       */
      level: 1 | 2 | 3 | 4 | 5 | 6;
    };
  };

  /**
   * @title heading node without `marks` property
   */
  export type HeadingNodeWithoutMarks = {
    /**
     * @title heading type
     */
    type: "heading";

    /**
     * @title content
     *
     * Heading node's content can be combined with only inline nodes.
     * A property called marks is not available here.
     */
    content: (
      | Omit<EmojiNode, "marks">
      | Omit<HardBreakNode, "marks">
      | Omit<InlineCardNode, "marks">
      | Omit<MentionNode, "marks">
      | Omit<TextContent, "marks">
    )[];

    /**
     * @title attributes of heading node
     */
    attrs: {
      /**
       * @title level
       *
       * level represents the depth of the heading following the same convention as HTML: when level is set to 1 it's the equivalent of <h1>.
       */
      level:
        | tags.Constant<1, { title: "1"; description: "level" }>
        | tags.Constant<2, { title: "2"; description: "level" }>
        | tags.Constant<3, { title: "3"; description: "level" }>
        | tags.Constant<4, { title: "4"; description: "level" }>
        | tags.Constant<5, { title: "5"; description: "level" }>
        | tags.Constant<6, { title: "6"; description: "level" }>;
    };
  };

  /**
   * @title inline card
   *
   * The inlineCard node is an Atlassian link card with a type icon and content description derived from the link.
   */
  export type InlineCardNode = {
    /**
     * @title inline card type
     */
    type: "inlineCard";

    /**
     * @title attributes of inline card node
     */
    attrs: {
      /**
       * @title url
       * Indicates the address value that the inline card will represent.
       * To allow you to move when you click on the card, you need to put a link in advance.
       */
      url: string & tags.Format<"uri">;

      /**
       * @title representation of the link
       */
      data?: object;
    };
  };

  /**
   * media is a child block node of:
   * - mediaGroup
   * - mediaSingle
   */
  export type MediaNode =
    | {
        type: "media";

        /**
         * @title Attributes
         */
        attrs: {
          /**
           * width defines the display width of the media item in pixels. Must be provided within mediaSingle or the media isn't displayed.
           */
          width?: number;

          /**
           * height defines the display height of the media item in pixels. Must be provided within mediaSingle or the media isn't displayed.
           */
          height?: number;

          /**
           * id is the Media Services ID and is used for querying the media services API to retrieve metadata, such as, filename. Consumers of the document should always fetch fresh metadata using the Media API.
           */
          id?: string;

          /**
           * @title type
           * There are three types.
           * However, in our service, we have to use "external" type only, because we are only considering universal users who do not save images through Media API, but save images through external links.
           */
          type: "link" | "file";
        };

        /**
         * @title marks
         */
        marks: LookUp<Mark, "link">;
      }
    | {
        type: "media";

        /**
         * @title Attributes
         */
        attrs: {
          /**
           * width defines the display width of the media item in pixels. Must be provided within mediaSingle or the media isn't displayed.
           */
          width?: number;

          /**
           * height defines the display height of the media item in pixels. Must be provided within mediaSingle or the media isn't displayed.
           */
          height?: number;

          /**
           * id is the Media Services ID and is used for querying the media services API to retrieve metadata, such as, filename. Consumers of the document should always fetch fresh metadata using the Media API.
           */
          id?: string;

          /**
           * @title type
           * There are three types.
           * However, in our service, we have to use "external" type only, because we are only considering universal users who do not save images through Media API, but save images through external links.
           */
          type: "external";

          /**
           * @title url
           */
          url: string & tags.Format<"uri">;
        };
      };

  export type MediaGroupNode = {
    type: "mediaGroup";

    /**
     * @title content
     * content must contain one or more media nodes.
     */
    content: MediaNode[];
  };

  /**
   * The mediaSingle node is a container for one media item.
   * This node enables the display of the content in full,
   * in contrast to a mediaGroup that is intended for a list of attachments.
   * A common use case is to display an image,
   * but it can also be used for videos,
   * or other types of content usually renderable by a @atlaskit/media card component.
   */
  export type MediaSingleNode = {
    /**
     * @title mediaSingle type
     */
    type: "mediaSingle";

    attrs: {
      /**
       * layout determines the placement of the node on the page. wrap-left and wrap-right provide an image floated to the left or right of the page respectively, with text wrapped around it. center center aligns the image as a block, while wide does the same but bleeds into the margins. full-width makes the image stretch from edge to edge of the page.
       */
      layout:
        | "wrap-left"
        | "center"
        | "wrap-right"
        | "wide"
        | "full-width"
        | "align-start"
        | "align-end";

      /**
       * width determines the width of the image as a percentage of the width of the text content area. Has no effect if layout mode is wide or full-width.
       */
      width?: number & tags.Minimum<0> & tags.Maximum<100>;

      /**
       * widthType [optional] determines what the "unit" of the width attribute is presenting. Possible values are pixel and percentage. If the widthType attribute is undefined, it fallbacks to percentage.
       */
      widthType?: ("pixel" | "percentage") & tags.Default<"percentage">;
    };

    /**
     * @title media
     *
     * only single of media node type
     */
    content: [MediaNode];
  };

  /**
   * @title content with mention
   */
  export type MentionNode = {
    /**
     * @title mention type
     */
    type: "mention";

    // text?: never;

    /**
     * @title content of this mention content
     */
    attrs: {
      /**
       * @title id
       *
       * add any string like as uuid
       */
      id?: string;

      /**
       * @title Who is mentioned
       *
       * It means a string that connects @ and the user's name
       */
      text: `@${string}`;

      /**
       * @title accessLevel
       */
      accessLevel?: string;
    };
  };

  /**
   * The panel node is a container that highlights content.
   */
  export type PanelNode = {
    type: "panel";
    attrs: {
      panelType: "info" | "note" | "warning" | "success" | "error";
    };
    content: (
      | ListNode
      | HeadingNodeWithoutMarks
      | ParagraphContentWithoutNoMarks
    )[];
  };

  /**
   * @title paragraph type
   * The paragraph node is a container for a block of formatted text delineated by a carriage return. It's the equivalent of the HTML <p> tag.
   */
  export type ParagraphNode = {
    /**
     * @title paragraph type
     */
    type: "paragraph";

    attrs?: never | Record<string, never>;

    /**
     * @title content
     *
     * If you want to make a new line, there will be an empty array.
     */
    content: InlineNode[];
  };

  /**
   * @title paragraph type
   */
  export type ParagraphContentWithoutNoMarks = {
    /**
     * @title paragraph type
     */
    type: "paragraph";

    attrs?: never | Record<string, never>;

    /**
     * @title content
     *
     * If you want to make a new line, there will be an empty array.
     */
    content: (
      | Omit<EmojiNode, "marks">
      | Omit<HardBreakNode, "marks">
      | Omit<InlineCardNode, "marks">
      | Omit<MentionNode, "marks">
      | Omit<TextContent, "marks">
    )[];
  };

  /**
   * The rule node represents a divider, it is equivalent to the HTML <hr/> tag.
   */
  export type RuleNode = {
    type: "rule";
  };

  /**
   * The table node provides a container for the nodes that define a table.
   *
   * Note: only supported on web and desktop. Mobile rendering support for tables is not available.
   */
  export type TableNode = {
    type: "table";
    content: TableRowNode[];
    attrs?: {
      /**
       * When isNumberColumnEnabled is set to 'true' the first table column provides numbering for the table rows.
       */
      isNumberColumnEnabled?: (true | false) & tags.Default<true>;

      /**
       * width sets the length (in pixels) of the table on the page.
       * This value is independent of the table's column width, this allows control of the table's overflow.
       * It supersedes the existing layout attribute and will be used instead of it at runtime.
       * If width is not provided the editor will convert layout to pixels (default=760, wide=960 and full-width=1800).
       * Although no minimum and maximum width is enforced it is recommended to follow these guidelines:
       *
       * - Minimum width
       *
       *   - 1 column table = 48px
       *   - 2 column table = 96px
       *   - 3 column table = 144px
       *   - > 3 column table = 144px
       * - Maximum width
       *   - 1800
       */
      width?: number & tags.Minimum<0>;

      /**
       * layout determines the alignment of a table in the full page editor, relevant to the line length. Currently only center and left alignment options are supported.
       * The layout values are mapped as follows:
       * - 'center' : will align the table to the center of page, its width can be larger than the line length
       *  - 'align-start' : will align the table left of the line length, its width cannot be larger than the line length
       */
      layout?: "center" | "align-start";

      /**
       * displayMode attribute controls how tables adapt to narrow screens:
       * When displayMode is set to 'default' or left unset, the table's columns will automatically scale down to accommodate narrow screens, with a maximum reduction of up to 40%.
       * When displayMode is set to 'fixed', the table's columns will maintain their original width, regardless of screen size.
       */
      displayMode?: "default" | "fixed";
    };
  };

  export type TableCellNode = {
    type: "tabelCell";
    content: (
      | BlockquoteNode
      | ListNode
      | CodeBlockNode
      | HeadingNode
      | MediaGroupNode
      | PanelNode
      | ParagraphNode
      | RuleNode
    )[];

    attrs?: {
      /**
       * Short or long hex color code or HTML color name
       */
      background?: string;

      /**
       * @title colspan
       * colspan defines the number of columns the cell spans.
       */
      colspan: number & tags.Type<"uint64"> & tags.Default<1>;

      /**
       * defines the width of the column or,
       * where the cell spans columns, the width of the columns it spans in pixels.
       * The length of the array should be equal to the number of spanned columns.
       * 0 is permitted as an array value if the column size is not fixed,
       * for example, a cell merged across 3 columns where one unfixed column is surrounded by two fixed might be represented as `[120, 0, 120].
       */
      colwidth: [
        number & tags.Type<"uint64">,
        number & tags.Type<"uint64">,
        number & tags.Type<"uint64">,
      ];

      /**
       * @title rowspan
       * rowspan defines the number of rows a cell spans.
       */
      rowspan: number & tags.Type<"uint64"> & tags.Default<1>;
    };
  };

  export type TableHeaderNode = {
    type: "tableHeader";
    content: (
      | BlockquoteNode
      | ListNode
      | CodeBlockNode
      | HeadingNode
      | MediaGroupNode
      | PanelNode
      | ParagraphNode
      | RuleNode
    )[];

    attrs?: {
      /**
       * Short or long hex color code or HTML color name
       */
      background?: string;

      /**
       * @title colspan
       * colspan defines the number of columns the cell spans.
       */
      colspan: number & tags.Type<"uint64"> & tags.Default<1>;

      /**
       * defines the width of the column or,
       * where the cell spans columns, the width of the columns it spans in pixels.
       * The length of the array should be equal to the number of spanned columns.
       * 0 is permitted as an array value if the column size is not fixed,
       * for example, a cell merged across 3 columns where one unfixed column is surrounded by two fixed might be represented as `[120, 0, 120].
       */
      colwidth: [
        number & tags.Type<"uint64">,
        number & tags.Type<"uint64">,
        number & tags.Type<"uint64">,
      ];

      /**
       * @title rowspan
       * rowspan defines the number of rows a cell spans.
       */
      rowspan: number & tags.Type<"uint64"> & tags.Default<1>;
    };
  };

  /**
   * The tableRow node defines rows within a table and is a container for table heading and table cell nodes.
   * tableRow is a child block node of the table node.
   */
  export type TableRowNode = {
    type: "tableRow";

    /**
     * content takes an array of one or more tableHeader or tableCell nodes.
     */
    content: (TableHeaderNode | TableCellNode)[];
  };

  /**
   * @title TopLevelBlockNode
   *
   * It refers to the types of content that are directly below the 'doc' type and can be used at the outermost level.
   * These are the types separated by the TopLevelBlockNode in the Jira document.
   *
   * - blockquote
   * - bulletList
   * - codeBlock
   * - heading
   * - mediaGroup
   * - mediaSingle
   * - orderedList
   * - panel
   * - paragraph
   * - rule
   * - table
   * - multiBodiedExtension
   */
  export type TopLevelBlockNode =
    | BlockquoteNode
    | ListNode
    | CodeBlockNode
    | HeadingNode
    | MediaGroupNode
    | MediaSingleNode
    | PanelNode
    | ParagraphNode
    | RuleNode
    | TableNode;

  /**
   * @title inlineNode
   *
   * An inline node is the nodes that belong to Paragrap and are used to write.
   * Typically used as a child node for a Paragrap node.
   */
  export type InlineNode =
    | EmojiNode
    | HardBreakNode
    | InlineCardNode
    | MentionNode
    | TextContent;

  export interface IGetIssueDetailInput extends BasicAuthorization {
    /**
     * @title issue id or key
     *
     * This connector doesn't matter the key or ID of the issue.
     * If you hand over one of them, you can use it to look up.
     */
    issueIdOrKey:
      | (Issue["id"] &
          Prerequisite<{
            method: "post";
            path: "/connector/jira/get-issues";
            jmesPath: "issues[].{value:id, label:key}";
          }>)
      | (Issue["key"] &
          Prerequisite<{
            method: "post";
            path: "/connector/jira/get-issues";
            jmesPath: "issues[].{value:key, label:key}";
          }>);
  }

  export interface IGetIssueInputByBasicAuth
    extends BasicAuthorization,
      ICommonPaginationInput,
      IGetIssueCommonRequestInput {}

  export interface IGetIssueInputBySecretKey
    extends ISecret,
      ICommonPaginationInput,
      IGetIssueCommonRequestInput {}

  export type IGetIssueAssignableOutput = Pick<
    User,
    "accountId" | "displayName" | "active"
  >[];

  export interface IGetIssueAssignableInput
    extends ICommonPaginationInput,
      BasicAuthorization {
    /**
     * @title key of project
     *
     * It refers to the key of the project to search for the user to be assigned.
     */
    project: Project["key"] &
      Prerequisite<{
        method: "post";
        path: "/connector/jira/get-projects";
        jmesPath: "values[].{value:key, label:name}";
      }>;

    /**
     * @title key of issue
     *
     * It refers to the key of the issue to search for the user to be assigned.
     */
    issueKey: Issue["key"] &
      Prerequisite<{
        method: "post";
        path: "connectors/jira/get-issues";
        jmesPath: "issues[].{value:key, label:key}";
      }>;
  }

  export type IGetProjectAssignableOutput = Pick<
    User,
    "accountId" | "displayName" | "active"
  >[];

  export type IGetStatusOutput = Pick<
    Status,
    "id" | "name" | "statusCategory" | "description" | "untranslatedName"
  >[];

  export type IGetStatusInput = BasicAuthorization;

  export type IGetStatusCategoryOutput = StatusCategory[];

  export type IGetStatusCategoryInput = BasicAuthorization;

  export interface IGetProjectAssignableInput
    extends ICommonPaginationInput,
      BasicAuthorization {
    /**
     * @title key of project
     *
     * It refers to the key of the project to search for the user to be assigned.
     */
    project_key: Project["key"] &
      Prerequisite<{
        method: "post";
        path: "/connector/jira/get-projects";
        jmesPath: "values[].{value:key, label:name}";
      }>;
  }

  export interface IGetIssueOutput extends ICommonPaginationOutput {
    /**
     * @title Jira issue list
     */
    issues: Pick<Issue, "fields" | "id" | "key">[];
  }

  export interface IGetIssueTypeOutput {
    /**
     * @title issue types in this projects
     */
    issuetypes: IssueType[];
  }

  export interface IGetIssueTypeInput extends BasicAuthorization {
    /**
     * @title id of project
     */
    projectId: Project["id"] &
      Prerequisite<{
        method: "post";
        path: "/connectors/jira/get-projects";
        jmesPath: "values[].{value:id,label:name}";
      }>;
  }

  export interface IGetProjectInputByBasicAuth
    extends BasicAuthorization,
      ICommonPaginationInput {
    /**
     * Order the results by a field.
     *
     * - issueCount : Sorts by the total number of issues in each project.
     * - lastIssueUpdatedTime : Sorts by the last issue update time.
     * - name : Sorts by project name.
     *
     * @title order by
     */
    orderBy?:
      | tags.Constant<
          "issueCount",
          {
            title: "issueCount";
            description: "Sorts by the total number of issues in each project.";
          }
        >
      | tags.Constant<
          "lastIssueUpdatedTime",
          {
            title: "lastIssueUpdatedTime";
            description: "Sorts by the last issue update time.";
          }
        >
      | tags.Constant<
          "name",
          { title: "name"; description: "Sorts by project name." }
        >;
  }

  export interface IGetProjectInputBySecretKey
    extends ISecret,
      ICommonPaginationInput {
    /**
     * Order the results by a field.
     *
     * - issueCount : Sorts by the total number of issues in each project.
     * - lastIssueUpdatedTime : Sorts by the last issue update time.
     * - name : Sorts by project name.
     *
     * @title order by
     */
    orderBy?:
      | tags.Constant<
          "issueCount",
          {
            title: "issueCount";
            description: "Sorts by the total number of issues in each project.";
          }
        >
      | tags.Constant<
          "lastIssueUpdatedTime",
          {
            title: "lastIssueUpdatedTime";
            description: "Sorts by the last issue update time.";
          }
        >
      | tags.Constant<
          "name",
          { title: "name"; description: "Sorts by project name." }
        >;
  }

  /**
   * @title output of getting Jira projects
   */
  export interface IGetProjectOutput extends ICommonPaginationOutput {
    /**
     * @title Jira project list
     */
    values: IJira.Project[];
  }

  // OAuth 연동 시에 필요한 타입이기 때문에 주석 생략
  export interface IGetAccessibleResourcesOutput {
    id: string;
    url: string;
    name: string;
    scope: string[];
    avartarUrl: string;
  }

  export interface IssueType {
    id: `${number}`;

    /**
     * @title issue type name
     *
     * It may be name, bug, story or etc.
     */
    name: string & Placeholder<"스토리">;

    /**
     * @title description
     */
    description: string;

    /**
     * @title whether is for substask issue type
     */
    subtask: boolean;
  }

  export interface Issue {
    /**
     * @title The ID of the issue
     */
    id: string;

    /**
     * @title The key of the issue
     */
    key: string;

    /**
     * @title fields
     */
    fields: IssueField;
  }

  export interface DetailedIssueField extends IssueField {
    /**
     * @title comment infomation
     */
    comment: {
      /**
       * @title Number of comments viewed at one time
       */
      maxResults: number;

      /**
       * @title Total count of comments
       */
      total: number;

      /**
       * The index of the first item to return in a page of results (page offset).
       *
       * @title page offset
       */
      startAt: number;

      /**
       * @title list of comments
       */
      comments: Comment[];
    };

    description: null | {
      content: TopLevelBlockNode[];
    };
  }

  export interface Comment {
    /**
     * @title id of comment
     */
    id: string;

    /**
     * @title author of this comment
     */
    author: Pick<User, "accountId" | "active" | "displayName">;

    /**
     * @title who updates this comment
     */
    updateAuthor: Pick<User, "accountId" | "active" | "displayName">;

    /**
     * @title body of comment
     */
    body: {
      type: "doc";
      version: 1;

      /**
       * A document in Jira is a combination of several blocks, so a single comment appears in the form of an array.
       * By combining each element in the array, you can understand the entire comment content.
       */
      content: TopLevelBlockNode[];
    };

    /**
     * @title created time of this comment
     */
    created: string;

    /**
     * @title updated time of this comment
     */
    updated: string;
  }

  export interface IssueField {
    /**
     * @title statuscategorychangedate
     *
     * The date and time when the status category of the issue was last changed.
     *
     * This property indicates the most recent timestamp when the issue transitioned
     * between status categories (e.g., from "To Do" to "In Progress" or from
     * "In Progress" to "Done"). Status categories in Jira typically include:
     * - "To Do": The issue is pending and not yet started.
     * - "In Progress": The issue is currently being worked on.
     * - "Done": The issue has been completed.
     */
    statuscategorychangedate?: string | null;

    /**
     * @title reporter
     */
    reporter?: User | null;

    /**
     * @title creator
     */
    creator?: User | null;

    /**
     * @title assignee
     */
    assignee?: User | null;

    /**
     * @title summary
     */
    summary?: string;

    /**
     * @title issue type
     */
    issuetype?: Pick<IssueType, "id" | "name">;

    /**
     * @title status
     */
    status: Pick<
      Status,
      "id" | "name" | "description" | "statusCategory" | "untranslatedName"
    >;

    /**
     * @title priority
     */
    priority: Pick<Priority, "id" | "name">;

    /**
     * @title parent of this issue
     */
    parent?: Parent;
  }

  export interface Parent {
    /**
     * @title The ID of the parent issue
     */
    id: string;

    /**
     * @title The key of the parent issue
     */
    key: string;

    fields: {
      /**
       * @title summary
       */
      summary?: string;
    };
  }

  export interface User {
    /**
     * @title id of this user account
     */
    accountId: string;

    /**
     * @title profile images of user
     */
    // avatarUrls: AvartarUrls;

    /**
     * @title creator's name
     */
    displayName: string;

    /**
     * @title Whether is user active
     */
    active: boolean;
  }

  export interface Project {
    /**
     * @title images of this project
     */
    // avatarUrls: AvartarUrls;

    /**
     * @title id
     */
    id: `${number}`;

    /**
     * @title key of project
     *
     * Key properties used to query the inside of a project.
     */
    key: string;

    /**
     * @title name of this project
     */
    name: string;

    /**
     * @title project category info
     */
    projectCategory?: {
      /**
       * @title description
       */
      description: string;

      /**
       * @title id
       */
      id: string;

      /**
       * @title name
       */
      name: string;
    };
  }

  export interface AvartarUrls {
    /**
     * @title "16x16" size image
     */
    "16x16": string & tags.Format<"uri">;

    /**
     * @title "24x24" size image
     */
    "24x24": string & tags.Format<"uri">;

    /**
     * @title "32x32" size image
     */
    "32x32": string & tags.Format<"uri">;

    /**
     * @title "48x48" size image
     */
    "48x48": string & tags.Format<"uri">;
  }

  /**
   * @title priority
   */
  export interface Priority {
    /**
     * @title url of icon
     */
    // iconUrl: string & tags.Format<"uri">;

    /**
     * @title priority name
     *
     * It may be Low, Medium, High.
     */
    name: string;

    /**
     * @title id
     */
    id: `${number}`;

    /**
     * @title meaning of this priority level
     */
    description: string;
  }

  export type Mark =
    | {
        type: "backgroundColor";
        attrs: {
          /**
           * @title color
           *
           * Color can be expressed using symbols('#') and RGB values.
           */
          color: string & tags.Pattern<"^#([0-9A-Fa-f]{6})$">;
        };
      }
    | {
        type: "code";
      }
    | {
        type: "em";
      }
    | {
        type: "link";
        attrs: {
          /**
           * @title link
           */
          href: string & tags.Format<"uri">;
        };
      }
    | {
        type: "strike";
      }
    | {
        type: "strong";
      }
    | {
        type: "subsup";
        attrs: {
          type: "sub" | "sup";
        };
      }
    | {
        type: "textColor";
        attrs: {
          /**
           * @title color
           *
           * Color can be expressed using symbols('#') and RGB values.
           */
          color: `#${string}`;
        };
      }
    | {
        type: "underline";
      };

  export interface StatusCategory {
    /**
     * @title name of color
     */
    colorName: string;

    /**
     * @title The ID of status category
     */
    id: number;

    /**
     * @title The key of status category
     */
    key: string;

    /**
     * @title name of the status category
     */
    name: string;
  }
}
