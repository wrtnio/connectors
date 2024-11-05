import { TypedBody, TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { IReddit } from "@wrtn/connector-api/lib/structures/connector/reddit/IReddit";
import { RedditProvider } from "../../../providers/connector/reddit/RedditProvider";

@Controller("reddit")
export class RedditController {
  constructor(private readonly redditProvider: RedditProvider) {}

  @TypedRoute.Post("get-hot-posts")
  async getHotPosts(
    @TypedBody() input: IReddit.IGetHotPostsInput,
  ): Promise<IReddit.IGetHotPostsOutput> {
    return this.redditProvider.getHotPosts(input);
  }

  @TypedRoute.Post("vote")
  async vote(
    @TypedBody() input: IReddit.IVoteInput,
  ): Promise<IReddit.IVoteOutput> {
    return this.redditProvider.vote(input);
  }
}
