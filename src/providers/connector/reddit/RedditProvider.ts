import { Injectable } from "@nestjs/common";
import { IReddit } from "@wrtn/connector-api/lib/structures/connector/reddit/IReddit";
import axios from "axios";

@Injectable()
export class RedditProvider {
  async getHotPosts(
    input: IReddit.IGetHotPostsInput,
  ): Promise<IReddit.IGetHotPostsOutput> {
    const response = await axios.post(
      "https://www.reddit.com/api/v1/get-hot-posts",
      input,
    );
    return response.data;
  }

  async vote(input: IReddit.IVoteInput): Promise<IReddit.IVoteOutput> {
    const response = await axios.post("https://www.reddit.com/api/vote", input);
    return response.data;
  }

  async getNewPosts(
    input: IReddit.IGetNewPostsInput,
  ): Promise<IReddit.IGetNewPostsOutput> {
    const response = await axios.post(
      "https://www.reddit.com/r/" + input.subreddit + "/new",
      input,
    );
    return response.data;
  }

  async getTopPosts(
    input: IReddit.IGetTopPostsInput,
  ): Promise<IReddit.IGetTopPostsOutput> {
    const response = await axios.post(
      "https://www.reddit.com/r/" + input.subreddit + "/top",
      input,
    );
    return response.data;
  }

  async getComments(
    input: IReddit.IGetCommentsInput,
  ): Promise<IReddit.IGetCommentsOutput> {
    const response = await axios.post(
      `https://www.reddit.com/r/${input.subreddit}/comments/${input.article}`,
      input,
    );
    return response.data;
  }

  async getUserAbout(
    input: IReddit.IGetUserAboutInput,
  ): Promise<IReddit.IGetUserAboutOutput> {
    const response = await axios.post(
      `https://www.reddit.com/user/${input.username}/about`,
      input,
    );
    return response.data;
  }

  async getUserSubmitted(
    input: IReddit.IGetUserSubmittedInput,
  ): Promise<IReddit.IGetUserSubmittedOutput> {
    const response = await axios.post(
      `https://www.reddit.com/user/${input.username}/submitted`,
      input,
    );
    return response.data;
  }

  async getUserComments(
    input: IReddit.IGetUserCommentsInput,
  ): Promise<IReddit.IGetUserCommentsOutput> {
    const response = await axios.post(
      `https://www.reddit.com/user/${input.username}/comments`,
      input,
    );
    return response.data;
  }
}
