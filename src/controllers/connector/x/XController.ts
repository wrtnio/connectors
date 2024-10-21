import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IX } from "@wrtn/connector-api/lib/structures/connector/x/IX";

import { XProvider } from "../../../providers/connector/x/XProvider";
import { RouteIcon } from "@wrtnio/decorators";
import { IRag } from "@wrtn/connector-api/lib/structures/connector/rag/IRag";

@Controller("connector/x")
export class XController {
  constructor(private readonly XProvider: XProvider) {}
  /**
   * Get User Information by username
   *
   * @summary Get User Information
   *
   * @param input username
   * @returns user information
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/X_full.svg",
  )
  @core.TypedRoute.Post("/get-users")
  async getUsers(
    @core.TypedBody() input: IX.IUserRequest,
  ): Promise<IX.IUserResponse[]> {
    return this.XProvider.getUsers(input);
  }

  /**
   * Get Influencer Information
   *
   * @summary Get Influencer Information
   *
   * @param input username
   * @returns user information
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/X_full.svg",
  )
  @core.TypedRoute.Post("/get-influencers")
  async getPreDefinedInfluencers(
    @core.TypedBody() input: IX.ISecret,
  ): Promise<IX.IUserResponse[]> {
    return this.XProvider.getPreDefinedInfluencers(input);
  }

  /**
   * Get Tweet
   *
   * @summary Get Tweet
   *
   * @param input tweetId
   * @returns tweet information
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/X_full.svg",
  )
  @core.TypedRoute.Post("/get-tweet")
  async getTweet(
    @core.TypedBody() input: IX.IGetTweetRequest,
  ): Promise<IX.ITweetResponse> {
    return this.XProvider.getTweet(input);
  }

  /**
   * Get user timeline tweets
   *
   * @summary Get User Post timeline
   *
   * @param input userId, userName
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/X_full.svg",
  )
  @core.TypedRoute.Post("/get-user-timeline-tweets")
  async getUserTimelineTweets(
    @core.TypedBody() input: IX.IUserTweetTimeLineRequest,
  ): Promise<IX.ITweetResponse[]> {
    return this.XProvider.getUserTimelineTweets(input);
  }

  /**
   * Make txt file for tweet and upload to S3
   *
   * @summary Make tweet file and upload
   * @param userName
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/X_full.svg",
  )
  @core.TypedRoute.Post("/make-txt-file-and-upload")
  async makeTxtFileForTweetAndUploadToS3(
    @core.TypedBody() input: IX.ITweetResponse[],
  ): Promise<IX.IMakeTxtFileAndUploadResponse[]> {
    return this.XProvider.makeTxtFileForTweetAndUploadToS3(input);
  }

  /**
   * Tweet Summarize for txt file
   *
   * @summary Summarize tweet
   * @param fileUrl
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/X_full.svg",
  )
  @core.TypedRoute.Post("/get-chunk-document")
  async getChunkDocument(
    @core.TypedBody() input: IX.IGetChunkDocumentRequest,
  ): Promise<IX.IGetChunkDocumentResponse> {
    return this.XProvider.getChunkDocument(input);
  }
}
