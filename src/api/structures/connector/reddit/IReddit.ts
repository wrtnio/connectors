import { tags } from "typia";

export namespace IReddit {
  export interface IGetHotPostsInput {
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

  export interface IGetNewPostsInput {
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

  export interface IGetTopPostsInput {
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

  export interface IVoteInput {
    id: string & tags.Format<"iri">; // 게시물 또는 댓글의 ID
    dir: number & tags.Type<"int32"> & tags.Minimum<-1> & tags.Maximum<1>; // 투표 방향: 1(upvote), 0(no vote), -1(downvote)
  }

  export interface IVoteOutput {
    success: boolean;
    message?: string;
  }

  export interface IGetCommentsInput {
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

  export interface IGetUserAboutInput {
    username: string & tags.Format<"iri">;
  }

  export interface IGetUserAboutOutput {
    name: string;
    karma: number;
    created_utc: number;
  }

  export interface IGetUserSubmittedInput {
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

  export interface IGetUserCommentsInput {
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

  export interface ISearchSubredditsInput {
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

  export interface IGetSubredditAboutInput {
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

  export interface ISavePostInput {
    id: string & tags.Format<"iri">; // 저장할 게시물의 ID
  }

  export interface ISavePostOutput {
    success: boolean;
    message?: string;
  }

  export interface IUnsavePostInput {
    id: string & tags.Format<"iri">; // 삭제할 저장된 게시물의 ID
  }

  export interface IUnsavePostOutput {
    success: boolean;
    message?: string;
  }
}
