import { tags } from "typia";
import { ICommon } from "../common/ISecretValue";

export namespace IReddit {
  export type Secret = ICommon.ISecret<"reddit", []>;

  export interface IGetHotPostsInput extends IReddit.Secret {
    subreddit: string & tags.Format<"iri">;
    limit: number & tags.Type<"int32"> & tags.Minimum<1>;
  }

  export interface IGetHotPostsOutput {
    posts: Array<{
      title: string;
      url: string;
      score: number;
    }>;
  }

  export interface IGetNewPostsInput extends IReddit.Secret {
    subreddit: string & tags.Format<"iri">;
    limit?: number & tags.Type<"int32"> & tags.Minimum<1>;
  }

  export interface IGetNewPostsOutput {
    posts: Array<{
      title: string;
      url: string;
      created_utc: number;
    }>;
  }

  export interface IGetTopPostsInput extends IReddit.Secret {
    subreddit: string & tags.Format<"iri">;
    limit?: number & tags.Type<"int32"> & tags.Minimum<1>;
    time_filter?: "all" | "day" | "hour" | "month" | "week" | "year";
  }

  export interface IGetTopPostsOutput {
    posts: Array<{
      title: string;
      url: string;
      score: number;
    }>;
  }

  export interface IVoteInput extends IReddit.Secret {
    id: string & tags.Format<"iri">; // 게시물 또는 댓글의 ID
    dir: number & tags.Type<"int32"> & tags.Minimum<-1> & tags.Maximum<1>; // 투표 방향: 1(upvote), 0(no vote), -1(downvote)
  }

  export interface IVoteOutput {
    success: boolean;
    message?: string;
  }

  export interface IGetCommentsInput extends IReddit.Secret {
    subreddit: string & tags.Format<"iri">;
    article: string & tags.Format<"iri">;
  }

  export interface IGetCommentsOutput {
    post: {
      title: string;
      content: string;
      author: string;
      created_utc: number;
    };
    comments: Array<{
      author: string;
      content: string;
      created_utc: number;
    }>;
  }

  export interface IGetUserAboutInput extends IReddit.Secret {
    username: string & tags.Format<"iri">;
  }

  export interface IGetUserAboutOutput {
    name: string;
    karma: number;
    created_utc: number;
  }

  export interface IGetUserSubmittedInput extends IReddit.Secret {
    username: string & tags.Format<"iri">;
    limit?: number & tags.Type<"int32"> & tags.Minimum<1>;
  }

  export interface IGetUserSubmittedOutput {
    posts: Array<{
      title: string;
      url: string;
      score: number;
    }>;
  }

  export interface IGetUserCommentsInput extends IReddit.Secret {
    username: string & tags.Format<"iri">;
    limit?: number & tags.Type<"int32"> & tags.Minimum<1>;
  }

  export interface IGetUserCommentsOutput {
    comments: Array<{
      content: string;
      post_title: string;
      created_utc: number;
    }>;
  }

  export interface ISearchSubredditsInput extends IReddit.Secret {
    query: string;
    limit?: number & tags.Type<"int32"> & tags.Minimum<1>;
  }

  export interface ISearchSubredditsOutput {
    subreddits: Array<{
      name: string;
      description: string;
      subscribers: number;
    }>;
  }

  export interface IGetSubredditAboutInput extends IReddit.Secret {
    subreddit: string & tags.Format<"iri">;
  }

  export interface IGetSubredditAboutOutput {
    name: string;
    description: string;
    subscribers: number;
    rules: string[];
  }

  export interface IGetPopularSubredditsOutput {
    subreddits: Array<{
      name: string;
      subscribers: number;
    }>;
  }

  export interface IGetBestContentInput extends IReddit.Secret {
    /**
     * fullname of a thing
     *
     * @title after
     */
    after?: string;

    /**
     * fullname of a thing
     *
     * @title before
     */
    before?: string;

    /**
     * a positive integer
     *
     * @title count
     */
    count?: number & tags.Type<"int32"> & tags.Minimum<0>;

    /**
     * max number of items
     *
     * @title limit
     */
    limit?: number & tags.Type<"int32"> & tags.Minimum<1> & tags.Maximum<100>;

    /**
     * optional
     *
     * @title show
     */
    show?: "all";

    /**
     * optional, expand subreddits
     *
     * @title sr_detail
     */
    sr_detail?: boolean;
  }

  export interface IGetBestContentOutput {
    posts: Array<{
      title: string;
      url: string;
      score: number;
    }>;
  }

  export interface IGetAllTopContentOutput {
    posts: Array<{
      title: string;
      url: string;
      score: number;
    }>;
  }

  export interface ISavePostInput extends IReddit.Secret {
    id: string & tags.Format<"iri">; // 저장할 게시물의 ID
  }

  export interface ISavePostOutput {
    success: boolean;
    message?: string;
  }

  export interface IUnsavePostInput extends IReddit.Secret {
    id: string & tags.Format<"iri">; // 삭제할 저장된 게시물의 ID
  }

  export interface IUnsavePostOutput {
    success: boolean;
    message?: string;
  }
}
