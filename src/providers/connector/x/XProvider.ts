import { Injectable } from "@nestjs/common";
import { TwitterApi } from "twitter-api-v2";

import { IX } from "@wrtn/connector-api/lib/structures/connector/x/IX";

import { ConnectorGlobal } from "../../../ConnectorGlobal";

@Injectable()
export class XProvider {
  async getUser(input: IX.IUserRequest): Promise<IX.IUserResponse> {
    const twitterClient = new TwitterApi(
      ConnectorGlobal.env.X_APP_USER_BEARER_TOKEN,
    );
    const user = await twitterClient.v2.userByUsername(input.userName);
    return {
      id: user.data.id,
      name: user.data.name,
      userName: user.data.username,
    };
  }

  // TODO: Get User followers for get tweets from followers. It require for oauth authentication.
  async getUserFollowers() {}

  // TODO: Get Tweet by tweet id. It is used for get tweet detail. Also it is used for provided by short link tweet.
  async getTweet() {}

  // TODO: Need RAG logic for get tweets from followers. It is used for get tweets from followers.
  async getUserTimelineTweets(
    input: IX.IUserTweetTimeLineRequest,
  ): Promise<IX.IUserTweetTimeLineResponse[]> {
    const twitterClient = new TwitterApi(
      ConnectorGlobal.env.X_APP_USER_BEARER_TOKEN,
    );
    const userTweetTimeLines = await twitterClient.v2.userTimeline(
      input.userId,
      {
        max_results: 50,
        end_time: new Date().toISOString(),
        start_time: new Date(
          new Date().getTime() - 1000 * 60 * 60 * 24,
        ).toISOString(),
      },
    );

    const result: IX.IUserTweetTimeLineResponse[] = [];
    for (const userTweetTimeLine of userTweetTimeLines) {
      result.push({
        id: userTweetTimeLine.id,
        text: userTweetTimeLine.text,
        tweet_link: `https://twitter.com/${input.userName}/status/${userTweetTimeLine.id}`,
      });
    }
    return result;
  }
}
