import { Placeholder, Prerequisite } from "@wrtnio/decorators";
import { tags } from "typia";
import { StrictOmit } from "../../../../utils/strictOmit";
import { ICommon } from "../common/ISecretValue";
import { PickPartial } from "../../../../utils/types/PickPartial";

export namespace IGithub {
  export interface ICommonPaginationOutput {
    /**
     * @title true if there is a next page
     *
     * However, since true and false are judged by comparing the number of requested objects with the number of searched objects,
     * even if true, the next page may be empty.
     */
    nextPage: boolean;

    /**
     * @title after
     *
     * If this is the response value for cursor-based pagenation, it provides a hash code for the next page.
     */
    after?: string;

    /**
     * @title before
     *
     * If this is the response value for cursor-based pagenation, it provides a hash code for the previous page.
     */
    before?: string;

    /**
     * @title prev
     *
     * If this is a response by offset-based pagenation, provide metadata for the next page.
     * This means the previous page.
     */
    prev?: number | null;

    /**
     * @title next
     *
     * If this is a response by offset-based pagenation, provide metadata for the next page.
     * This means the next page.
     */
    next?: number | null;

    /**
     * @title last
     *
     * If this is a response by offset-based pagenation, provide metadata for the next page.
     * This means the last page.
     */
    last?: number;

    /**
     * @title first
     *
     * If this is a response by offset-based pagenation, provide metadata for the next page.
     * This means the first page.
     */
    first?: number;
  }

  export interface ICommonPaginationInput {
    /**
     * @title per_page
     * The number of results per page (max 100).
     */
    per_page?: number &
      tags.Type<"uint64"> &
      tags.Default<30> &
      tags.Maximum<100>;

    /**
     * @title page
     * The page number of the results to fetch.
     */
    page?: number & tags.Type<"uint64"> & tags.Default<1>;

    /**
     * @title order
     *
     * Determines whether the first search result returned is the highest number of matches (desc) or lowest number of matches (asc).
     * This parameter is ignored unless you provide sort.
     */
    order?: ("desc" | "asc") & tags.Default<"desc">;
  }

  export type __IAnalyzeInput = (
    | (RepositoryFolder & {
        /**
         * @title children
         *
         * For folders, you may have other files or folders inside.
         * This should also be a folder or file type object,
         * but here, we specify it as any type to prevent it because it can be recursively infinitely large.
         */
        children: any[];
      })
    | StrictOmit<IGithub.RepositoryFile, "encoding" | "content">
  )[];

  export type MileStone = {
    id: number;
    number: number;
    state: "open" | "closed"; // 더 확인이 필요
    title: string;
    description: string;
    creator: Pick<User, "id" | "login" | "type">;
    open_issues: number & tags.Type<"uint64"> & tags.Minimum<0>;
    closed_issues: number & tags.Type<"uint64"> & tags.Minimum<0>;
    created_at: string & tags.Format<"date-time">;
    updated_at: string & tags.Format<"date-time">;
    closed_at: string & tags.Format<"date-time">;
    due_on: string & tags.Format<"date-time">;
  };

  export interface IReadPullRequestFileOutput
    extends IGithub.ICommonPaginationOutput {
    result: File[];
  }

  export interface IReadPullRequestFileInput
    extends IReadPullRequestDetailInput,
      Pick<ICommonPaginationInput, "page" | "per_page"> {}

  export interface IReadPullRequestCommitOutput
    extends IGithub.ICommonPaginationOutput {
    /**
     * @title commit list of this pull request
     */
    result: StrictOmit<Commit, "sha">[];
  }

  export interface IReadPullRequestCommitInput
    extends IReadPullRequestDetailInput,
      Pick<ICommonPaginationInput, "page" | "per_page"> {}

  export interface IReadPullRequestRequestedReviewerOutput {
    /**
     * @title requested reviewers
     */
    users: Collaborator[];
  }

  export type IReadPullRequestDetailOutput = PullRequest;

  export interface IReadPullRequestDetailInput
    extends ICommon.ISecret<"github", ["repo"]> {
    /**
     * @title owner's name
     *
     * The owner's name and the repository's name can be combined to form '${owner}/${repo}' and can be a unique path name for a single repository.
     * So the owner here is the nickname of the repository owner, not the name of the person committing or the author.
     */
    owner: User["login"];

    /**
     * @title repository name
     *
     * The owner's name and the repository's name can be combined to form '${owner}/${repo}' and can be a unique path name for a single repository.
     */
    repo: Repository["name"];

    /**
     * @title pull request number to update
     */
    pull_number: number &
      tags.Type<"uint64"> &
      tags.Minimum<1> &
      (
        | Prerequisite<{
            method: "post";
            path: "/connector/repositories/get-pull-requests";
            jmesPath: "pullRequests[].{value:number, label:title}";
          }>
        | Prerequisite<{
            method: "post";
            path: "/connector/repositories/pull-requests";
            jmesPath: "pullRequests[].{value:number, label:number}";
          }>
      );
  }

  export interface IGetUserOrganizationOutput
    extends IGithub.ICommonPaginationOutput {
    result: Organization[];
  }

  export interface IGetUserOrganizationInput
    extends IGetAuthenticatedUserOrganizationInput {
    /**
     * @title user's nickname
     */
    username: User["login"];
  }

  export interface IGetAuthenticatedUserOrganizationOutput
    extends IGithub.ICommonPaginationOutput {
    result: Organization[];
  }

  export interface IGetAuthenticatedUserOrganizationInput
    extends ICommon.ISecret<"github", ["user"]>,
      Pick<IGithub.ICommonPaginationInput, "page" | "per_page"> {}

  export type IGetRepositoryFolderStructureOutput = (
    | (RepositoryFolder & {
        /**
         * @title children
         *
         * For folders, you may have other files or folders inside.
         * This should also be a folder or file type object,
         * but here, we specify it as any type to prevent it because it can be recursively infinitely large.
         */
        children: any[];
      })
    | StrictOmit<IGithub.RepositoryFile, "encoding" | "content">
  )[];

  export interface IGetRepositoryFolderStructureInput
    extends Pick<IGithub.IGetFileContentInput, "secretKey" | "owner" | "repo"> {
    /**
     * @title folder name
     *
     * The path delivered is treated like a Root folder and continues the navigation from this folder.
     * Browse by this folder, and it must be a folder, not a file.
     * If omitted, start the circuit based on the top Root folder.
     */
    path?: string & tags.Default<"">;
  }

  export type IGetFileContentOutput =
    | (StrictOmit<RepositoryFile, "encoding" | "content"> | RepositoryFolder)[]
    | RepositoryFile;

  export type RepositoryFolder = {
    /**
     * @title type
     */
    type: "dir";

    /**
     * @title Indicates the file size in bytes.
     */
    size: 0;

    /**
     * @title name of this folder
     */
    name: File["filename"];

    /**
     * @title path
     *
     * It must be unique as a path for identifying that file in the root folder.
     */
    path: string;

    /**
     * @title sha
     */
    sha: string;
  };

  export type RepositoryFile = {
    type: "file";
    encoding: string & Placeholder<"base64">;

    /**
     * @title Indicates the file size in bytes.
     */
    size: number;

    /**
     * @title name of this file
     */
    name: File["filename"];

    /**
     * @title path
     *
     * It must be unique as a path for identifying that file in the root folder.
     */
    path: string;

    /**
     * @title content
     */
    content: string;

    /**
     * @title sha
     */
    sha: string;

    /**
     * @title url
     *
     * A link that allows you to view the contents of the file as an Url value for viewing the details of the file.
     */
    url: string;

    /**
     * @title download_url
     *
     * The url that allows you to download a file, which is useful if it is a media file containing an image.
     */
    download_url?: string | null;
  };

  export type IGetReadmeFileContentOutput = RepositoryFile | null;

  export type IGetBulkFileContentOutput = IGetFileContentOutput[];

