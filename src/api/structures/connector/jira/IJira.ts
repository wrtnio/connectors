import type { tags } from "typia";
import type { ICommon } from "../common/ISecretValue";

export namespace IJira {
  export type ISecret = ICommon.ISecret<"atlassian", []>;

  export interface IGetProjectInput extends ISecret {
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
    maxResults?: number & tags.Type<"int32"> & tags.Default<50>;

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

  export interface IGetProjectOutput {
    isLast: boolean;
    total: number & tags.Type<"int64">;
    startAt: number & tags.Type<"int64">;
    maxResults: number & tags.Type<"int32">;
    values: IJira.Project[];
  }

  export interface IGetAccessibleResourcesOutput {
    id: string;
    url: string;
    name: string;
    scope: string[];
    avartarUrl: string;
  }

  export interface Project {
    avatarUrls: {
      "16x16": string & tags.Format<"uri">;
      "24x24": string & tags.Format<"uri">;
      "32x32": string & tags.Format<"uri">;
      "48x48": string & tags.Format<"uri">;
    };
    id: string;
    key: string;
    name: string;
    projectCategory?: {
      description: string;
      id: string;
      name: string;
    };
  }
}
