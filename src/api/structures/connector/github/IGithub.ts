import { Placeholder, Prerequisite } from "@wrtnio/decorators";
import { tags } from "typia";
import { StrictOmit } from "../../../../utils/strictOmit";
import { ICommon } from "../common/ISecretValue";

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
  };

  export type IGetReadmeFileContentOutput = RepositoryFile;

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
    path?: string;

    /**
     * @title branch name
     */
    branch?: Branch["name"];
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

  export type IGetPullRequestOutput = PullRequest[];

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
    commit_sha: string;
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
      type: string | null;

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
    extends ICommonPaginationInput,
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

  export interface IGetFolloweeInput
    extends ICommonPaginationInput,
      ICommon.ISecret<"github", ["user"]> {
    /**
     * @title user's nickname
     */
    username: User["login"];
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
    ref: string;
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

  export interface IGetUserRepositoryOutput extends ICommonPaginationOutput {
    /**
     * @title repositories
     */
    result: IGithub.Repository[];
  }

  export interface IGetUserRepositoryInput
    extends StrictOmit<ICommonPaginationInput, "order">,
      ICommon.ISecret<"github", ["repo"]> {
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

  export interface IGetUserProfileOutput
    extends Pick<User, "id" | "login" | "avatar_url" | "type"> {
    /**
     * @title name
     * It means the actual name that the user has written, not the user's nickname.
     */
    name: string;

    /**
     * @title comany name
     *
     * As the name of the company,
     * it cannot be said to be the exact name listed as the business operator because it was written by the user himself.
     * Also, we cannot guarantee that the user wrote the company name.
     * Sometimes the user jokingly writes down strange names.
     */
    company: string | null;

    /**
     * @title blog
     *
     * Indicates the blog address.
     */
    blog: string | null;

    /**
     * @title location
     *
     * It means the location of the user.
     * Usually, I write the country down, but the user can jokingly record the strange location.
     */
    location: string | null;

    /**
     * @title email address
     */
    email: string | null;

    /**
     * @title bio
     *
     * Write down what the user wants to say or a history.
     */
    bio: string | null;

    /**
     * @title twitter_username
     */
    twitter_username: string | null;

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
    type: "User" | "Bot";

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
      email: string & tags.Format<"email">;
      date: string & tags.Format<"date-time">;
    };

    /**
     * @title committer
     */
    committer: {
      name: string;
      email: string & tags.Format<"email">;
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
  };

  export type Issue = {
    id: number & tags.Type<"uint64">;
    url: string & tags.Format<"uri">;

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
     * Contents of the issue
     */
    body?: string | null;

    /**
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

    assignee: Pick<IGithub.User, "id" | "login" | "type"> | null;
    assignees?: Pick<IGithub.User, "id" | "login" | "type">[] | null;
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
    head: {
      label: string;
      ref: string;
      sha: string;
      user: Pick<IGithub.User, "id" | "login" | "type">;
    };
    base: {
      label: string;
      ref: string;
      sha: string;
      user: Pick<IGithub.User, "id" | "login" | "type">;
    };
    merged_at: (string & tags.Format<"date-time">) | null;
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
  }

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
}
