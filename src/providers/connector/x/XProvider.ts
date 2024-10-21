import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnprocessableEntityException,
} from "@nestjs/common";

import { IX } from "@wrtn/connector-api/lib/structures/connector/x/IX";

import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { OAuthSecretProvider } from "../../internal/oauth_secret/OAuthSecretProvider";
import axios, { AxiosError } from "axios";
import { AwsProvider } from "../aws/AwsProvider";
import { RagProvider } from "../rag/RagProvider";
import typia, { tags } from "typia";
import { v4 } from "uuid";
@Injectable()
export class XProvider {
  constructor(
    private awsProvider: AwsProvider,
    private readonly ragProvider: RagProvider,
  ) {}
  private readonly logger = new Logger("XProvider");

  async getUsers(input: IX.IUserRequest): Promise<IX.IUserResponse[]> {
    try {
      const accessToken = await this.refresh(input);
      const result: IX.IUserResponse[] = [];
      for (const userName of input.userName) {
        const user = await axios.get(
          `https://api.x.com/2/users/by/username/${userName}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        result.push({
          id: user.data.data.id,
          name: user.data.data.name,
          userName: user.data.data.username,
        });
      }

      return result;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async getPreDefinedInfluencers(
    input: IX.ISecret,
  ): Promise<IX.IUserResponse[]> {
    try {
      const accessToken = await this.refresh(input);
      const result: IX.IUserResponse[] = [];

      // influencer's twitter username list
      const influencerList: string[] = [];
      for (const userName of influencerList) {
        const user = await axios.get(
          `https://api.x.com/2/users/by/username/${userName}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        result.push({
          id: user.data.data.id,
          name: user.data.data.name,
          userName: user.data.data.username,
        });
      }
      return result;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async getTweet(
    input: IX.IGetTweetRequest,
    accessTokenValue?: string,
  ): Promise<IX.ITweetResponse> {
    try {
      const accessToken = accessTokenValue ?? (await this.refresh(input));
      const tweet = await axios.get(
        `https://api.x.com/2/tweets/${input.tweetId}`,
        {
          params: {
            expansions: "author_id",
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const user = await axios.get(
        `https://api.x.com/2/users/${tweet.data.data.author_id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      return {
        id: tweet.data.data.id,
        text: tweet.data.data.text,
        userName: user.data.data.name,
        tweet_link: `https://twitter.com/${user.data.data.username}/status/${tweet.data.data.id}`,
      };
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async getUserTimelineTweets(
    input: IX.IUserTweetTimeLineRequest,
  ): Promise<IX.ITweetResponse[]> {
    try {
      const accessToken = await this.refresh(input);
      const result: IX.ITweetResponse[] = [];

      for (const user of input.user) {
        if (!user.userId || !user.name) {
          this.logger.error("X User id and user name are required");
        }

        const userTweetTimeLines = await axios.get(
          `https://api.x.com/2/users/${user.userId}/tweets`,
          {
            params: {
              max_results: 100,
              expansions: "referenced_tweets.id",
              "tweet.fields": "created_at",
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

        if (
          userTweetTimeLines &&
          userTweetTimeLines.data &&
          userTweetTimeLines.data.data
        ) {
          for (const userTweetTimeLine of userTweetTimeLines.data.data) {
            // If Retweet or Quoted Tweet, get the original tweet. Exclude the replied tweet.
            if (
              userTweetTimeLine.referenced_tweets &&
              userTweetTimeLine.referenced_tweets.length > 0
            ) {
              for (const referencedTweet of userTweetTimeLine.referenced_tweets) {
                if (referencedTweet.type !== "replied") {
                  const originalTweet = await this.getTweet(
                    {
                      secretKey: input.secretKey,
                      tweetId: referencedTweet.id,
                    },
                    accessToken,
                  );
                  result.push({
                    id: userTweetTimeLine.id,
                    userName: user.name,
                    text: userTweetTimeLine.text,
                    tweet_link: `https://twitter.com/${user.userName}/status/${userTweetTimeLine.id}`,
                    type:
                      referencedTweet.type === "retweeted"
                        ? "retweeted"
                        : "quoted",
                    referredUserName: originalTweet.userName,
                    referredTweetLink: originalTweet.tweet_link,
                    referredTweetText: originalTweet.text,
                  });
                }
              }
            } else {
              result.push({
                id: userTweetTimeLine.id,
                userName: user.name,
                text: userTweetTimeLine.text,
                tweet_link: `https://twitter.com/${user.userName}/status/${userTweetTimeLine.id}`,
                type: "original",
              });
            }
          }
        } else {
          this.logger.log(`X ${user.name} tweet timeline is empty`);
        }
      }
      return result;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async makeTxtFileForTweetAndUploadToS3(
    input: IX.ITweetResponse[],
  ): Promise<IX.IMakeTxtFileAndUploadResponse[]> {
    try {
      const uploadPromises = input.map(async (tweet) => {
        const fileName = `${v4()}_${new Date().toISOString()}_tweet.txt`;
        let fileContent = "";

        fileContent += `<tweets>\n`;
        fileContent += `<tweet>\n`;
        fileContent += `userName: ${tweet.userName}\n`;
        fileContent += `content: ${tweet.text}\n`;
        if (tweet.referredUserName) {
          fileContent += `referredUserName: ${tweet.referredUserName}\n`;
        }
        if (tweet.referredTweetText) {
          fileContent += `referredTweetContent: ${tweet.referredTweetText}\n`;
        }
        fileContent += `</tweet>\n`;
        fileContent += `</tweets>\n`;

        const fileUrl = await this.awsProvider.uploadObject({
          key: `tweets/${fileName}`,
          data: Buffer.from(fileContent, "utf-8"),
          contentType: "text/plain; charset=utf-8",
        });

        this.logger.log(`Successfully uploaded ${fileName} to S3`);
        return {
          fileUrl: fileUrl,
        };
      });
      return await Promise.all(uploadPromises);
    } catch (err) {
      this.logger.error(`Failed to upload tweets to S3`);
      throw err;
    }
  }

  async getChunkDocument(
    input: IX.IGetChunkDocumentRequest,
  ): Promise<IX.IGetChunkDocumentResponse> {
    const analyze = await this.ragProvider.analyze(
      { url: input.fileUrl },
      true,
    );

    try {
      const topK = Math.max(
        10,
        Math.round(
          input.fileUrl.length / Number(ConnectorGlobal.env.RAG_FLOW_TOPK),
        ),
      );
      const chunkDocument = await axios.post(
        `${ConnectorGlobal.env.RAG_FLOW_SERVER_URL}/v1/index/${ConnectorGlobal.env.RAG_FLOW_DOCUMENT_INDEX}/query`,
        {
          query: input.query,
          topk: topK,
          filters: [
            {
              chat_id: analyze.chatId,
            },
          ],
        },
        {
          headers: {
            "x-service-id": "eco_file_chat",
          },
        },
      );
      this.logger.log(
        `Successfully get chunk document: chatId: ${analyze.chatId}, body: ${JSON.stringify(chunkDocument.data)}`,
      );
      return chunkDocument.data;
    } catch (err) {
      if (
        err instanceof AxiosError &&
        err.response &&
        err.response.status === 400
      ) {
        this.logger.error(
          `Get Chunk Document Failed: ${err.response.data.detail}`,
        );
        throw new BadRequestException(`Get Chunk Document Failed`);
      } else if (
        err instanceof AxiosError &&
        err.response &&
        err.response.status === 422
      ) {
        this.logger.error(
          `Get Chunk Document Failed: ${err.response.data.detail}`,
        );
        throw new UnprocessableEntityException(`Get Chunk Document Failed`);
      } else {
        throw new InternalServerErrorException("Get Chunk Document Failed");
      }
    }
  }

  /**
   * 뉴스레터 시나리오
   *
   * 정해진 인플루언서들의 트윗을 가져와서 텍스트 파일로 만들어서 S3에 업로드 한 후 RAG로 요약한 뒤 GMAIL로 전송.
   *
   * getUser -> getUserTimelineTweets -> makeTxtFileForTweetAndUploadToS3 -> summarizeTweet -> sendEmail
   */

  async refresh(input: IX.ISecret): Promise<string> {
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
      input.secretKey = res.data.refresh_token;
      return res.data.access_token;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }
}
