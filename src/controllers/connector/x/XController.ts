import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IX } from "@wrtn/connector-api/lib/structures/connector/x/IX";

import { XProvider } from "../../../providers/connector/x/XProvider";
import { retry } from "../../../utils/retry";
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
  @core.TypedRoute.Post("/get-user")
  async getUser(
    @core.TypedBody() input: IX.IUserRequest,
  ): Promise<IX.IUserResponse> {
    return retry(() => this.XProvider.getUser(input))();
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
  ): Promise<IX.IUserTweetTimeLineResponse[]> {
    return retry(() => this.XProvider.getUserTimelineTweets(input))();
  }
}