  export interface IGetBulkFileContentInput extends ICommon.ISecret<"github"> {
    /**
     * @title owner's name
     *
     * The owner's name and the repository's name can be combined to form '${owner}/${repo}' and can be a unique path name for a single repository.
     * So the owner here is the nickname of the repository owner, not the name of the person committing or the author.
     */
    owner: User["login"];

    /**
     * @title repository name
     *
     * The owner's name and the repository's name can be combined to form '${owner}/${repo}' and can be a unique path name for a single repository.
     */
    repo: Repository["name"];

    /**
     * @title path parameters
     *
     * It refers to the path of the file, and is the path of the file including folders and extensions.
     * If you want to make index.ts in src, you need to add 'src/index.ts'.
     */
    paths?: string[];

    /**
     * @title branch name
     */
    branch?: Branch["name"];
  }

  export type IGetReadmeFileContentInput = Pick<
    IGithub.IGetFileContentInput,
    "secretKey" | "owner" | "repo"
  >;

  export interface IGetFileContentInput extends ICommon.ISecret<"github"> {
    /**
     * @title owner's name
     *
     * The owner's name and the repository's name can be combined to form '${owner}/${repo}' and can be a unique path name for a single repository.
     * So the owner here is the nickname of the repository owner, not the name of the person committing or the author.
     *
     * If it is an organization's repository, it can also be the name of the organization.
     */
    owner: User["login"] | Organization["login"];

    /**
     * @title repository name
     *
     * The owner's name and the repository's name can be combined to form '${owner}/${repo}' and can be a unique path name for a single repository.
     */
    repo: Repository["name"];

    /**
     * @title path parameters
     *
     * It refers to the path of the file, and is the path of the file including folders and extensions.
     * If you want to make index.ts in src, you need to add 'src/index.ts'.
     */
    path?: string;

    /**
     * @title branch name
     */
    branch?: Branch["name"];
  }

  export type IDeleteFileContentInput = StrictOmit<
    IUpdateFileContentInput,
    "content"
  >;

  export interface IGetCollaboratorOutput extends ICommonPaginationOutput {
    result: IGithub.Collaborator[];
  }

  export type Collaborator = Pick<
    IGithub.User,
    "id" | "login" | "html_url" | "avatar_url" | "type"
  >;

  export interface IGetCollaboratorInput
    extends ICommon.ISecret<"github", ["admin:org", "repo"]>,
      Pick<ICommonPaginationInput, "page" | "per_page"> {
    /**
     * @title owner's name
     *
     * The owner's name and the repository's name can be combined to form '${owner}/${repo}' and can be a unique path name for a single repository.
     * So the owner here is the nickname of the repository owner, not the name of the person committing or the author.
     */
    owner: User["login"];

    /**
     * @title repository name
     *
     * The owner's name and the repository's name can be combined to form '${owner}/${repo}' and can be a unique path name for a single repository.
     */
    repo: Repository["name"];

    /**
     * @title affiliation
     *
     * Filter collaborators returned by their affiliation.
     * outside means all outside collaborators of an organization-owned repository. direct means all collaborators with permissions to an organization-owned repository, regardless of organization membership status. all means all collaborators the authenticated user can see.
     * It must be one of: "outside", "direct", "all".
     */
    affiliation?: (
      | tags.Constant<"outside", { title: "outside" }>
      | tags.Constant<"direct", { title: "direct" }>
      | tags.Constant<"all", { title: "all" }>
    ) &
      tags.Default<"all">;

    /**
     * @title permission
     *
     * Filter collaborators by the permissions they have on the repository. If not specified, all collaborators will be returned.
     * It must be one of: "pull", "triage", "push", "maintain", "admin".
     */
    permission?:
      | tags.Constant<"pull", { title: "pull" }>
      | tags.Constant<"triage", { title: "triage" }>
      | tags.Constant<"push", { title: "push" }>
      | tags.Constant<"maintain", { title: "maintain" }>
      | tags.Constant<"admin", { title: "admin" }>;
  }

  export interface IUpdateFileContentInput extends ICreateFileContentInput {
    /**
     * @title sha of file content
     *
     * As the sha value of the file to be modified, a conflict may occur if it is not the latest sha value among the sha values of the file.
     * It's safe when you look up a list of files through API to check sha and put in a value, or want to re-modify the sha value of a file you just created.
     */
    sha: IUpsertFileContentOutput["content"]["sha"] &
      Prerequisite<{
        method: "post";
        path: "/connector/github/repos/get-contents";
        jmesPath: "[].{value:sha, label:path} || {value:sha, label:path}";
      }>;
  }

  export interface IUpsertFileContentOutput {
    /**
     * @title content
     */
    content: {
      /**
       * @title file or folder name
       */
      name: string;

      /**
       * @title file or folder path
       */
      path: string;

      /**
       * @title sha
       */
      sha: string;

      /**
       * @title size
       */
      size: number;
    };

    /**
     * @title commit
     */
    commit: {
      /**
       * @title sha
       */
      sha: string;
    };
  }

  export interface ICreateFileContentInput
    extends ICommon.ISecret<"github", ["repo"]> {
    /**
     * @title owner's name
     *
     * The owner's name and the repository's name can be combined to form '${owner}/${repo}' and can be a unique path name for a single repository.
     * So the owner here is the nickname of the repository owner, not the name of the person committing or the author.
     */
    owner: User["login"];

    /**
     * @title repository name
     *
     * The owner's name and the repository's name can be combined to form '${owner}/${repo}' and can be a unique path name for a single repository.
     */
    repo: Repository["name"];

    /**
     * @title path parameters
     *
     * It refers to the path of the file, and is the path of the file including folders and extensions.
     * If you want to make index.ts in src, you need to add 'src/index.ts'.
     */
    path: string;

    message: Commit["message"];
    /**
     * @title the new file content
     *
     * Meaning of the file is text and text.
     * If you want to create code content, you should write code content.
     * Since it encodes with base64 internally, we need to deliver text here before encoding.
     */
    content: string;

    /**
     * @title branch name
     *
     * The branch name. Default: the repository’s default branch
     */
    branch?: Branch["name"];

    /**
     * @title The person that committed the file.
     * If you don't put anything in, your own information will be injected, so you can leave the value alone.
     * Since the user's email cannot necessarily be guaranteed to be the same as Github's email, it is advantageous not to get confirmation from the user or put it in.
     *
     * Default: the authenticated user.
     */
    committer?: {
      /**
       * @title The name of the author or committer of the commit
       */
      name: string;

      /**
       * @title The email of the author or committer of the commit
       */
      email: string;
      date: string & tags.Format<"date-time">;
    };

    /**
     * @title The author of the file.
     *
     * If you don't put anything in, your own information will be injected, so you can leave the value alone.
     * Since the user's email cannot necessarily be guaranteed to be the same as Github's email, it is advantageous not to get confirmation from the user or put it in.
     *
     * Default: The committer or the authenticated user if you omit committer.
     */
    author?: {
      /**
       * @title The name of the author or committer of the commit
       */
      name: string;

      /**
       * @title The email of the author or committer of the commit
       */
      email: string;
      date: string & tags.Format<"date-time">;
    };
  }

  export interface IGetReceivedEventInput extends IGetEventInput {
    /**
     * @title user's nickname
     */
    username: User["login"];
  }

  export type IGetPullRequestOutput = StrictOmit<
    PullRequest,
    | "mergeable"
    | "rebaseable"
    | "mergeable_state"
    | "merged_by"
    | "maintainer_can_modify"
    | "comments"
    | "review_comments"
    | "commits"
    | "additions"
    | "deletions"
    | "changed_files"
  >[];

  export interface IGetPullRequestInput extends ICommon.ISecret<"github"> {
    /**
     * @title user's nickname
     */
    owner: User["login"];

    /**
     * @title The name of the repository
     */
    repo: Repository["name"];

    /**
     * @title commit_sha
     *
     * The SHA of the commit.
     */
    commit_sha: string;
  }
  export type IAnalyzeOutput = string[];

  export type IAnalyzeInput = StrictOmit<
    IGetRepositoryFolderStructureInput,
    "path"
  >;

