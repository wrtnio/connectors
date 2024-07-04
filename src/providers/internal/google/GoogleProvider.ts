import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { google } from "googleapis";

import { ConnectorGlobal } from "../../../ConnectorGlobal";

@Injectable()
export class GoogleProvider {
  private readonly googleClientId = ConnectorGlobal.env.GOOGLE_CLIENT_ID;
  private readonly googleClientSecret = ConnectorGlobal.env.GOOGLE_CLIENT_SECRET;

  constructor() {}

  async refreshAccessToken(secretKey: string): Promise<string> {
    const client = new google.auth.OAuth2(this.googleClientId, this.googleClientSecret);

    client.setCredentials({
      refresh_token: decodeURIComponent(secretKey),
    });

    const { credentials } = await client.refreshAccessToken();
    const accessToken = credentials.access_token;

    if (!accessToken) {
      throw new InternalServerErrorException("Failed to refresh access token");
    }

    return accessToken;
  }

  error(err: GoogleProvider.GoogleError) {
    console.error(JSON.stringify(err));
  }
}

export namespace GoogleProvider {
  export interface GoogleError {
    error: {
      code: 400;
      message: string;
      status: string;
      details: [
        {
          "@type": "type.googleapis.com/google.rpc.BadRequest";
          fieldViolations: {
            description: string;
          }[];
        },
      ];
    };
  }
}
