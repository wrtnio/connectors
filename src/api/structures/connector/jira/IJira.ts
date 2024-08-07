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

  export interface IGetIssueInputByBasicAuth
    extends BasicAuthorization,
      ICommonPaginationInput {
    /**
     * @title key of project
     */
    project_key: Project["key"] &
      Prerequisite<{
        method: "post";
        path: "/connector/jira/get-projects";
        jmesPath: "values[].{value:key, label:name}";
      }>;
  }

  export interface IGetIssueInputBySecretKey
    extends ISecret,
      ICommonPaginationInput {
    /**
     * @title key of project
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
      issuetype?: {
        id: string;

        /**
         * @title issue type name
         *
         * It may be name, bug, story or etc.
         */
        name: string & Placeholder<"스토리">;
      };

      status: {
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
      };

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
