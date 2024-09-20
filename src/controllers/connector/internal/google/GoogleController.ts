import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { ConnectorGlobal } from "../../../../ConnectorGlobal";
import { GoogleProvider } from "../../../../providers/internal/google/GoogleProvider";

@Controller("internal/google")
export class GoogleController {
  constructor(private readonly googleProvider: GoogleProvider) {}

  /**
   * Request to reissue Google access token
   *
   * @internal
   */
  @core.TypedRoute.Get()
  async refreshAccessToken() {
    return await this.googleProvider.refreshAccessToken(
      ConnectorGlobal.env.GOOGLE_TEST_SECRET,
    );
  }
}
