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

  export interface IVoteInput {
    id: string & tags.Format<"iri">; // 게시물 또는 댓글의 ID
    dir: number & tags.Type<"int32"> & tags.Minimum<-1> & tags.Maximum<1>; // 투표 방향: 1(upvote), 0(no vote), -1(downvote)
  }

  export interface IVoteOutput {
    success: boolean;
    message?: string;
  }
}
