import axios from "axios";

import { IMeta } from "@wrtn/connector-api/lib/structures/connector/meta/IMeta";

export namespace MataProvider {
  export async function getAccessToken(options: {
    client_id: string;
    client_secret: string;
    redirect_uri: string;
    code: string;
  }): Promise<IMeta.AccessTokenDto> {
    const queryParams = Object.entries(options)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    const res = await axios.get(
      `https://graph.facebook.com/oauth/access_token?${queryParams}`,
    );

    return res.data;
  }
}
