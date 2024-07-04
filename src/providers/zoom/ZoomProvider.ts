import axios from "axios";

import { IZoom } from "@wrtn/connector-api/lib/structures/zoom/IZoom";

export namespace ZoomProvider {
  export async function createMeeting(input: IZoom.ICreateMeetingInput): Promise<IZoom.ICreateMeetingOutput> {
    const baseUrl = "https://api.zoom.us/v2" as const;
    const encodedUserId = input.userId;
    const apiUrl = `${baseUrl}/users/${encodedUserId}/meetings` as const;

    try {
      const res = await axios.post(
        apiUrl,
        {},
        {
          headers: {
            Authorization: `Bearer ${input.secretKey}`,
          },
        },
      );
      return res.data;
    } catch (err) {
      console.log("err", err);
      throw err;
    }
  }
}
