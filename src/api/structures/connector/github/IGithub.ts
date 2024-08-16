import { tags } from "typia";
import { StrictOmit } from "../../../../utils/strictOmit";
import { Placeholder, Prerequisite } from "@wrtnio/decorators";
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
      total: number & tags.Type<"uint32">;

      /**
       * @title lines of additions
       */
      additions: number & tags.Type<"uint32">;

      /**
       * @title lines of deletions
       */
      deletions: number & tags.Type<"uint32">;
    };

    /**
     * @title files
     *
     * You can see the changes for each file.
     */
    files: {
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
      additions: number & tags.Type<"uint32">;

      /**
       * @title deletions
       */
      deletions: number & tags.Type<"uint32">;

      /**
       * @title changes
       */
      changes: number & tags.Type<"uint32">;

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
      patch: string;
    }[];
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
    blog: (string & tags.Format<"uri">) | "" | null;

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
    public_repos: number & tags.Type<"uint32">;

    /**
     * @title count of public gists
     */
    public_gists: number & tags.Type<"uint32">;

    /**
     * @title count of followers
     */
    followers: number & tags.Type<"uint32">;

    /**
     * @title count of follwing
     */
    following: number & tags.Type<"uint32">;

    /**
     * @title created_at
     */
    created_at: string & tags.Format<"date-time">;

    /**
     * @title updated_at
     */
    updated_at: string & tags.Format<"date-time">;
  }

  export interface IGetUserProfileInput {
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

  export interface ISearchUserInput extends ICommonPaginationInput {
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
    type: "User";

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
    forks_count: number & tags.Type<"uint32">;

    /**
     * @title stargazers_count
     */
    stargazers_count: number & tags.Type<"uint32">;

    /**
     * @title watchers_count
     */
    watchers_count: number & tags.Type<"uint32">;

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
    open_issues_count: number & tags.Type<"uint32">;

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
    subscribers_count?: number & tags.Type<"uint32">;

    /**
     * @title network_count
     */
    network_count?: number & tags.Type<"uint32">;

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
    forks: number & tags.Type<"uint32">;

    /**
     * @title open_issues
     */
    open_issues: number & tags.Type<"uint32">;

    /**
     * @title watchers
     */
    watchers: number & tags.Type<"uint32">;
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
    commit: Pick<IGithub.Commit, "sha" | "url">;
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

    comment_count: number & tags.Type<"uint32">;
  };
}
