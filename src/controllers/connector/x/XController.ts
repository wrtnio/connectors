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
    return this.XProvider.getUsers(input);
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
    return this.XProvider.getPreDefinedInfluencers(input);
  }

  /**
   * Summarizes the tweets of those requested them.
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
    return this.XProvider.summarizeTweet(input);
  }
}
