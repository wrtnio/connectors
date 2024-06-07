import axios from "axios";

export namespace MataProvider {
  export async function getAccessToken(options: {
    client_id: string;
    client_secret: string;
    redirect_uri: string;
    code: string;
  }) {
    const queryParams = Object.entries(options)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    const res = await axios.get(
      `https://graph.facebook.com/oauth/access_token?${queryParams}`,
    );

    return res.data;
  }
}
