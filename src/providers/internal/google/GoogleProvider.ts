import { InternalServerErrorException } from "@nestjs/common";
import { google } from "googleapis";

import { ConnectorGlobal } from "../../../ConnectorGlobal";

export namespace GoogleProvider {
  export const googleClientId = ConnectorGlobal.env.GOOGLE_CLIENT_ID;
  export const googleClientSecret = ConnectorGlobal.env.GOOGLE_CLIENT_SECRET;

  export async function refreshAccessToken(secretKey: string): Promise<string> {
    const client = new google.auth.OAuth2(
      GoogleProvider.googleClientId,
      GoogleProvider.googleClientSecret,
    );

    client.setCredentials({ refresh_token: decodeURIComponent(secretKey) });
    const { credentials } = await client.refreshAccessToken();
    const accessToken = credentials.access_token;

    if (!accessToken) {
      throw new InternalServerErrorException("Failed to refresh access token");
    }

    return accessToken;
  }
}
