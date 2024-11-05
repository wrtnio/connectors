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
}
