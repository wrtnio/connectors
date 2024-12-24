import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { ConnectorGlobal } from "../../../../ConnectorGlobal";
import { GoogleProvider } from "../../../../providers/internal/google/GoogleProvider";

@Controller("internal/google")
export class GoogleController {
  /**
   * Request to reissue Google access token
   *
   * @internal
   */
  @core.TypedRoute.Get()
  async refreshAccessToken() {
    const secret = ConnectorGlobal.env.GOOGLE_TEST_SECRET;
    return await GoogleProvider.refreshAccessToken(secret);
  }
}
