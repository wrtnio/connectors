import { TypedBody, TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { IReddit } from "@wrtn/connector-api/lib/structures/connector/reddit/IReddit";
import { RedditProvider } from "../../../providers/connector/reddit/RedditProvider";

@Controller("connector/reddit")
export class RedditController {
  constructor(private readonly redditProvider: RedditProvider) {}

  @TypedRoute.Post("get-hot-posts")
  async getHotPosts(
    @TypedBody() input: IReddit.IGetHotPostsInput,
  ): Promise<IReddit.IGetHotPostsOutput> {
    return this.redditProvider.getHotPosts(input);
  }

  @TypedRoute.Post("get-new-posts")
  async getNewPosts(
    @TypedBody() input: IReddit.IGetNewPostsInput,
  ): Promise<IReddit.IGetNewPostsOutput> {
    return this.redditProvider.getNewPosts(input);
  }

  @TypedRoute.Post("get-top-posts")
  async getTopPosts(
    @TypedBody() input: IReddit.IGetTopPostsInput,
  ): Promise<IReddit.IGetTopPostsOutput> {
    return this.redditProvider.getTopPosts(input);
  }

  // @TypedRoute.Post("vote")
  // async vote(
  //   @TypedBody() input: IReddit.IVoteInput,
  // ): Promise<IReddit.IVoteOutput> {
  //   return this.redditProvider.vote(input);
  // }

  @TypedRoute.Post("get-comments")
  async getComments(
    @TypedBody() input: IReddit.IGetCommentsInput,
  ): Promise<IReddit.IGetCommentsOutput> {
    return this.redditProvider.getComments(input);
  }

  @TypedRoute.Post("get-user-about")
  async getUserAbout(
    @TypedBody() input: IReddit.IGetUserAboutInput,
  ): Promise<IReddit.IGetUserAboutOutput> {
    return this.redditProvider.getUserAbout(input);
  }

  @TypedRoute.Post("get-user-submitted")
  async getUserSubmitted(
    @TypedBody() input: IReddit.IGetUserSubmittedInput,
  ): Promise<IReddit.IGetUserSubmittedOutput> {
    return this.redditProvider.getUserSubmitted(input);
  }

  @TypedRoute.Post("get-user-comments")
  async getUserComments(
    @TypedBody() input: IReddit.IGetUserCommentsInput,
  ): Promise<IReddit.IGetUserCommentsOutput> {
    return this.redditProvider.getUserComments(input);
  }

  @TypedRoute.Post("search-subreddits")
  async searchSubreddits(
    @TypedBody() input: IReddit.ISearchSubredditsInput,
  ): Promise<IReddit.ISearchSubredditsOutput> {
    return this.redditProvider.searchSubreddits(input);
  }

  @TypedRoute.Post("get-subreddit-about")
  async getSubredditAbout(
    @TypedBody() input: IReddit.IGetSubredditAboutInput,
  ): Promise<IReddit.IGetSubredditAboutOutput> {
    return this.redditProvider.getSubredditAbout(input);
  }

  @TypedRoute.Post("get-popular-subreddits")
  async getPopularSubreddits(
    @TypedBody() input: IReddit.IGetPopularSubredditsInput,
  ): Promise<IReddit.IGetPopularSubredditsOutput> {
    return this.redditProvider.getPopularSubreddits(input);
  }

  @TypedRoute.Post("get-best-content")
  async getBestContent(
    @TypedBody() input: IReddit.IGetBestContentInput,
  ): Promise<IReddit.IGetBestContentOutput> {
    return this.redditProvider.getBestContent(input);
  }

  @TypedRoute.Post("get-all-top-content")
  async getAllTopContent(
    @TypedBody() input: IReddit.Secret,
  ): Promise<IReddit.IGetAllTopContentOutput> {
    return this.redditProvider.getAllTopContent(input);
  }
}
