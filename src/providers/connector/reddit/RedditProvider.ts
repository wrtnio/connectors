import { Injectable } from "@nestjs/common";
import { IReddit } from "@wrtn/connector-api/lib/structures/connector/reddit/IReddit";
import axios from "axios";
import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { createQueryParameter } from "../../../utils/CreateQueryParameter";
import { OAuthSecretProvider } from "../../internal/oauth_secret/OAuthSecretProvider";

@Injectable()
export class RedditProvider {
  private readonly baseurl = "https://oauth.reddit.com";

  async getHotPosts(
    input: IReddit.IGetHotPostsInput,
  ): Promise<IReddit.IGetHotPostsOutput> {
    try {
      const { secretKey, subreddit, ...rest } = input;
      const accessToken = await this.getAccessToken(secretKey);
      const queryParams = createQueryParameter(rest);
      const url = `https://oauth.reddit.com${subreddit ? `/${subreddit}` : ""}/hot?${queryParams}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data.data;
    } catch (err) {
      throw err;
    }
  }

  async vote(input: IReddit.IVoteInput): Promise<IReddit.IVoteOutput> {
    const accessToken = await this.getAccessToken(input.secretKey);
    const response = await axios.post("https://oauth.reddit.com/vote", input, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }

  async getNewPosts(
    input: IReddit.IGetNewPostsInput,
  ): Promise<IReddit.IGetNewPostsOutput> {
    const { secretKey, subreddit, ...rest } = input;
    const accessToken = await this.getAccessToken(secretKey);
    const queryParams = createQueryParameter(rest);
    const url = `https://oauth.reddit.com${subreddit ? `/${subreddit}` : ""}/new?${queryParams}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.data;
  }

  async getTopPosts(
    input: IReddit.IGetTopPostsInput,
  ): Promise<IReddit.IGetTopPostsOutput> {
    const { secretKey, subreddit, ...rest } = input;
    const accessToken = await this.getAccessToken(secretKey);
    const queryParams = createQueryParameter(rest);
    const url = `https://oauth.reddit.com${subreddit ? `/${subreddit}` : ""}/top?${queryParams}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data;
  }

  async getComments(
    input: IReddit.IGetCommentsInput,
  ): Promise<IReddit.IGetCommentsOutput> {
    const { secretKey, subreddit, article, ...rest } = input;
    const accessToken = await this.getAccessToken(secretKey);
    const queryParams = createQueryParameter(rest);
    const url = `https://oauth.reddit.com/${subreddit}/comments/${article}?${queryParams}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const [{ data: articles }, { data: comments }] = response.data;
    return { articles, comments };
  }

  async getUserAbout(
    input: IReddit.IGetUserAboutInput,
  ): Promise<IReddit.IGetUserAboutOutput> {
    const accessToken = await this.getAccessToken(input.secretKey);
    const response = await axios.get(
      `https://oauth.reddit.com/user/${input.username}/about`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  }

  async getUserSubmitted(
    input: IReddit.IGetUserSubmittedInput,
  ): Promise<IReddit.IGetUserSubmittedOutput> {
    const { username, secretKey, ...rest } = input;
    const accessToken = await this.getAccessToken(secretKey);
    const queryParams = createQueryParameter(rest);
    const url = `https://oauth.reddit.com/user/${username}/submitted?${queryParams}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data;
  }

  async getUserComments(
    input: IReddit.IGetUserCommentsInput,
  ): Promise<IReddit.IGetUserCommentsOutput> {
    const { username, secretKey, ...rest } = input;
    const accessToken = await this.getAccessToken(secretKey);
    const queryParams = createQueryParameter(rest);
    const url = `https://oauth.reddit.com/user/${username}/comments?${queryParams}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data;
  }

  async searchSubreddits(
    input: IReddit.ISearchSubredditsInput,
  ): Promise<IReddit.ISearchSubredditsOutput> {
    const { secretKey, ...rest } = input;
    const accessToken = await this.getAccessToken(secretKey);
    const queryParams = createQueryParameter(rest);
    const url = `https://oauth.reddit.com/subreddits/search?${queryParams}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data;
  }

  async getSubredditAbout(
    input: IReddit.IGetSubredditAboutInput,
  ): Promise<IReddit.IGetSubredditAboutOutput> {
    const accessToken = await this.getAccessToken(input.secretKey);
    const url = `https://oauth.reddit.com/${input.subreddit}/about`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.data;
  }

  async getPopularSubreddits(
    input: IReddit.IGetPopularSubredditsInput,
  ): Promise<IReddit.IGetPopularSubredditsOutput> {
    const { secretKey, ...rest } = input;
    const accessToken = await this.getAccessToken(secretKey);
    const queryParams = createQueryParameter(rest);
    const url = `https://oauth.reddit.com/subreddits/popular?${queryParams}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.data;
  }

  async getBestContent(
    input: IReddit.IGetBestContentInput,
  ): Promise<IReddit.IGetBestContentOutput> {
    const { secretKey, ...rest } = input;
    const accessToken = await this.getAccessToken(secretKey);
    const queryParameter = createQueryParameter(rest);
    const url = `https://oauth.reddit.com/best?${queryParameter}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.data;
  }

  async getAllTopContent(
    input: IReddit.Secret,
  ): Promise<IReddit.IGetAllTopContentOutput> {
    const accessToken = await this.getAccessToken(input.secretKey);
    const response = await axios.post(
      "https://oauth.reddit.com/r/all/top",
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
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
        redirect_uri: "http://localhost:3000",
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Basic}`,
        },
      },
    );

    return res.data.access_token;
  }
}
