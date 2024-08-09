import type { Placeholder, Prerequisite } from "@wrtnio/decorators";
import type { tags } from "typia";
import type { ICommon } from "../common/ISecretValue";

export namespace IJira {
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

  export interface BasicAuthorization {
    /**
     * @title email in Jira
     */
    email: string;

    /**
     * @title jira api token
     *
     * You can access {@link https://id.atlassian.com/manage-profile/security/api-tokens} and get it issued.
     */
    apiToken: string;

    /**
     * @title domain of your workspace site in Jira
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

  export interface ICreateIssueInput extends BasicAuthorization {
    fields: {
      /**
       * @title Specify a representative at the same time as you create
       */
      assignee?: {
        /**
         * @title accountId of the user you want to designate as the person in charge
         */
        id: User["accountId"] &
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
         */
        content: Content[];
      };

      /**
       * @title due date
       *
       * date format type
       */
      duedate?: string & tags.Format<"date">;

      /**
       * @title id of issue
       */
      issuetype: {
        id: IssueType["id"] &
          Prerequisite<{
            method: "post";
            path: "/connector/jira/get-issue-types";
            jmesPath: "issuetypes[].{value:id, label:name}";
          }>;
      };

      /**
       * @title labels
       */
      labels?: string[];

      /**
       * @title parent of this issue
       */
      parent?: {
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
        id: Priority["id"] &
          Prerequisite<{
            method: "post";
            path: "/connector/jira/get-issue-priorities";
            jmesPath: "[].{value:id, label:name}";
          }>;
      };

      /**
       * @title project
       */
      project:
        | {
            id: Project["id"] &
              Prerequisite<{
                method: "post";
                path: "/connector/jira/get-projects";
                jmesPath: "[].{value:id, label:name}";
              }>;
          }
        | {
            key: Project["key"] &
              Prerequisite<{
                method: "post";
                path: "/connector/jira/get-project";
                jmesPath: "[].{value:key, label:name}";
              }>;
          };

      /**
       * @title reporter
       */
      reporter?: {
        id: User["accountId"] &
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
    status?:
      | tags.Constant<
          "Open",
          {
            title: "Open";
            description: "The issue is open and ready for the assignee to start work on it.";
          }
        >
      | tags.Constant<
          "In Progress",
          {
            title: "In Progress";
            description: "This issue is being actively worked on at the moment by the assignee.";
          }
        >
      | tags.Constant<
          "Done",
          { title: "완료"; description: "Work has finished on the issue." }
        >
      | tags.Constant<
          "To Do",
          {
            title: "To Do";
            description: "The issue has been reported and is waiting for the team to action it.";
          }
        >
      | tags.Constant<
          "In Review",
          {
            title: "In Review";
            description: "The assignee has carried out the work needed on the issue, and it needs peer review before being considered done.";
          }
        >
      | tags.Constant<
          "Under review",
          {
            title: "Under review";
            description: "A reviewer is currently assessing the work completed on the issue before considering it done.";
          }
        >
      | tags.Constant<
          "Approved",
          {
            title: "Approved";
            description: "A reviewer has approved the work completed on the issue and the issue is considered done.";
          }
        >
      | tags.Constant<
          "Cancelled",
          {
            title: "Cancelled";
            description: "Work has stopped on the issue and the issue is considered done.";
          }
        >
      | tags.Constant<
          "Rejected",
          {
            title: "Rejected";
            description: "A reviewer has rejected the work completed on the issue and the issue is considered done.";
          }
        >;

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
    marks?:
      | [
          {
            type: "code";
          },
        ]
      | {
          type: "link";
          attrs: { href: string };
        }[];
  };

  /**
   * @title content with mention
   */
  export type MentionContent = {
    /**
     * @title mention type
     */
    type: "mention";

    text?: never;

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

  export type MediaContent = {
    /**
     * @title mediaSingle type
     */
    type: "mediaSingle";

    /**
     * @title media
     */
    content: {
      /**
       * @title media
       */
      type: "media";
      attrs: {
        /**
         * @title type
         *
         * for example, 'file'
         * but I'dont know what type is.
         */
        type: string;

        /**
         * @title image width
         */
        width?: number;

        /**
         * @title image height
         */
        height?: number;

        /**
         * if type is 'file' and image
         */
        alt?: string;
      };
    }[];
  };

  /**
   * @title content with maybe marks
   */
  // export type MarkContent = {
  //   type: string;
  //   text?: string;
  //   marks?: { type: string; attrs: { href: string } }[];
  // };

  /**
   * @title code block
   */
  export type CodeBlockContent = {
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
      language: string;
    };

    /**
     * @title code content
     */
    content: Pick<TextContent, "text" | "type">[];
  };

  /**
   * @title paragraph type
   */
  export type ParagraphContent = {
    /**
     * @title paragraph type
     */
    type: "paragraph";

    attrs?: never;

    /**
     * @title content
     *
     * If you want to make a new line, there will be an empty array.
     */
    content: (TextContent | MentionContent)[];
  };

  export type BlockquoteType = {
    /**
     * @title blockquote type
     */
    type: "blockquote";

    content: ParagraphContent[];
  };

  /**
   * @title content types
   */
  export type Content =
    | CodeBlockContent
    | TextContent
    | ParagraphContent
    | MentionContent
    | MediaContent
    | BlockquoteType;

  export interface IGetIssueDetailInput extends BasicAuthorization {
    /**
     * @title id or key
     */
    issueIdOrKey: string;
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
    id: string;

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
      content: Content[];
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
      /**
       * A document in Jira is a combination of several blocks, so a single comment appears in the form of an array.
       * By combining each element in the array, you can understand the entire comment content.
       */
      content: Content[];
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
    statuscategorychangedate?: string;

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
    id: string;

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
    id: string;

    /**
     * @title meaning of this priority level
     */
    description: string;
  }
}
