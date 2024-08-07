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
     *
     * @title max results
     */
    maxResults?: number &
      tags.Type<"int32"> &
      tags.Default<50> &
      tags.Maximum<100>; // maybe it's maximum value is 100
  }

  export interface ICommonPaginationOutput extends ICommonPaginationInput {
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
    untranslatedName: string;

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
            title: "열림";
            description: "The issue is open and ready for the assignee to start work on it.";
          }
        >
      | tags.Constant<
          "In Progress",
          {
            title: "진행중";
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
            title: "";
            description: "The issue has been reported and is waiting for the team to action it.";
          }
        >
      | tags.Constant<
          "In Review",
          {
            title: "";
            description: "The assignee has carried out the work needed on the issue, and it needs peer review before being considered done.";
          }
        >
      | tags.Constant<
          "Under review",
          {
            title: "";
            description: "A reviewer is currently assessing the work completed on the issue before considering it done.";
          }
        >
      | tags.Constant<
          "Approved",
          {
            title: "";
            description: "A reviewer has approved the work completed on the issue and the issue is considered done.";
          }
        >
      | tags.Constant<
          "Cancelled",
          {
            title: "";
            description: "Work has stopped on the issue and the issue is considered done.";
          }
        >
      | tags.Constant<
          "Rejected",
          {
            title: "";
            description: "A reviewer has rejected the work completed on the issue and the issue is considered done.";
          }
        >;

    /**
     * @title name of assignee
     */
    assignee?: string;

    /**
     * @title Search for issues created after this date
     */
    created_start_date?: string & tags.Format<"date">;

    /**
     * @title Search for issues created after this date
     */
    created_end_date: string & tags.Format<"date">;
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
    issues: Issue[];
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
     * @title Wheather is last page
     */
    isLast: boolean;

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

    fields: {
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
      priority: {
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
      };

      /**
       * @title parent of this issue
       */
      parent?: Parent;
    };
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
}
