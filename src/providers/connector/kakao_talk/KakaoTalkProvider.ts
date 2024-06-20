import axios from "axios";

import { ICommon } from "@wrtn/connector-api/lib/structures/connector/common/ISecretValue";
import { IKakaoTalk } from "@wrtn/connector-api/lib/structures/connector/kakao_talk/IKakaoTalk";

import { ConnectorGlobal } from "../../../ConnectorGlobal";

export namespace KakaoTalkProvider {
  export async function createEvent(
    input: IKakaoTalk.ICreateEventInput,
  ): Promise<IKakaoTalk.ICreateEventOutput> {
    try {
      const { secretKey, ...createEventDto } = input;

      const accessToken = await KakaoTalkProvider.refresh({
        refresh_token: secretKey,
      });

      const res = await axios.post(
        "https://kapi.kakao.com/v2/api/calendar/create/event",
        {
          caelndar_id: createEventDto.calendar_id,
          event: JSON.stringify(createEventDto.event),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `bearer ${accessToken.access_token}`,
          },
        },
      );

      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  export async function getEvents(
    input: IKakaoTalk.IGetEventInput,
  ): Promise<IKakaoTalk.IGetEventOutput> {
    try {
      const { secretKey, ...getEventQueryParam } = input;
      const queryParams = Object.entries(getEventQueryParam)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");

      const accessToken = await KakaoTalkProvider.refresh({
        refresh_token: secretKey,
      });

      const res = await axios.get(
        `https://kapi.kakao.com/v2/api/calendar/events?${queryParams}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `bearer ${accessToken.access_token}`,
          },
        },
      );

      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  export async function getCalendars(
    input: ICommon.ISecret<"kakao", ["talk_calendar"]>,
  ): Promise<IKakaoTalk.IGetCalendarOutput> {
    const accessToken = await KakaoTalkProvider.refresh({
      refresh_token: input.secretKey,
    });

    const res = await axios.get(
      "https://kapi.kakao.com/v2/api/calendar/calendars",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `bearer ${accessToken.access_token}`,
        },
      },
    );

    return res.data;
  }

  export async function refresh(
    input: IKakaoTalk.IRefreshAccessTokenInput,
  ): Promise<IKakaoTalk.IRefreshAccessTokenOutput> {
    const res = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      {
        grant_type: "refresh_token",
        client_id: ConnectorGlobal.env.KAKAO_TALK_CLIENT_ID,
        refresh_token: input.refresh_token,
        client_secret: ConnectorGlobal.env.KAKAO_TALK_CLIENT_SECRET,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    return res.data;
  }

  export async function memo(
    input: IKakaoTalk.ISendKakaoTalkInput,
  ): Promise<IKakaoTalk.IMemoOutput> {
    try {
      const accessToken = await KakaoTalkProvider.refresh({
        refresh_token: input.secretKey,
      });

      const res = await axios.post(
        "https://kapi.kakao.com/v2/api/talk/memo/default/send",
        {
          template_object: JSON.stringify(input.template_object),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `bearer ${accessToken.access_token}`,
          },
        },
      );

      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
