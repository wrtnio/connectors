import axios from "axios";

import { IZoom } from "@wrtn/connector-api/lib/structures/zoom/IZoom";
import { OAuthSecretProvider } from "../../internal/oauth_secret/OAuthSecretProvider";
import { IOAuthSecret } from "../../internal/oauth_secret/structures/IOAuthSecret";

export namespace ZoomProvider {
  export async function createMeeting(
    input: IZoom.ICreateMeetingInput,
  ): Promise<IZoom.ICreateMeetingOutput> {
    const baseUrl = "https://api.zoom.us/v2" as const;
    const encodedUserId = input.userId;
    const apiUrl = `${baseUrl}/users/${encodedUserId}/meetings` as const;
    const token = await getToken(input.secretKey);
    try {
      const res = await axios.post(
        apiUrl,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return res.data;
    } catch (err) {
      console.log("err", err);
      throw err;
    }
  }

  async function getToken(secretValue: string): Promise<string> {
    const secret = await OAuthSecretProvider.getSecretValue(secretValue);
    const token =
      typeof secret === "string"
        ? secret
        : (secret as IOAuthSecret.ISecretValue).value;
    return token;
  }
}