  export type IGetCommitHeadOutput = {
    sha: Commit["sha"];
    commit: Pick<
      Commit,
      "author" | "committer" | "comment_count" | "message" | "tree" | "url"
    >;
    files: IGithub.File[];
  };

  export interface IGetCommitHeadInput extends ICommon.ISecret<"github"> {
    /**
     * @title user's nickname
     */
    owner: User["login"];

    /**
     * @title The name of the repository
     */
    repo: Repository["name"];

    /**
     * @title commit_sha
     *
     * The SHA of the commit.
     */
    commit_sha: string &
      Prerequisite<{
        method: "post";
        path: "/connector/github/get-commit-list";
        jmesPath: "result[].{value:sha, label:comment.message}";
      }>;
  }

  export interface ICallInput extends ICommon.ISecret<"github"> {
    /**
     * @title github api endpoint
     */
    url: string &
      tags.Format<"uri"> &
      tags.Pattern<"^https://api.github.com/(.*)">;
  }

  export interface IGetEventOutput extends ICommonPaginationOutput {
    result: {
      /**
       * @title id
       */
      id: string;

      /**
       * @title event type
       * There are various events such as `WatchEvent`, `CreateEvent`, `ForkEvent`.
       */
      type:
        | tags.Constant<
            "CommitCommentEvent",
            {
              title: "CommitCommentEvent";
              description: "Triggered when a comment is added to a commit.";
            }
          >
        | tags.Constant<
            "CreateEvent",
            {
              title: "CreateEvent";
              description: "Triggered when a new branch, tag, or repository is created.";
            }
          >
        | tags.Constant<
            "DeleteEvent",
            {
              title: "DeleteEvent";
              description: "Triggered when a branch or tag is deleted.";
            }
          >
        | tags.Constant<
            "ForkEvent",
            {
              title: "ForkEvent";
              description: "Triggered when a user forks a repository.";
            }
          >
        | tags.Constant<
            "GollumEvent",
            {
              title: "GollumEvent";
              description: "Triggered when a Wiki page is created or updated.";
            }
          >
        | tags.Constant<
            "IssueCommentEvent",
            {
              title: "IssueCommentEvent";
              description: "Triggered when a comment is added to an issue.";
            }
          >
        | tags.Constant<
            "IssuesEvent",
            {
              title: "IssuesEvent";
              description: "Triggered when an issue is opened, edited, or closed.";
            }
          >
        | tags.Constant<
            "MemberEvent",
            {
              title: "MemberEvent";
              description: "Triggered when a user is added as a collaborator to a repository.";
            }
          >
        | tags.Constant<
            "PublicEvent",
            {
              title: "PublicEvent";
              description: "Triggered when a private repository is made public.";
            }
          >
        | tags.Constant<
            "PullRequestEvent",
            {
              title: "PullRequestEvent";
              description: "Triggered when a pull request is opened, edited, merged, or closed.";
            }
          >
        | tags.Constant<
            "PullRequestReviewEvent",
            {
              title: "PullRequestReviewEvent";
              description: "Triggered when a review is submitted for a pull request.";
            }
          >
        | tags.Constant<
            "PullRequestReviewCommentEvent",
            {
              title: "PullRequestReviewCommentEvent";
              description: "Triggered when a comment is added to a pull request's review.";
            }
          >
        | tags.Constant<
            "PullRequestReviewThreadEvent",
            {
              title: "PullRequestReviewThreadEvent";
              description: "Triggered when a review thread in a pull request has a change.";
            }
          >
        | tags.Constant<
            "PushEvent",
            {
              title: "PushEvent";
              description: "Triggered when commits are pushed to a repository.";
            }
          >
        | tags.Constant<
            "ReleaseEvent",
            {
              title: "ReleaseEvent";
              description: "Triggered when a release is published.";
            }
          >
        | tags.Constant<
            "SponsorshipEvent",
            {
              title: "SponsorshipEvent";
              description: "Triggered when a sponsorship is started or modified.";
            }
          >
        | tags.Constant<
            "WatchEvent",
            {
              title: "WatchEvent";
              description: "Triggered when a user stars a repository.";
            }
          >
        | null;

      /**
       * @title user
       */
      actor: Pick<User, "id" | "login">;

      /**
       * @title repo
       */
      repo: Pick<Repository, "id" | "name">;

      /**
       * @title org
       */
      org?: Pick<Organization, "id" | "display_login" | "login">;

      /**
       * @@title payload
       */
      payload: IGithub.Payload;

      /**
       * @title whather is public
       */
      public: boolean;

      /**
       * @title created_at
       */
      created_at: (string & tags.Format<"date-time">) | null;
    }[];
  }

  export type IGetOrganizationUserEventInput = IGetOrganizationEventInput;

  export interface IGetOrganizationEventInput extends IGetEventInput {
    /**
     * @title organization's name
     *
     * You can also change it to your nickname.
     */
    organization: Organization["login"];
  }

  export interface IGetRepoEventInput extends IGetUserEventInput {
    /**
     * @title The name of the repository
     */
    repo: Repository["name"];
  }

  export interface IGetUserEventInput extends IGetEventInput {
    /**
     * @title user's nickname
     */
    username: User["login"];
  }

  export interface IGetEventInput
    extends StrictOmit<ICommonPaginationInput, "order">,
      ICommon.ISecret<"github"> {}

  export interface IGetRepositoryActivityOutput
    extends ICommonPaginationOutput {
    /**
     * @title result of repository activities
     */
    result: Activity[];
  }

  export interface IGetRepositoryActivityInput
    extends StrictOmit<ICommonPaginationInput, "order" | "page">,
      ICommon.ISecret<"github", ["repo"]> {
    /**
     * @title direction
     * The order to sort by.
     * Default: asc when using full_name, otherwise desc.
     */
    direction?: ICommonPaginationInput["order"];

    /**
     * @title before
     *
     * A cursor, as given in the Link header.
     * If specified, the query only searches for results before this cursor.
     */
    before?: IGetRepositoryActivityOutput["before"];

    /**
     * @title after
     *
     * A cursor, as given in the Link header.
     * If specified, the query only searches for results after this cursor.
     */
    after?: IGetRepositoryActivityOutput["after"];

    /**
     * @title user's nickname
     */
    owner: User["login"];

    /**
     * @title The name of the repository
     */
    repo: Repository["name"];

    /**
     * @title ref
     *
     * The name of one of the branches of this repository.
     */
    ref?: Branch["name"] &
      Prerequisite<{
        method: "post";
        path: "/connector/github/get-branches";
        jmesPath: "result[].{value:name, label:name}";
      }>;

    /**
     * @title username
     */
    actor?: User["login"];

    /**
     * @title time_period
     */
    time_period?: "day" | "week" | "month" | "quarter" | "year";

    /**
     * @title activity_type
     */
    activity_type?: Activity["activity_type"];
  }

  export type IGetMyProfileInput = ICommon.ISecret<"github">;
  export interface IGetFolloweeOutput extends ICommonPaginationOutput {
    /**
     * @title followees
     */
    result: Pick<User, "id" | "login" | "avatar_url" | "html_url">[];
  }

  export type IUpdateIssueOutput = IGithub.Issue;

  export interface IUpdateIssueInput
    extends PickPartial<ICreateIssueInput, "title"> {
    /**
     * @title issue number to update
     */
    issue_number: number &
      tags.Type<"uint64"> &
      tags.Minimum<1> &
      (
        | Prerequisite<{
            method: "post";
            path: "/connector/github/issues";
            jmesPath: "{label:number, value:title}";
          }>
        | Prerequisite<{
            method: "post";
            path: "/connector/github/issues";
            jmesPath: "result[].{label:number, value:title}";
          }>
      );
  }

  export type ICreateIssueOutput = IGithub.Issue;

