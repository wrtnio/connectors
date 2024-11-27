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
import { retry } from "../../../utils/retry";
@Injectable()
export class XProvider {
  constructor(
    private awsProvider: AwsProvider,
    private readonly ragProvider: RagProvider,
  ) {}
  private readonly logger = new Logger("XProvider");

  async getUsers(input: IX.IUserInput): Promise<IX.IUserOutput[]> {
    return this.getTweetUserInformations(input.userName, input);
  }

  async getPreDefinedInfluencers(input: IX.ISecret): Promise<IX.IUserOutput[]> {
    const influencerList: string[] = ["hwchase17", "ilyasut", "miramurati"];
    return this.getTweetUserInformations(influencerList, input);
  }

  async prepareSummary(
    input: IX.IPrePareSummarizeTweetInput,
  ): Promise<IX.IPrePareSummarizeTweetOutput> {
    try {
      const { user, secretKey } = input;
      const tweets = await this.getUserTimelineTweets({ user, secretKey });
      const txtFiles = await this.makeTxtFileForTweetAndUploadToS3(tweets);
      const analyze = await retry(
        () =>
          this.ragProvider.analyze(
            { url: txtFiles.map((file) => file.fileUrl) },
            true,
          ),
        2,
      )();
      this.logger.log(
        `Successfully prepared tweet summary, chatId: ${analyze.chatId}`,
      );
      return { chatId: analyze.chatId };
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async summarizeTweet(
    input: IX.ISummarizeTweetInput,
  ): Promise<IX.IGetChunkDocumentOutput> {
    try {
      const chunkDocument = await this.getChunkDocument({
        chatId: input.chatId,
        query: input.query,
      });
      return chunkDocument;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  private async getTweetUserInformations(
    userNames: string[],
    input: IX.IUserInput | IX.ISecret,
  ): Promise<IX.IUserOutput[]> {
    const accessToken = await this.refresh(input);
    try {
      const userPromises = userNames.map(async (userName: string) => {
        const user = await ConnectorGlobal.prisma.x_users.findFirst({
          where: { userName: userName },
        });
        if (user) {
          return {
            id: user.tweet_user_id,
            name: user.name,
            userName: user.userName,
          };
        } else {
          const res = await axios.get(
            `https://api.x.com/2/users/by/username/${userName}`,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            },
          );
          const record = await ConnectorGlobal.prisma.x_users.create({
            data: {
              id: v4(),
              tweet_user_id: res.data.data.id,
              name: res.data.data.name,
              userName: res.data.data.username,
              created_at: new Date().toISOString(),
            },
          });

          return {
            id: record.tweet_user_id,
            name: record.name,
            userName: record.userName,
          };
        }
      });

      return await Promise.all(userPromises);
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  private async getTweet(
    input: IX.IGetTweetInput,
    accessTokenValue?: string,
  ): Promise<IX.ITweetOutput> {
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

      const tweetData = tweet?.data?.data;
      if (!tweetData) {
        // Return default value if tweet is unavailable
        return {
          id: "",
          text: "This tweet is unavailable",
          userName: "Unknown",
          tweet_link: "This tweet is unavailable",
          type: "This tweet is unavailable",
          referredUserName: null,
          referredTweetLink: null,
          referredTweetText: null,
        };
      }
      const user = await ConnectorGlobal.prisma.x_users.findFirst({
        where: { tweet_user_id: tweetData.author_id },
      });

      let authorName: string = "";
      let authorTweetName: string = "";
      if (!user) {
        const author = await axios.get(
          `https://api.x.com/2/users/${tweet.data.data.author_id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        authorName = author.data.data.name;
        authorTweetName = author.data.data.username;
      } else {
        authorName = user.name;
        authorTweetName = user.userName;
      }

      return {
        id: tweet.data.data.id,
        text: tweet.data.data.text,
        userName: authorName,
        tweet_link: `https://twitter.com/${authorTweetName}/status/${tweet.data.data.id}`,
        type: "Details for referred tweet",
        referredUserName: null,
        referredTweetLink: null,
        referredTweetText: null,
      };
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  private async getUserTimelineTweets(
    input: IX.IUserTweetTimeLineInput,
  ): Promise<IX.ITweetOutput[]> {
    try {
      const accessToken = await this.refresh(input);
      const result: IX.ITweetOutput[] = [];
      for (const user of input.user) {
        if (!user.id || !user.name) {
          this.logger.error("X User id and user name are required");
        }

        const userTimeLineTweets =
          await ConnectorGlobal.prisma.x_tweet.findMany({
            where: {
              x_user_id: user.id,
              created_at: {
                lte: new Date().toISOString(),
                gte: new Date(
                  new Date().getTime() - 1000 * 60 * 60 * 24,
                ).toISOString(),
              },
            },
            orderBy: {
              created_at: "desc",
            },
          });

        if (userTimeLineTweets.length > 0) {
          userTimeLineTweets.forEach((tweet) => {
            result.push({
              id: tweet.id,
              userName: user.name,
              text: tweet.text,
              tweet_link: `https://twitter.com/${user.userName}/status/${tweet.id}`,
              type: tweet.type,
              referredUserName: tweet.referred_user_name,
              referredTweetLink: tweet.referred_tweet_link,
              referredTweetText: tweet.referred_tweet_text,
            });
          });
        } else {
          const userTweetTimeLines = await axios.get(
            `https://api.x.com/2/users/${user.id}/tweets`,
            {
              params: {
                max_results: 100,
                expansions: "referenced_tweets.id,tweet.fields,created_at",
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
                    await ConnectorGlobal.prisma.x_tweet.create({
                      data: {
                        id: v4(),
                        tweet_id: userTweetTimeLine.id,
                        x_user_id: user.id,
                        text: userTweetTimeLine.text,
                        link: `https://twitter.com/${user.userName}/status/${userTweetTimeLine.id}`,
                        type:
                          referencedTweet.type === "retweeted"
                            ? "retweeted"
                            : "quoted",
                        referred_user_name: originalTweet.userName,
                        referred_tweet_link: originalTweet.tweet_link,
                        referred_tweet_text: originalTweet.text,
                        created_at: new Date().toISOString(),
                      },
                    });
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
                await ConnectorGlobal.prisma.x_tweet.create({
                  data: {
                    id: v4(),
                    tweet_id: userTweetTimeLine.id,
                    x_user_id: user.id,
                    text: userTweetTimeLine.text,
                    link: `https://twitter.com/${user.userName}/status/${userTweetTimeLine.id}`,
                    type: "original",
                    referred_user_name: null,
                    referred_tweet_link: null,
                    referred_tweet_text: null,
                    created_at: new Date().toISOString(),
                  },
                });
                result.push({
                  id: userTweetTimeLine.id,
                  userName: user.name,
                  text: userTweetTimeLine.text,
                  tweet_link: `https://twitter.com/${user.userName}/status/${userTweetTimeLine.id}`,
                  type: "original",
                  referredUserName: null,
                  referredTweetLink: null,
                  referredTweetText: null,
                });
              }
            }
          } else {
            this.logger.log(`X ${user.name} tweet timeline is empty`);
          }
        }
      }
      this.logger.log(
        `Successfully get Timeline Tweet Data: ${JSON.stringify(result)}, length: ${result.length}`,
      );
      return result;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  private async makeTxtFileForTweetAndUploadToS3(
    input: IX.ITweetOutput[],
  ): Promise<IX.IMakeTxtFileAndUploadOutput[]> {
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

  private async getChunkDocument(
    input: IX.IGetChunkDocumentInput,
  ): Promise<IX.IGetChunkDocumentOutput> {
    try {
      const chunkDocument = await axios.post(
        `${ConnectorGlobal.env.RAG_FLOW_SERVER_URL}/v1/index/${ConnectorGlobal.env.RAG_FLOW_DOCUMENT_INDEX}/query`,
        {
          query: input.query,
          topk: ConnectorGlobal.env.RAG_FLOW_TOPK,
          filters: [
            {
              chat_id: input.chatId,
            },
          ],
        },
        {
          headers: {
            "x-service-id": "eco_file_chat",
          },
        },
      );

      const chunkDocumentData = chunkDocument.data.documents;
      if (chunkDocumentData.length === 0) {
        this.logger.error(`Get Chunk Document Failed: No data found`);
        throw new InternalServerErrorException("Chunk Document is empty");
      }

      const filteredDocuments = chunkDocumentData.map((document: any) => {
        const { metadata, ...rest } = document;
        const {
          url,
          file_fingerprint,
          md5_digest,
          file_type,
          ...filteredMetadata
        } = metadata; // url, file_fingerprint, md5_digest, file_type 필드를 제외하고 나머지 필드만 가져옴
        return {
          ...rest,
          metadata: filteredMetadata,
        };
      });

      this.logger.log(
        `Successfully get chunk document: chatId: ${input.chatId}, body: ${JSON.stringify(filteredDocuments)}`,
      );

      return {
        documents: filteredDocuments,
      };
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
       * Update Refresh Token because it is disposable
       */
      if (typia.is<string & tags.Format<"uuid">>(input.secretKey)) {
        await OAuthSecretProvider.updateSecretValue(input.secretKey, {
          value: res.data.refresh_token,
        });
        this.logger.log("X Refresh Token Updated");
      }

      /**
       * Only for test environment
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

  async generalSearch(
    input: IX.IGeneralSearchRequest,
  ): Promise<IX.IGeneralSearchResponse[]> {
    try {
      const accessToken = await this.refresh(input);
      const query = this.makeQuery(input);
      console.log("query", query);
      const searchResult = await axios.get(
        `https://api.x.com/2/tweets/search/all`,
        {
          params: {
            query: query,
            // expansions: [
            //   "author_id",
            //   "referenced_tweets.id",
            //   "referenced_tweets.id.author_id",
            //   "attachments.media_keys",
            // ],
            // "media.fields": ["preview_image_url", "url"],
            // "tweet.fields": "created_at",
            "user.fields": ["id", "name", "username"],
            max_results: input.maxResults,
            sort_order: input.sort_order,
            ...(input.start_time && { start_time: input.start_time }),
            ...(input.end_time && { end_time: input.end_time }),
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const tweetData = searchResult?.data?.data;
      if (!tweetData) {
        return [];
      }

      const results: IX.IGeneralSearchResponse[] = [];

      for (const tweet of tweetData) {
        results.push({
          id: tweet.id,
          text: tweet.text,
          userName: tweet.author_id,
          tweet_link: `https://twitter.com/${tweet.author_id}/status/${tweet.id}`,
        });
      }
      return results;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  private makeQuery(input: IX.IGeneralSearchRequest): string {
    let query = "";

    if (input.and_keywords && input.and_keywords.length > 0) {
      query += input.and_keywords
        .map((keyword) => (keyword.includes(" ") ? `"${keyword}"` : keyword))
        .join(" ");
    }

    if (input.or_keywords && input.or_keywords.length > 0) {
      if (query) query += " ";
      query += `(${input.or_keywords.map((keyword) => (keyword.includes(" ") ? `"${keyword}"` : keyword)).join(" OR ")})`;
    }

    if (input.not_keywords && input.not_keywords.length > 0) {
      query += ` ${input.not_keywords.map((keyword) => (keyword.includes(" ") ? `-"${keyword}"` : `-${keyword}`)).join(" ")}`;
    }

    if (input.isExcludeQuote === false) {
      query += " -is:quote";
    }

    if (input.isExcludeRetweet === false) {
      query += " -is:retweet";
    }

    if (input.isExcludeReply === false) {
      query += " -is:reply";
    }

    return `${query} lang:${input.lang}`;
  }
}
