import { Injectable } from "@nestjs/common";
import { IReddit } from "@wrtn/connector-api/lib/structures/connector/reddit/IReddit";
import axios from "axios";
import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { createQueryParameter } from "../../../utils/CreateQueryParameter";
import { OAuthSecretProvider } from "../../internal/oauth_secret/OAuthSecretProvider";

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

  async searchSubreddits(
    input: IReddit.ISearchSubredditsInput,
  ): Promise<IReddit.ISearchSubredditsOutput> {
    const response = await axios.post(
      "https://www.reddit.com/subreddits/search",
      input,
    );
    return response.data;
  }

  async getSubredditAbout(
    input: IReddit.IGetSubredditAboutInput,
  ): Promise<IReddit.IGetSubredditAboutOutput> {
    const response = await axios.post(
      `https://www.reddit.com/r/${input.subreddit}/about`,
      input,
    );
    return response.data;
  }

  async getPopularSubreddits(): Promise<IReddit.IGetPopularSubredditsOutput> {
    const response = await axios.post(
      "https://www.reddit.com/subreddits/popular",
    );
    return response.data;
  }

  async getBestContent(
    input: IReddit.IGetBestContentInput,
  ): Promise<IReddit.IGetBestContentOutput> {
    const queryParameter = createQueryParameter(input);
    const url = `https://www.reddit.com/best/${queryParameter}`;
    const response = await axios.get(url);
    return response.data;
  }

  async getAllTopContent(): Promise<IReddit.IGetAllTopContentOutput> {
    const response = await axios.post("https://www.reddit.com/r/all/top");
    return response.data;
  }

  async savePost(
    input: IReddit.ISavePostInput,
  ): Promise<IReddit.ISavePostOutput> {
    const response = await axios.post("https://www.reddit.com/api/save", input);
    return response.data;
  }

  async unsavePost(
    input: IReddit.IUnsavePostInput,
  ): Promise<IReddit.IUnsavePostOutput> {
    const response = await axios.post(
      "https://www.reddit.com/api/unsave",
      input,
    );
    return response.data;
  }

  private async getAccessToken(secretKey: string): Promise<string> {
    const refreshToken = await OAuthSecretProvider.getSecretValue(secretKey);
    const acessToken = await this.refresh(refreshToken);
    return acessToken;
  }

  private async refresh(refreshToken: string): Promise<string> {
    const clientId = ConnectorGlobal.env.REDDIT_CLIENT_ID;
    const clientSecret = ConnectorGlobal.env.REDDIT_CLIENT_SECRET;
    const Basic = Buffer.from(`${clientId}:${clientSecret}`, "utf8").toString(
      "base64",
    );

    const url = `https://www.reddit.com/api/v1/access_token` as const;
    const res = await axios.post(
      url,
      {
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        redirect_url: "http://localhost:3000",
      },
      {
        headers: {
          Authorization: `Basic ${Basic}`,
        },
      },
    );

    return res.data.access_token;
  }
}