  export interface ICreateIssueInput
    extends ICommon.ISecret<"github", ["repo"]> {
    /**
     * @title user's nickname
     */
    owner: User["login"];

    /**
     * @title The name of the repository
     */
    repo: Repository["name"];

    /**
     * @title tite of this issue
     */
    title: string;

    /**
     * @title body of this issue
     *
     * It can be markdown format
     * If you provide text in utf-8 format, which can be recognized by a person, in markdown format, it will be written as it is.
     */
    body?: string;

    /**
     * @title assignees
     *
     * Deliver the user nickname to be designated as the person in charge in the array.
     */
    assignees?: User["login"][];

    /**
     * @title labels
     */
    labels?: string[];
  }

  export interface IGetFolloweeInput
    extends ICommonPaginationInput,
      ICommon.ISecret<"github", ["user"]> {
    /**
     * @title user's nickname
     */
    username: User["login"];
  }

  export interface IGetLabelOutput extends ICommonPaginationOutput {
    result: IGithub.Label[];
  }

  export type Label = {
    /**
     * @title label name
     */
    name: string;

    /**
     * @title color
     */
    color: string;

    /**
     * @title default
     *
     * True if it is not created by the user but automatically created from the beginning.
     */
    default: boolean;

    /**
     * @title description
     */
    description: string | null;
  };

  export interface IGetLabelInput
    extends Pick<ICommonPaginationInput, "per_page" | "page">,
      ICommon.ISecret<"github", ["repo"]> {
    /**
     * @title user's nickname
     */
    owner: User["login"];

    /**
     * @title The name of the repository
     */
    repo: Repository["name"];
  }

  export interface IGetFollowerOutput extends ICommonPaginationOutput {
    /**
     * @title followers
     */
    result: Pick<User, "id" | "login" | "avatar_url" | "html_url">[];
  }

  export interface IGetFollowerInput
    extends ICommonPaginationInput,
      ICommon.ISecret<"github", ["user"]> {
    /**
     * @title user's nickname
     */
    username: User["login"];
  }

  export interface IGetCommitListOutput extends ICommonPaginationOutput {
    /**
     * @title commit list
     */
    result: {
      sha: Commit["sha"];
      commit: Pick<Commit, "url" | "author" | "committer" | "message">;
    }[];
  }

  export interface IGetCommitListInput
    extends ICommonPaginationInput,
      ICommon.ISecret<"github", ["repo"]> {
    /**
     * @title user's nickname
     */
    owner: User["login"];

    /**
     * @title The name of the repository
     */
    repo: Repository["name"];

    /**
     * @title sha
     *
     * SHA or branch to start listing commits from. Default: the repository’s default branch (usually main).
     */
    sha?: string;

    /**
     * @title path
     *
     * Only commits containing this file path will be returned.
     */
    path?: string;

    /**
     * @title author
     *
     * GitHub username or email address to use to filter by commit author.
     */
    author?: string;

    /**
     * @title committer
     *
     * GitHub username or email address to use to filter by commit committer.
     */
    committer?: string;

    /**
     * @title since
     *
     * Only show results that were last updated after the given time. This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ. Due to limitations of Git, timestamps must be between 1970-01-01 and 2099-12-31 (inclusive) or unexpected results may be returned.
     */
    since?: string & tags.Format<"date-time">;

    /**
     * @title until
     *
     * Only commits before this date will be returned. This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ. Due to limitations of Git, timestamps must be between 1970-01-01 and 2099-12-31 (inclusive) or unexpected results may be returned.
     */
    until?: string & tags.Format<"date-time">;
  }

  export interface IGetCommitOutput {
    /**
     * @title hash of this commit
     */
    sha: string;

    /**
     * @title commit
     */
    commit: StrictOmit<Commit, "sha">;

    html_url: string & tags.Format<"uri">;

    /**
     * @title Parents of this commit
     */
    parents: Pick<Commit, "sha">[];

    stats: {
      /**
       * @title sum of additions and deletions
       */
      total: number & tags.Type<"uint64">;

      /**
       * @title lines of additions
       */
      additions: number & tags.Type<"uint64">;

      /**
       * @title lines of deletions
       */
      deletions: number & tags.Type<"uint64">;
    };

    /**
     * @title files
     *
     * You can see the changes for each file.
     */
    files: IGithub.File[];
  }

  export interface IGetCommitInput extends ICommon.ISecret<"github", ["repo"]> {
    /**
     * @title user's nickname
     */
    owner: User["login"];

    /**
     * @title The name of the repository
     */
    repo: Repository["name"];

    /**
     * @title commit hash or branch name
     */
    ref?: string &
      Prerequisite<{
        method: "post";
        path: "/connector/github/get-branches";
        jmesPath: "result[].{value:name, label:name}";
      }>;
  }

  export interface IGetBranchOutput extends ICommonPaginationOutput {
    /**
     * @title branches
     */
    result: IGithub.Branch[];
  }

  export interface IGetBranchInput
    extends StrictOmit<ICommonPaginationInput, "order">,
      ICommon.ISecret<"github", ["repo"]> {
    /**
     * @title user's nickname
     */
    owner: User["login"];

    /**
     * @title The name of the repository
     */
    repo: Repository["name"];
  }

  export interface ICreateBranchOutput {
    /**
     * @title ref
     */
    ref: string & Placeholder<"refs/heads/featureA">;
    object: {
      type: "commit";
      sha: Commit["sha"];
    };
  }

  export interface ICreateBranchInput
    extends ICommon.ISecret<"github", ["repo"]> {
    /**
     * @title user's nickname
     */
    owner: User["login"];

    /**
     * @title The name of the repository
     */
    repo: Repository["name"];

    /**
     * @title ref
     * The name of the fully qualified reference (ie: refs/heads/master). If it doesn't start with 'refs' and have at least two slashes, it will be rejected.
     */
    ref: string;

    /**
     * @title sha
     * The SHA1 value for this reference.
     */
    sha: string &
      Prerequisite<{
        method: "post";
        path: "/connector/github/get-commit-list";
        jmesPath: "result[].{value:sha, label: commit.message}";
      }>;
  }

  export interface IGetOrganizationRepositoryOutput
    extends ICommonPaginationOutput {
    /**
     * @title repositories
     */
    result: IGithub.Repository[];
  }

  export interface IGetOrganizationRepositoryInput extends IGetRepositoryInput {
    /**
     * @title organization
     *
     * This refers to the name of the organization who will look up the repository.
     */
    organization: string;
  }

  export type IGetUserPinnedRepositoryOutput = Repository["name"][];

  export type IGetUserPinnedRepositoryInput = Pick<
    IGetUserRepositoryInput,
    "username" | "secretKey"
  >;

  export interface IGetUserRepositoryOutput extends ICommonPaginationOutput {
    /**
     * @title repositories
     */
    result: IGithub.RepositoryWithReadmeFile[];
  }

  export interface RepositoryWithReadmeFile extends Repository {
    /**
     * @title readme
     */
    readme: IGetReadmeFileContentOutput | null;
  }

  export interface IGetUserRepositoryInput extends IGetRepositoryInput {
    /**
     * @title username
     *
     * This refers to the nickname of the user who will look up the repository.
     */
    username: string &
      Prerequisite<{
        method: "post";
        path: "/connector/github/get-users";
        jmesPath: "items[].{value:login, label:login}";
      }>;
  }

  export interface IGetRepositoryInput
    extends StrictOmit<ICommonPaginationInput, "order" | "per_page">,
      ICommon.ISecret<"github", ["repo"]> {
    /**
     * @title per_page
     * The number of results per page (max 10).
     *
     * The response capacity may be very large because it even comes out with the reedy of the repository.
     * Therefore, it is recommended to check by cutting up to 10 pieces.
     */
    per_page?: number &
      tags.Type<"uint64"> &
      tags.Default<10> &
      tags.Maximum<10>;

    /**
     * @title sorting condition
     *
     * The property to sort the results by.
     * It must be one of: "created" | "updated" | "pushed" | "full_name"
     */
    sort?: ("created" | "updated" | "pushed" | "full_name") &
      tags.Default<"full_name">;

    /**
     * @title direction
     * The order to sort by.
     * Default: asc when using full_name, otherwise desc.
     */
    direction?: ICommonPaginationInput["order"];

    /**
     * @title since
     * Only show repositories updated after the given time. This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.
     */
    since?: string & tags.Format<"date-time">;

    /**
     * @title before
     * Only show repositories updated before the given time. This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.
     */
    before?: string & tags.Format<"date-time">;
  }

