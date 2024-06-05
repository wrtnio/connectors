import axios from "axios";

import { IZoom } from "@wrtn/connector-api/lib/structures/zoom/IZoom";

export namespace ZoomProvider {
  export const baseUrl = "https://api.zoom.us/v2" as const;

  export async function addMeetingRegistrant(
    meetingId: number,
    input: IZoom.IAddMeetingRegistrantInput,
  ): Promise<IZoom.IAddMeetingRegistrantOutput> {
    const apiUrl = `${ZoomProvider.baseUrl}/meetings/${meetingId}/registrants?occurrence_ids=${input.occurrenceIds}`;
    try {
      const res = await axios.post(
        apiUrl,
        {
          first_name: input.first_name,
          email: input.email,
        },
        {
          headers: {
            Authorization: `Bearer ${input.secretKey}`,
          },
        },
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  export async function createMeeting(
    input: IZoom.ICreateMeetingInput,
  ): Promise<IZoom.ICreateMeetingOutput> {
    const apiUrl = `${ZoomProvider.baseUrl}/users/${input.userId}/meetings`;
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
  }
}
