import { Injectable, Logger } from "@nestjs/common";

import { IX } from "@wrtn/connector-api/lib/structures/connector/x/IX";

import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { OAuthSecretProvider } from "../../internal/oauth_secret/OAuthSecretProvider";
import axios from "axios";
import { AwsProvider } from "../aws/AwsProvider";
import { RagProvider } from "../rag/RagProvider";
import { IRag } from "@wrtn/connector-api/lib/structures/connector/rag/IRag";
import typia, { tags } from "typia";

@Injectable()
export class XProvider {
  constructor(
    private awsProvider: AwsProvider,
    private readonly ragProvider: RagProvider,
  ) {}
  private readonly logger = new Logger("XProvider");

  async getUser(input: IX.IUserRequest): Promise<IX.IUserResponse> {
    const accessToken = await this.refresh(input);
    const user = await axios.get(
      `https://api.x.com/2/users/by/username/${input.userName}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return {
      id: user.data.id,
      name: user.data.name,
      userName: user.data.username,
    };
  }

  async getUserFollowers(
    input: IX.IGetUserFollowersRequest,
  ): Promise<IX.IGetUserFollowersResponse[]> {
    try {
      const accessToken = await this.refresh(input);
      const userFollowers = await axios.get(
        `https://api.x.com/2/users/${input.userId}/followers`,
        {
          params: {
            max_results: 50,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const result: IX.IGetUserFollowersResponse[] = [];
      for (const follower of userFollowers.data) {
        result.push({
          id: follower.id,
          name: follower.name,
          userName: follower.username,
        });
      }
      return result;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async getTweet(input: IX.IGetTweetRequest): Promise<IX.ITweetResponse> {
    try {
      const accessToken = await this.refresh(input);
      const tweet = await axios.get(
        `https://api.x.com/2/tweets/${input.tweetId}`,
        {
          params: {
            expansion: "author_id",
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const user = await axios.get(
        `https://api.x.com/2/users/${tweet.data.author_id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      return {
        id: tweet.data.id,
        text: tweet.data.text,
        userName: user.data.username,
        tweet_link: `https://twitter.com/${user.data.userName}/status/${tweet.data.id}`,
      };
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }
  async getUserTimelineTweets(
    input: IX.IUserTweetTimeLineRequest,
  ): Promise<IX.ITweetResponse[]> {
    const accessToken = await this.refresh(input);
    const result: IX.ITweetResponse[] = [];

    input.user.map(async (user) => {
      if (!user.userId || !user.userName) {
        this.logger.error("X User id and user name are required");
      }
      const userTweetTimeLines = await axios.get(
        `https://api.x.com/2users/${user.userId}/tweets`,
        {
          params: {
            max_results: 50,
            expansions: "referenced_tweets.id",
            end_time: new Date().toISOString(),
            start_time: new Date(
              new Date().getTime() - 1000 * 60 * 60 * 24,
            ).toISOString(),
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      for (const userTweetTimeLine of userTweetTimeLines.data) {
        // If Retweet or Quoted Tweet, get the original tweet. Exclude the replied tweet.
        if (
          userTweetTimeLine.referenced_tweets &&
          userTweetTimeLine.referenced_tweets.length > 0
        ) {
          for (const referencedTweet of userTweetTimeLine.referenced_tweets) {
            if (
              referencedTweet.type === "retweeted" ||
              referencedTweet.type === "quoted"
            ) {
              const originalTweet = await this.getTweet(referencedTweet);
              result.push({
                id: originalTweet.id,
                userName: originalTweet.userName,
                text: originalTweet.text,
                tweet_link: originalTweet.tweet_link,
              });
            }
          }
        }

        result.push({
          id: userTweetTimeLine.id,
          userName: user.userName,
          text: userTweetTimeLine.text,
          tweet_link: `https://twitter.com/${user.userName}/status/${userTweetTimeLine.id}`,
        });
      }
    });

    return result;
  }

  async makeTxtFileForTweetAndUploadToS3(
    userName: string,
    input: IX.ITweetResponse[],
  ): Promise<IX.IMakeTxtFileAndUploadResponse> {
    const fileName = `${userName}_${new Date().toISOString()}_tweet.txt`;
    let fileContent = "";
    fileContent += `<tweets>\n`;
    input.map((tweet) => {
      fileContent += `<tweet>\n`;
      fileContent += `userName: ${tweet.userName}\n`;
      fileContent += `timeStamp: ${tweet.userName}\n`;
      fileContent += `content: ${tweet.text}\n`;
      fileContent += `link: ${tweet.tweet_link}\n`;
      fileContent += `</tweet>\n`;
    });
    fileContent += `</tweets>\n`;

    try {
      const fileUrl = await this.awsProvider.uploadObject({
        key: `tweets/${fileName}`,
        data: Buffer.from(fileContent),
        contentType: "text/plain",
      });
      this.logger.log(`Successfully uploaded ${fileName} to S3`);
      return {
        fileUrl: fileUrl,
      };
    } catch (err) {
      this.logger.error(`Failed to upload ${fileName} to S3`);
      throw err;
    }
  }

  async summarizeTweet(
    input: IX.ISummarizeTweetRequest,
  ): Promise<IRag.IGenerateOutput> {
    const analyze = await this.ragProvider.analyze({ url: [input.fileUrl] });
    return await this.ragProvider.generate(
      { query: "이 파일의 내용을 요약해줘." },
      analyze.chatId,
    );
  }

  async refresh(input: IX.ISecret) {
    try {
      const refreshToken = await OAuthSecretProvider.getSecretValue(
        input.secretKey,
      );

      const params = new URLSearchParams();
      params.append("grant_type", "refresh_token");
      params.append("refresh_token", refreshToken);
      params.append("client_id", ConnectorGlobal.env.X_CLIENT_ID);

      const BasicAuthToken = Buffer.from(
        `${ConnectorGlobal.env.X_CLIENT_ID}:${ConnectorGlobal.env.X_CLIENT_SECRET}`,
        "utf8",
      ).toString("base64");
      const res = await axios.post("https://api.x.com/2/oauth2/token", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${BasicAuthToken}`,
        },
      });

      /**
       * Refresh Token이 일회용이므로 값 업데이트
       */
      if (typia.is<string & tags.Format<"uuid">>(input.secretKey)) {
        await OAuthSecretProvider.updateSecretValue(input.secretKey, {
          value: res.data.refresh_token,
        });
        this.logger.log("X Refresh Token Updated");
      }

      /**
       * 테스트 환경에서만 사용
       */
      if (process.env.NODE_ENV === "test") {
        await ConnectorGlobal.write({
          X_TEST_SECRET: res.data.refresh_token,
        });
      }

      return res.data.access_token;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }
}