  export interface IGetRepositoryIssueOutput extends ICommonPaginationOutput {
    result: IGithub.Issue[];
  }

  export type IUpdatePullRequestOutput = Pick<
    PullRequest,
    "title" | "number" | "id"
  >;

  export interface IUpdatePullRequestInput
    extends PickPartial<ICreatePullRequestInput, "head" | "base"> {
    /**
     * @title pull request number to update
     */
    pull_number: number &
      tags.Type<"uint64"> &
      tags.Minimum<1> &
      (
        | Prerequisite<{
            method: "post";
            path: "/connector/repositories/get-pull-requests";
            jmesPath: "pullRequests[].{value:number, label:title}";
          }>
        | Prerequisite<{
            method: "post";
            path: "/connector/repositories/pull-requests";
            jmesPath: "pullRequests[].{value:number, label:number}";
          }>
      );

    /**
     * @title state
     *
     * State of this Pull Request. Either open or closed.
     * Can be one of: open, closed
     */
    state?:
      | tags.Constant<"open", { title: "open" }>
      | tags.Constant<"closed", { title: "closed" }>;
  }

  export type ICreatePullRequestOutput = Pick<
    PullRequest,
    "title" | "number" | "id"
  >;

  export interface ICreatePullRequestInput
    extends ICommon.ISecret<"github", ["repo"]> {
    /**
     * @title owner's name
     *
     * The owner's name and the repository's name can be combined to form '${owner}/${repo}' and can be a unique path name for a single repository.
     * So the owner here is the nickname of the repository owner, not the name of the person committing or the author.
     */
    owner: User["login"];

    /**
     * @title repository name
     *
     * The owner's name and the repository's name can be combined to form '${owner}/${repo}' and can be a unique path name for a single repository.
     */
    repo: Repository["name"];

    /**
     * @title title
     *
     * The title of the new pull request. Required unless issue is specified.
     */
    title?: string;

    /**
     * @title head
     *
     * The name of the branch where your changes are implemented. For cross-repository pull requests in the same network, namespace head with a user like this: username:branch.
     */
    head: string;

    /**
     * @title head_repo
     *
     * The name of the repository where the changes in the pull request were made. This field is required for cross-repository pull requests if both repositories are owned by the same organization.
     */
    head_repo?: string;

    /**
     * @title base
     *
     * The name of the branch you want the changes pulled into. This should be an existing branch on the current repository. You cannot submit a pull request to one repository that requests a merge to a base of another repository.
     */
    base: string;

    /**
     * @title body
     *
     * The contents of the pull request.
     */
    body?: string;

    /**
     * @title maintainer_can_modify
     *
     * Indicates whether maintainers can modify the pull request.
     */
    maintainer_can_modify?: boolean;

    /**
     * @title draft
     *
     * Indicates whether the pull request is a draft. See "Draft Pull Requests" in the GitHub Help documentation to learn more.
     */
    draft?: boolean;

    /**
     * @title issue
     *
     * An issue in the repository to convert to a pull request. The issue title, body, and comments will become the title, body, and comments on the new pull request. Required unless title is specified.
     */
    issue?: number;
  }

  export interface IFetchRepositoryOutput {
    /**
     * @title issues
     */
    fetchedIssues: StrictOmit<FetchedIssue, "body">[];

    /**
     * @title page info
     */
    pageInfo: {
      /**
       * @title Cursor to be used to look up the next page
       */
      endCursor: string;
      /**
       * @title hasNextPage
       *
       * true if there is a next page
       */
      hasNextPage: boolean;
    };
  }

  export interface FetchedIssue
    extends Pick<Issue, "number" | "title" | "body"> {
    /**
     * @title issue id
     */
    id: string;

    /**
     * @title issue state
     */
    state: IFetchRepositoryInput["state"];

    /**
     * @title reason of state
     */
    stateReason?: string | null;

    /**
     * @title issue title
     */
    title: string;

    /**
     * @title comments
     */
    comments: {
      /**
       * @title total count of comments
       */
      totalCount: number & tags.Minimum<0>;
    };

    /**
     * @title reactions
     */
    reactions: {
      /**
       * @title total count of reactions
       */
      totalCount: number & tags.Minimum<0>;
    };

    /**
     * @title labels
     */
    labels: {
      nodes: Pick<Label, "name" | "description">[];
    };

    /**
     * @title assignees
     */
    assignees: {
      nodes: Pick<User, "login">[];
    };

    /**
     * @title author
     */
    author: Pick<User, "login">;

    /**
     * @title createdAt
     */
    createdAt: string & tags.Format<"date-time">;

    /**
     * @title updatedAt
     */
    updatedAt: string & tags.Format<"date-time">;
  }

  export interface IFetchRepositoryPullRequestOutput {
    pullRequests: FetchedPullRequest[];

    /**
     * @title page info
     */
    pageInfo: {
      /**
       * @title Cursor to be used to look up the next page
       */
      endCursor: string;
      /**
       * @title hasNextPage
       *
       * true if there is a next page
       */
      hasNextPage: boolean;
    };
  }

  export interface FetchedPullRequest {
    /**
     * @title issue id
     */
    id: string;

    /**
     * @title issue state
     */
    state: IFetchRepositoryInput["state"];

    /**
     * @title number of pull request
     */
    number: PullRequest["number"];

    /**
     * @title Pull request title
     */
    title: string;

    /**
     * @title comments
     */
    comments: {
      /**
       * @title total count of comments
       */
      totalCount: number & tags.Minimum<0>;
    };

    /**
     * @title reviews
     */
    reviews: {
      /**
       * @title total counr of reviews
       */
      totalCount: number & tags.Minimum<0>;
    };

    /**
     * @title reactions
     */
    reactions: {
      /**
       * @title total count of reactions
       */
      totalCount: number & tags.Minimum<0>;
    };

    /**
     * @title labels
     */
    labels: {
      nodes: Pick<Label, "name" | "description">[];
    };

    /**
     * @title assignees
     */
    assignees: {
      nodes: Pick<User, "login">[];
    };

    /**
     * @title author
     */
    author: Pick<User, "login">;

    /**
     * @title createdAt
     */
    createdAt: string & tags.Format<"date-time">;

    /**
     * @title updatedAt
     */
    updatedAt: string & tags.Format<"date-time">;
  }

  export interface IFetchRepositoryPullRequestInput
    extends Pick<
      IFetchRepositoryInput,
      | "secretKey"
      | "owner"
      | "repo"
      | "per_page"
      | "after"
      | "state"
      | "labels"
      | "direction"
    > {
    /**
     * @title sort
     * It must be one of: "CREATED_AT", "UPDATED_AT".
     */
    sort:
      | tags.Constant<"CREATED_AT", { title: "CREATED_AT" }>
      | tags.Constant<"UPDATED_AT", { title: "UPDATED_AT" }>;
  }

  export type IGetIssueDetailOutput = DetailedIssue;

  export interface DetailedIssue extends IGithub.Issue {
    /**
     * @title milestone
     */
    milestone: MileStone | null;

    /**
     * @title reactions
     */
    reactions: {
      /**
       * @title total_count
       */
      total_count: number & tags.Type<"uint64">;

      /**
       * @title "+1"
       */
      "+1": number & tags.Type<"uint64">;

      /**
       * @title "-1"
       */
      "-1": number & tags.Type<"uint64">;

      /**
       * @title laugh
       */
      laugh: number & tags.Type<"uint64">;

      /**
       * @title hooray
       */
      hooray: number & tags.Type<"uint64">;

      /**
       * @title confused
       */
      confused: number & tags.Type<"uint64">;

      /**
       * @title heart
       */
      heart: number & tags.Type<"uint64">;

      /**
       * @title rocket
       */
      rocket: number & tags.Type<"uint64">;

      /**
       * @title eyes
       */
      eyes: number & tags.Type<"uint64">;
    };

