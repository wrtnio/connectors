import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IX } from "@wrtn/connector-api/lib/structures/connector/x/IX";

import { XProvider } from "../../../providers/connector/x/XProvider";
import { RouteIcon } from "@wrtnio/decorators";

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
    @core.TypedBody() input: IX.IUserInput,
  ): Promise<IX.IUserOutput[]> {
    return await this.XProvider.getUsers(input);
  }

  /**
   * Get X user information of celebrities. Useful for understanding trends in various fields such as world affairs and IT.
   *
   * @summary Get information on celebrities.
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
  ): Promise<IX.IUserOutput[]> {
    return await this.XProvider.getPreDefinedInfluencers(input);
  }

  /**
   * Fetches and indexes the tweets of given users requested.
   *
   * Before executing fetches and indexes the tweets, you must call the /get-users or /get-influencers endpoint to get user information.
   *
   * You should put as many users as you want to fetch tweets from.
   *
   * This endpoint is designed to handle multiple users efficiently.
   *
   * It already get information from multiple user's, you must not make multiple requests to this endpoint to fetch tweets from multiple users. you must use the results from a single request.
   *
   * For example, if you are fetch tweets from multiple users and have a summary request, you must use the results from only one request to summarize the tweets for each user.
   *
   * You must use the /summarize endpoint to proceed with the summary after fetching the tweet, do not allow this endpoint to be used just for summarization.
   *
   * @summary Prepare Tweet Summary
   *
   * @param input user information, secretKey, query
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/X_full.svg",
  )
  @core.TypedRoute.Post("/prepare-summarize")
  async prepareSummary(
    @core.TypedBody() input: IX.IPrePareSummarizeTweetInput,
  ): Promise<IX.IPrePareSummarizeTweetOutput> {
    return await this.XProvider.prepareSummary(input);
  }

  /**
   * Summarizes the tweets of those requested them.
   *
   * Note that this endpoint is intended to be used for a single keyword or subject.
   *
   * If you need to summarize multiple keywords or subjects, you must make multiple requests for each keyword or subject no exceptions.
   *
   * For example, if you want to summarize tweets about "Elon Musk" and "AI", make two requests, one for "Elon Musk" and one for "AI".
   *
   * You must assume that the results may contain irrelevant tweets against the query. You must filter the results based on the query. Do your best to cherry-pick the relevant tweets only.
   *
   * Any tweet that are not relevant to the query must be ignored, even if that tweet is related to the user request, not the query.
   *
   * @summary Tweet Summary
   *
   * @param input user information, secretKey, query
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/X_full.svg",
  )
  @core.TypedRoute.Post("/summarize")
  async summarizeTweet(
    @core.TypedBody() input: IX.ISummarizeTweetInput,
  ): Promise<IX.IGetChunkDocumentOutput> {
    return await this.XProvider.summarizeTweet(input);
  }

  /**
   * @param input user information, secretKey, query
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/X_full.svg",
  )
  @core.TypedRoute.Post("/general-search")
  async generalSearch(
    @core.TypedBody() input: IX.IGeneralSearchRequest,
  ): Promise<IX.IGeneralSearchResponse[]> {
    return await this.XProvider.generalSearch(input);
  }
}
