import core from "@nestia/core";
import { Controller, Query } from "@nestjs/common";

import { IMeta } from "@wrtn/connector-api/lib/structures/connector/meta/IMeta";

import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { MataProvider } from "../../../providers/connector/meta/MetaProvider";

@Controller("connector/meta")
export class MetaController {
  /**
   * Meta login 인증창을 통해 유저가 로그인하면 콜백으로 호출되는 API.
   *
   * @internal
   *
   * @param query OAuth2 authorization code.
   * @returns access token DTO.
   */
  @core.TypedRoute.Get("auth")
  async authorization(
    @Query() query: { code: string; state: string },
  ): Promise<IMeta.AccessTokenDto> {
    const authorizationCode = query.code;

    const res = await MataProvider.getAccessToken({
      client_id: ConnectorGlobal.env.META_CLIENT_ID,
      client_secret: ConnectorGlobal.env.META_CLIENT_SECRET,
      code: authorizationCode,
      redirect_uri: "http://localhost:3003/connector/meta/auth",
    });

    return res;
  }
}