    /**
     * @title closed_by
     */
    closed_by?: Pick<User, "id" | "login" | "type"> | null;
  }

  export interface IGetIssueDetailInput extends ICommon.ISecret<"github"> {
    /**
     * @title issue number to get detailed info
     */
    issue_number: Issue["number"] &
      Prerequisite<{
        method: "post";
        path: "/connector/github/repositories/get-issues";
        jmesPath: "fetchedIssues[].{value:number, label:title}";
      }>;

    /**
     * @title owner's name
     *
     * The owner's name and the repository's name can be combined to form '${owner}/${repo}' and can be a unique path name for a single repository.
     * So the owner here is the nickname of the repository owner, not the name of the person committing or the author.
     */
    owner: User["login"];

    /**
     * @title repository name
     *
     * The owner's name and the repository's name can be combined to form '${owner}/${repo}' and can be a unique path name for a single repository.
     */
    repo: Repository["name"];
  }

  export interface IFetchRepositoryInput extends ICommon.ISecret<"github"> {
    /**
     * @title after
     * cursor of next page
     */
    after?: string;

    /**
     * @title labels
     * If you want to filter the issue by label, pass the string.
     * If it is an empty array, it is ignored.
     */
    labels?: Label["name"][];

    per_page: ICommonPaginationInput["per_page"];

    /**
     * @title state
     *
     * If you don't want to filter, you don't put anything in.
     * It must be one of: "OPEN", "CLOSED", "MERGED".
     */
    state?:
      | tags.Constant<"OPEN", { title: "OPEN" }>
      | tags.Constant<"CLOSED", { title: "CLOSED" }>
      | tags.Constant<"MERGED", { title: "MERGED" }>;

    /**
     * @title direction
     * It must be one of: "ASC", "DESC".
     */
    direction:
      | tags.Constant<"ASC", { title: "ASC" }>
      | tags.Constant<"DESC", { title: "DESC" }>;

    /**
     * @title condition of direction
     * It must be one of: "CREATED_AT", "UPDATED_AT", "COMMENTS".
     */
    sort:
      | tags.Constant<"CREATED_AT", { title: "CREATED_AT" }>
      | tags.Constant<"UPDATED_AT", { title: "UPDATED_AT" }>
      | tags.Constant<"COMMENTS", { title: "COMMENTS" }>;

    /**
     * @title owner's name
     *
     * The owner's name and the repository's name can be combined to form '${owner}/${repo}' and can be a unique path name for a single repository.
     * So the owner here is the nickname of the repository owner, not the name of the person committing or the author.
     */
    owner: User["login"];

    /**
     * @title repository name
     *
     * The owner's name and the repository's name can be combined to form '${owner}/${repo}' and can be a unique path name for a single repository.
     */
    repo: Repository["name"];
  }

  export interface IGetRepositoryIssueInput
    extends StrictOmit<
      IGetAuthenticatedUserIssueInput,
      "filter" | "owned" | "pulls"
    > {
    /**
     * @title owner's name
     *
     * The owner's name and the repository's name can be combined to form '${owner}/${repo}' and can be a unique path name for a single repository.
     * So the owner here is the nickname of the repository owner, not the name of the person committing or the author.
     */
    owner: User["login"];

    /**
     * @title repository name
     *
     * The owner's name and the repository's name can be combined to form '${owner}/${repo}' and can be a unique path name for a single repository.
     */
    repo: Repository["name"];
  }

  export interface IGetOrganizationAuthenticationUserIssueOutput
    extends ICommonPaginationOutput {
    result: IGithub.Issue[];
  }

  export interface IGetOrganizationAuthenticationUserIssueInput
    extends IGetAuthenticatedUserIssueInput {
    /**
     * @title organization
     * The organization name. The name is not case sensitive.
     */
    organization: string;
  }

  export interface IGetAuthenticatedUserIssueOutput
    extends ICommonPaginationOutput {
    result: IGithub.Issue[];
  }

  export interface IGetAuthenticatedUserIssueInput
    extends ICommon.ISecret<"github", ["user", "repo"]>,
      Pick<ICommonPaginationInput, "page" | "per_page"> {
    /**
     * @title direction
     * The order to sort by.
     * Default: asc when using full_name, otherwise desc.
     */
    direction?: ICommonPaginationInput["order"];

    /**
     * @title filter
     *
     * It must be one of: "assigned", "created", "mentioned", "subscribed", "repos", "all"
     *
     * Indicates which sorts of issues to return.
     * assigned means issues assigned to you.
     * created means issues created by you.
     * mentioned means issues mentioning you.
     * subscribed means issues you're subscribed to updates for.
     * all or repos means all issues you can see, regardless of participation or creation.
     */
    filter?: (
      | tags.Constant<
          "assigned",
          {
            title: "assigned";
            description: "Indicates which sorts of issues to return.";
          }
        >
      | tags.Constant<
          "created",
          {
            title: "created";
            description: "assigned means issues assigned to you.";
          }
        >
      | tags.Constant<
          "mentioned",
          {
            title: "mentioned";
            description: "created means issues created by you.";
          }
        >
      | tags.Constant<
          "subscribed",
          {
            title: "subscribed";
            description: "mentioned means issues mentioning you.";
          }
        >
      | tags.Constant<
          "repos",
          {
            title: "repos";
            description: "subscribed means issues you're subscribed to updates for.";
          }
        >
      | tags.Constant<
          "all",
          {
            title: "all";
            description: "all or repos means all issues you can see, regardless of participation or creation.";
          }
        >
    ) &
      tags.Default<"assigned">;

    /**
     * @title state
     *
     * Indicates the state of the issues to return.
     * It must be one of: 'open', 'closed', 'all'
     */
    state?: (
      | tags.Constant<"open", { title: "open" }>
      | tags.Constant<"closed", { title: "closed" }>
      | tags.Constant<"all", { title: "all" }>
    ) &
      tags.Default<"open">;

    /**
     * @title label
     *
     * A list of comma separated label names. Example: `bug,ui,@high`
     */
    labels?: string;

    /**
     * @title sort
     * It must be 'created', 'updated', 'comments'
     */
    sort?: (
      | tags.Constant<"created", { title: "created" }>
      | tags.Constant<"updated", { title: "updated" }>
      | tags.Constant<"comments", { title: "comments" }>
    ) &
      tags.Default<"created">;

    /**
     * @title owned
     */
    owned?: boolean;

    /**
     * @title pulls
     */
    pulls?: boolean;
  }

  export interface IGetUserProfileOutput
    extends Pick<User, "id" | "login" | "avatar_url" | "type"> {
    /**
     * @title name
     * It means the actual name that the user has written, not the user's nickname.
     */
    name?: string | null;

    /**
     * @title comany name
     *
     * As the name of the company,
     * it cannot be said to be the exact name listed as the business operator because it was written by the user himself.
     * Also, we cannot guarantee that the user wrote the company name.
     * Sometimes the user jokingly writes down strange names.
     */
    company?: string | null;

    /**
     * @title blog
     *
     * Indicates the blog address.
     */
    blog?: string | null;

    /**
     * @title location
     *
     * It means the location of the user.
     * Usually, I write the country down, but the user can jokingly record the strange location.
     */
    location?: string | null;

    /**
     * @title email address
     */
    email?: string | null;

    /**
     * @title bio
     *
     * Write down what the user wants to say or a history.
     */
    bio?: string | null;

    /**
     * @title twitter_username
     */
    twitter_username?: string | null;

    /**
     * @title count of public repos
     */
    public_repos: number & tags.Type<"uint64">;

    /**
     * @title count of public gists
     */
    public_gists: number & tags.Type<"uint64">;

    /**
     * @title count of followers
     */
    followers: number & tags.Type<"uint64">;

    /**
     * @title count of follwing
     */
    following: number & tags.Type<"uint64">;

    /**
     * @title created_at
     */
    created_at: string & tags.Format<"date-time">;

    /**
     * @title updated_at
     */
    updated_at: string & tags.Format<"date-time">;

    /**
     * @title profile_repo
     */
    profile_repository: IGithub.ProfileRepository | null;

    /**
     * @title pinned_repositories
     * It is a repository where the user puts a pin on his profile, which is usually used to display his or her proud history.
     */
    pinned_repositories: IGithub.IGetUserPinnedRepositoryOutput;
  }

