import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { GoogleProvider } from "../../../../providers/internal/google/GoogleProvider";

@Controller("internal/google")
export class GoogleController {
  constructor(private readonly googleProvider: GoogleProvider) {}

  /**
   * 구글 access token 재발급 요청
   *
   * @internal
   *
   */
  @core.TypedRoute.Get()
  async refreshAccessToken() {
    return await this.googleProvider.refreshAccessToken(
      "1%2F%2F0ettrBo9BQWP1CgYIARAAGA4SNwF-L9IrcSzkQWMaUw3_VNb5eqcaRAKPwPnEsBqkpdtfOzsjww0ItMxdPn_vC4nKs71XkCiv2OI",
    );
  }
}
