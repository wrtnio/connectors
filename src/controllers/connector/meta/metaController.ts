import core from "@nestia/core";
import { Controller, Query } from "@nestjs/common";

import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { MataProvider } from "../../../providers/connector/meta/MetaProvider";

@Controller("connector/meta")
export class MetaController {
  @core.TypedRoute.Get("auth")
  async authorization(@Query() query: { code: string; state: string }) {
    const authorizationCode = query.code;

    const access_token = await MataProvider.getAccessToken({
      client_id: ConnectorGlobal.env.META_CLIENT_ID,
      client_secret: ConnectorGlobal.env.META_CLIENT_SECRET,
      code: authorizationCode,
      redirect_uri: "http://localhost:3003/connector/meta/auth",
    });

    return access_token;
  }
}