  export interface IGetUserProfileInput extends ICommon.ISecret<"github"> {
    /**
     * @title username
     */
    username: string;
  }

  export interface ISearchUserOutput extends ICommonPaginationOutput {
    /**
     * @title User Search Result Item
     *
     * User Search Result Item
     */
    result: IGithub.User[];
  }

  export interface ISearchUserInput
    extends ICommonPaginationInput,
      ICommon.ISecret<"github"> {
    /**
     * @title keyword
     *
     * The query contains one or more search keywords and qualifiers.
     * Qualifiers allow you to limit your search to specific areas of GitHub.
     * The REST API supports the same qualifiers as the web interface for GitHub.
     */
    q: string;

    /**
     * @title sorting condition
     *
     * Sorts the results of your query by number of followers or repositories, or when the person joined GitHub. Default: best match
     * It must be one of this: "followers" | "repositories" | "joined"
     */
    sort?: "followers" | "repositories" | "joined";
  }

  export type User = {
    /**
     * @title login
     *
     * This means the user's nickname.
     * In github, nicknames are unique at least until that user changes their own nickname.
     * This means that only one person can own the nickname at a time.
     * Therefore, it may be important to know the exact nickname because the github API calls the appi using the user's nickname.
     */
    login: string;

    /**
     * @title id
     *
     * This means the user's ID.
     */
    id: number;

    /**
     * @title avatar url
     *
     * This means the user's profile image.
     */
    avatar_url: string & tags.Format<"uri">;

    /**
     * @title html_url
     *
     * If you want to look up your profile, you can access this website.
     */
    html_url: string & tags.Format<"uri">;

    /**
     * @title type
     */
    type: "User" | "Bot" | "Organization";

    /**
     * @title score
     */
    score: number;
  };

  export type Repository = {
    /**
     * @title id
     */
    id: number;

    /**
     * @title name
     */
    name: string;

    /**
     * @title full_name
     *
     * This is in the form '{username}/{reponame}'.
     */
    full_name: string;

    /**
     * @title private
     */
    private: boolean;

    /**
     * @title html_url
     */
    html_url: string & tags.Format<"uri">;

    /**
     * @title description
     */
    description: string | null;

    /**
     * @title fork
     */
    fork: boolean;

    /**
     * @title forks_count
     */
    forks_count: number & tags.Type<"uint64">;

    /**
     * @title stargazers_count
     */
    stargazers_count: number & tags.Type<"uint64">;

    /**
     * @title watchers_count
     */
    watchers_count: number & tags.Type<"uint64">;

    /**
     * @title size
     */
    size: number;

    /**
     * @title default_branch
     */
    default_branch: string;

    /**
     * @title open_issues_count
     */
    open_issues_count: number & tags.Type<"uint64">;

    /**
     * @title is_template
     */
    is_template: boolean;

    /**
     * @title topics
     */
    topics: string[];

    /**
     * @title has_issues
     */
    has_issues: boolean;

    /**
     * @title has_projects
     */
    has_projects: boolean;

    /**
     * @title has_wiki
     */
    has_wiki: boolean;

    /**
     * @title has_pages
     */
    has_pages: boolean;

    /**
     * @title has_downloads
     */
    has_downloads: boolean;

    /**
     * @title archived
     */
    archived: boolean;

    /**
     * @title disabled
     */
    disabled: boolean;

    /**
     * @title visibility
     */
    visibility: "public" | "private";

    /**
     * @title pushed_at
     */
    pushed_at: string & tags.Format<"date-time">;

    /**
     * @title created_at
     */
    created_at: string & tags.Format<"date-time">;

    /**
     * @title updated_at
     */
    updated_at: string & tags.Format<"date-time">;

    permissions?: {
      /**
       * @title admin
       */
      admin: boolean;

      /**
       * @title push
       */
      push: boolean;

      /**
       * @title pull
       */
      pull: boolean;
    };

    /**
     * @title allow_rebase_merge
     */
    allow_rebase_merge?: boolean;

    /**
     * @title allow_squash_merge
     */
    allow_squash_merge?: boolean;

    /**
     * @title allow_auto_merge
     */
    allow_auto_merge?: boolean;

    /**
     * @title delete_branch_on_merge
     */
    delete_branch_on_merge?: boolean;

    /**
     * @title allow_merge_commit
     */
    allow_merge_commit?: boolean;

    /**
     * @title subscribers_count
     */
    subscribers_count?: number & tags.Type<"uint64">;

    /**
     * @title network_count
     */
    network_count?: number & tags.Type<"uint64">;

    license: null | {
      /**
       * @title key
       */
      key: string & Placeholder<"mit">;

      /**
       * @title name
       */
      name: string & Placeholder<"MIT License">;

      /**
       * @title url
       */
      url: (string & Placeholder<"https://api.github.com/licenses/mit">) | null;

      /**
       * @title spdx_id
       */
      spdx_id: string & Placeholder<"MIT">;
    };

    /**
     * @title forks
     */
    forks: number & tags.Type<"uint64">;

    /**
     * @title open_issues
     */
    open_issues: number & tags.Type<"uint64">;

    /**
     * @title watchers
     */
    watchers: number & tags.Type<"uint64">;
  };

  export type Branch = {
    /**
     * @title name of Branch
     */
    name: string;

    /**
     * @title commit
     *
     * In github, branch is just another name for the last node of a commit,
     * so this property called commit is logically the same as what it means for that branch.
     */
    commit: StrictOmit<IGithub.Commit, "sha">;
  };

  export type Commit = {
    /**
     * @title hash of this commit
     */
    sha: string;

    /**
     * @title uri
     *
     * uri to look up details of commitment
     */
    url: string & tags.Format<"uri">;

    /**
     * @title author
     */
    author: {
      name: string;
      email: string;
      date: string & tags.Format<"date-time">;
    };

    /**
     * @title committer
     */
    committer: {
      name: string;
      email: string;
      date: string & tags.Format<"date-time">;
    };

    /**
     * @title commit message
     */
    message: string;

    tree: {
      sha: string;
      url: string & tags.Format<"uri">;
    };

    comment_count: number & tags.Type<"uint64">;
  };

  export type Activity = {
    /**
     * @title id
     */
    id: number;

    /**
     * @title ref
     */
    ref: string & Placeholder<"refs/heads/main">;

    /**
     * @title timestamp
     */
    timestamp: string & tags.Format<"date-time">;

    /**
     * @title activity type
     */
    activity_type:
      | tags.Constant<"push", { title: "push" }>
      | tags.Constant<"force_push", { title: "force_push" }>
      | tags.Constant<"branch_creation", { title: "branch_creation" }>
      | tags.Constant<"branch_deletion", { title: "branch_deletion" }>
      | tags.Constant<"pr_merge", { title: "pr_merge" }>
      | tags.Constant<"merge_queue_merge", { title: "merge_queue_merge" }>;

    /**
     * @title actor
     */
    actor: Pick<User, "id" | "login" | "avatar_url" | "type">;
  };

  export type Organization = {
    /**
     * @title id
     */
    id: number;

    /**
     * @title login
     */
    login: string;

    /**
     * @title display_login
     */
    display_login?: string;

    /**
     * @title description
     */
    description?: string;
  };

