import { TypedBody, TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { IReddit } from "@wrtn/connector-api/lib/structures/connector/reddit/IReddit";
import { RouteIcon } from "@wrtnio/decorators";
import { RedditProvider } from "../../../providers/connector/reddit/RedditProvider";

@Controller("connector/reddit")
export class RedditController {
  constructor(private readonly redditProvider: RedditProvider) {}

  /**
   * Retrieves hot posts from Reddit.
   *
   * This API fetches the most popular posts currently trending on Reddit.
   * The input requires a subreddit name and optional parameters for filtering.
   * The output provides a list of hot posts with details such as title, author, and score.
   *
   * @summary Get hot posts from Reddit
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/reddit_full.svg",
  )
  @TypedRoute.Post("get-hot-posts")
  async getHotPosts(
    @TypedBody() input: IReddit.IGetHotPostsInput,
  ): Promise<IReddit.IGetHotPostsOutput> {
    return this.redditProvider.getHotPosts(input);
  }

  /**
   * Retrieves new posts from Reddit.
   *
   * This API fetches the latest posts from a specified subreddit.
   * The input requires a subreddit name and optional parameters for pagination.
   * The output provides a list of new posts with details such as title, author, and timestamp.
   *
   * @summary Get new posts from Reddit
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/reddit_full.svg",
  )
  @TypedRoute.Post("get-new-posts")
  async getNewPosts(
    @TypedBody() input: IReddit.IGetNewPostsInput,
  ): Promise<IReddit.IGetNewPostsOutput> {
    return this.redditProvider.getNewPosts(input);
  }

  /**
   * Retrieves top posts from Reddit.
   *
   * This API fetches the highest-rated posts from a specified subreddit over a given time period.
   * The input requires a subreddit name and a time filter (e.g., day, week, month).
   * The output provides a list of top posts with details such as title, author, and score.
   *
   * @summary Get top posts from Reddit
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/reddit_full.svg",
  )
  @TypedRoute.Post("get-top-posts")
  async getTopPosts(
    @TypedBody() input: IReddit.IGetTopPostsInput,
  ): Promise<IReddit.IGetTopPostsOutput> {
    return this.redditProvider.getTopPosts(input);
  }

  /**
   * Retrieves comments from a Reddit post.
   *
   * This API fetches comments for a specific Reddit post.
   * The input requires the post ID and subreddit name.
   * The output provides a list of comments with details such as author, content, and score.
   *
   * @summary Get comments from a Reddit post
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/reddit_full.svg",
  )
  @TypedRoute.Post("get-comments")
  async getComments(
    @TypedBody() input: IReddit.IGetCommentsInput,
  ): Promise<IReddit.IGetArticleAndCommentsOutput> {
    const response = await this.redditProvider.getComments(input);
    const flatten = this.redditProvider.flatComments(response.comments);
    return { articles: response.articles, ...flatten };
  }

  /**
   * Retrieves information about a Reddit user.
   *
   * This API fetches profile information for a specified Reddit user.
   * The input requires the username.
   * The output provides user details such as karma, account age, and recent activity.
   *
   * @summary Get information about a Reddit user
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/reddit_full.svg",
  )
  @TypedRoute.Post("get-user-about")
  async getUserAbout(
    @TypedBody() input: IReddit.IGetUserAboutInput,
  ): Promise<IReddit.IGetUserAboutOutput> {
    return this.redditProvider.getUserAbout(input);
  }

  /**
   * Retrieves posts submitted by a Reddit user.
   *
   * This API fetches posts submitted by a specified Reddit user.
   * The input requires the username.
   * The output provides a list of submitted posts with details such as title, subreddit, and score.
   *
   * @summary Get posts submitted by a Reddit user
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/reddit_full.svg",
  )
  @TypedRoute.Post("get-user-submitted")
  async getUserSubmitted(
    @TypedBody() input: IReddit.IGetUserSubmittedInput,
  ): Promise<IReddit.IGetUserSubmittedOutput> {
    return this.redditProvider.getUserSubmitted(input);
  }

  /**
   * Retrieves comments made by a Reddit user.
   *
   * This API fetches comments made by a specified Reddit user.
   * The input requires the username.
   * The output provides a list of comments with details such as content, subreddit, and score.
   *
   * @summary Get comments made by a Reddit user
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/reddit_full.svg",
  )
  @TypedRoute.Post("get-user-comments")
  async getUserComments(
    @TypedBody() input: IReddit.IGetUserCommentsInput,
  ): Promise<IReddit.IFlattenCommentsOutput> {
    const comments = await this.redditProvider.getUserComments(input);
    return this.redditProvider.flatComments(comments);
  }

  /**
   * Searches for subreddits on Reddit.
   *
   * This API allows searching for subreddits based on a query string.
   * The input requires a search query.
   * The output provides a list of subreddits matching the query with details such as name and subscriber count.
   *
   * @summary Search for subreddits on Reddit
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/reddit_full.svg",
  )
  @TypedRoute.Post("search-subreddits")
  async searchSubreddits(
    @TypedBody() input: IReddit.ISearchSubredditsInput,
  ): Promise<IReddit.ISearchSubredditsOutput> {
    return this.redditProvider.searchSubreddits(input);
  }

  /**
   * Retrieves information about a subreddit.
   *
   * This API fetches detailed information about a specified subreddit.
   * The input requires the subreddit name.
   * The output provides details such as description, subscriber count, and rules.
   *
   * @summary Get information about a subreddit
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/reddit_full.svg",
  )
  @TypedRoute.Post("get-subreddit-about")
  async getSubredditAbout(
    @TypedBody() input: IReddit.IGetSubredditAboutInput,
  ): Promise<IReddit.IGetSubredditAboutOutput> {
    return this.redditProvider.getSubredditAbout(input);
  }

  /**
   * Retrieves popular subreddits.
   *
   * This API fetches a list of currently popular subreddits.
   * The output provides details such as subreddit name and subscriber count.
   *
   * @summary Get popular subreddits
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/reddit_full.svg",
  )
  @TypedRoute.Post("get-popular-subreddits")
  async getPopularSubreddits(
    @TypedBody() input: IReddit.IGetPopularSubredditsInput,
  ): Promise<IReddit.IGetPopularSubredditsOutput> {
    return this.redditProvider.getPopularSubreddits(input);
  }

  /**
   * Retrieves the best content from Reddit.
   *
   * This API fetches the best-rated content from Reddit.
   * The output provides a list of top-rated posts with details such as title, author, and score.
   *
   * @summary Get the best content from Reddit
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/reddit_full.svg",
  )
  @TypedRoute.Post("get-best-content")
  async getBestContent(
    @TypedBody() input: IReddit.IGetBestContentInput,
  ): Promise<IReddit.IGetBestContentOutput> {
    return this.redditProvider.getBestContent(input);
  }
}