  export type Issue = {
    id: number & tags.Type<"uint64">;

    /**
     * @title html_url
     *
     * If you want to see the issue or pull_request on the web, you can go to this link.
     * If pull is included on this link path, it is pull_request, and if issue is included, it is issue.
     * In essence, pull_request and issue are numbered together from the beginning, so while this connector does not distinguish the two, it can be distinguished by the url path.
     */
    html_url: string & tags.Format<"uri">;

    /**
     * @title issue number
     *
     * Number uniquely identifying the issue within its repository
     */
    number: number & tags.Type<"uint64">;

    /**
     * @title state
     *
     * State of the issue; either 'open' or 'closed'
     */
    state: string;

    /**
     * The reason for the current state
     */
    state_reason?: "completed" | "reopened" | "not_planned" | null;

    /**
     * Title of the issue
     */
    title: string;

    /**
     * @title user
     */
    user: Pick<IGithub.User, "id" | "login" | "type">;

    /**
     * @title body
     *
     * Contents of the issue
     *
     * You can also render this content because it is in a markdown format.
     */
    body?: string | null;

    /**
     * @title labels
     *
     * Labels to associate with this issue; pass one or more label names to replace the set of labels on this issue; send an empty array to clear all labels from the issue; note that the labels are silently dropped for users without push access to the repository
     */
    labels: (
      | string
      | {
          id?: number & tags.Type<"uint64">;
          url?: string & tags.Format<"uri">;
          name?: string;
          description?: string | null;
          color?: string | null;
          default?: boolean;
        }
    )[];

    /**
     * @title assignee
     */
    assignee: Pick<IGithub.User, "login"> | null;

    /**
     * @title assignees
     *
     * If there are many people in charge, you can be included in the array.
     */
    assignees?: Pick<IGithub.User, "login">[] | null;
  };

  export type Milestone = {
    id: number & tags.Type<"uint64">;
    number: number & tags.Type<"uint64">;

    /**
     * The title of the milestone.
     */
    title: string;
    description: string | null;
    creator: Pick<IGithub.User, "id" | "login" | "type">;
    open_issues: number & tags.Type<"uint64">;
    closed_issues: number & tags.Type<"uint64">;
    created_at: string & tags.Format<"date-time">;
    updated_at: string & tags.Format<"date-time">;
    closed_at: (string & tags.Format<"date-time">) | null;
    due_on: (string & tags.Format<"date-time">) | null;
  };

  export interface PullRequest extends IGithub.Issue {
    /**
     * @title number of this pull request
     */
    number: number & tags.Type<"uint64">;

    /**
     * @title milestone
     */
    milestone: MileStone | null;

    /**
     * @title head branch info
     */
    head: {
      /**
       * @title label
       */
      label: string;

      /**
       * @title ref
       */
      ref: string;

      /**
       * @title sha
       */
      sha: string;

      /**
       * @title user
       */
      user: Pick<IGithub.User, "id" | "login" | "type">;

      /**
       * @title repo
       */
      repo: Pick<Repository, "full_name"> | null;
    };

    /**
     * @title base branch info
     */
    base: {
      /**
       * @title label
       */
      label: string;

      /**
       * @title ref
       */
      ref: string;

      /**
       * @title sha
       */
      sha: string;

      /**
       * @title user
       */
      user: Pick<IGithub.User, "id" | "login" | "type">;

      /**
       * @title repo
       */
      repo: Pick<Repository, "full_name"> | null;
    };

    /**
     * @title author_association
     */
    author_association:
      | "COLLABORATOR"
      | "CONTRIBUTOR"
      | "FIRST_TIMER"
      | "FIRST_TIME_CONTRIBUTOR"
      | "MANNEQUIN"
      | "MEMBER"
      | "NONE"
      | "OWNER";

    /**
     * @title draft
     *
     * Indicates whether or not the pull request is a draft.
     */
    draft?: boolean;

    /**
     * @title requested_reviewers
     */
    requested_reviewers: Pick<User, "login" | "id" | "type">[];

    /**
     * @title requested_teams
     */
    requested_teams: Partial<Team>[]; // 타입이 정확히 뭐인지 파악이 안 된 상태

    /**
     * @title auto_merge
     */
    auto_merge: any;

    /**
     * @title merged
     */
    merged?: boolean;

    /**
     * @title mergeable
     */
    mergeable: boolean | null;

    /**
     * @title rebaseable
     */
    rebaseable: boolean | null;

    /**
     * @title mergeable_state
     */
    mergeable_state: string;

    /**
     * @title merged_by
     */
    merged_by: Pick<User, "login" | "id" | "type"> | null;

    /**
     * @title maintainer_can_modify
     */
    maintainer_can_modify: boolean;

    /**
     * @title comments
     */
    comments: number & tags.Type<"uint64"> & tags.Minimum<0>;

    /**
     * @title review_comments
     */
    review_comments: number & tags.Type<"uint64"> & tags.Minimum<0>;

    /**
     * @title commits
     */
    commits: number & tags.Type<"uint64"> & tags.Minimum<0>;

    /**
     * @title additions
     */
    additions: number & tags.Type<"uint64"> & tags.Minimum<0>;

    /**
     * @title deletions
     */
    deletions: number & tags.Type<"uint64"> & tags.Minimum<0>;

    /**
     * @title changed_files
     */
    changed_files: number & tags.Type<"uint64"> & tags.Minimum<0>;

    /**
     * @title locked
     */
    locked: boolean;

    /**
     * @title created_at
     */
    created_at: string & tags.Format<"date-time">;

    /**
     * @title updated_at
     */
    updated_at: string & tags.Format<"date-time">;

    /**
     * @title closed_at
     */
    closed_at: (string & tags.Format<"date-time">) | null;

    /**
     * @title merged_at
     */
    merged_at: (string & tags.Format<"date-time">) | null;
  }

  // 타입이 정확히 뭐인지 파악이 안 된 상태
  export type Team = {
    /**
     * @title id
     */
    id: number;

    /**
     * @title name
     */
    name: string;

    /**
     * @title slug
     */
    slug: string;

    /**
     * @title description
     */
    description: string;

    /**
     * @title privacy
     */
    privacy: "open" | "closed";

    /**
     * @title notification_setting
     */
    notification_setting: string;

    /**
     * @title permission
     */
    permission: string;
  };

  export interface Payload {
    /**
     * @title action
     *
     * It means what this event means.
     * Although the type of event usually has a resource or the name of the event,
     * it is necessary to view it with this property because it does not specify what actions occurred in that event are modified, deleted, created, etc.
     */
    action?: string;

    /**
     * @title issue
     *
     * If it is an event for an issue, contain the issue information.
     */
    issue?: IGithub.Issue;

    /**
     * @title comment
     *
     * If it is an event for an comment, contain the comment information.
     */
    comment?: IGithub.Comment;
  }

  export interface Comment {
    id: number & tags.Type<"uint64">;
    body?: string;
    user: Pick<IGithub.User, "id" | "login" | "type">;
    created_at: string & tags.Format<"date-time">;
    updated_at: string & tags.Format<"date-time">;
    pages?: IGithub.Page[];
  }

  export interface Page {
    page_name?: string;
    title?: string;
    summary?: string | null;
    action?: string;
    sha?: string;
    html_url?: string;
  }

  export interface File {
    /**
     * @title hash of this file
     */
    sha: string;

    /**
     * @title filename
     */
    filename: string;

    /**
     * @title status of file in this commit
     */
    status:
      | "added"
      | "removed"
      | "modified"
      | "renamed"
      | "copied"
      | "changed"
      | "unchanged";

    /**
     * @title additions
     */
    additions: number & tags.Type<"uint64">;

    /**
     * @title deletions
     */
    deletions: number & tags.Type<"uint64">;

    /**
     * @title changes
     */
    changes: number & tags.Type<"uint64">;

    /**
     * @title blob_url
     *
     * This is the path through which you can view the file through the github website.
     */
    blob_url: string & tags.Format<"uri">;

    /**
     * @title raw_url
     *
     * The API path through which the contents of the file can be viewed.
     */
    raw_url: string & tags.Format<"uri">;

    /**
     * @title patch
     *
     * It means how much it has changed compared to previous commitments.
     * It gives you a text form to see what code has actually changed.
     */
    patch?: string;
  }

  export interface UploadFileInput {
    files: Pick<IGithub.RepositoryFile, "path" | "content">[];
    key: string;
  }

  export type ProfileRepository =
    | (IGithub.Repository & { readme: IGithub.IGetReadmeFileContentOutput })
    | null;
}
