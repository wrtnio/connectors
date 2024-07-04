import axios from "axios";

import { ICommon } from "@wrtn/connector-api/lib/structures/connector/common/ISecretValue";
import { IKakaoTalk } from "@wrtn/connector-api/lib/structures/connector/kakao_talk/IKakaoTalk";

import { ConnectorGlobal } from "../../../ConnectorGlobal";

export namespace KakaoTalkProvider {
  export async function getFriends(input: IKakaoTalk.IGetFriendsInput): Promise<IKakaoTalk.IGetFriendsOutput> {
    try {
      const { secretKey, ...getEventQueryParam } = input;
      const queryParams = Object.entries(getEventQueryParam)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");

      const accessToken = await KakaoTalkProvider.refresh({
        refresh_token: secretKey,
      });

      const url = `https://kapi.kakao.com/v1/api/talk/friends?${queryParams}`;
      const res = await axios.get(url, {
        headers: {
          Authorization: `bearer ${accessToken.access_token}`,
        },
      });
      return res.data;
    } catch (err) {
      console.log("err", err);
      throw err;
    }
  }

  export async function createEvent(input: IKakaoTalk.ICreateEventInput): Promise<IKakaoTalk.ICreateEventOutput> {
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
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function getEvents(input: IKakaoTalk.IGetEventInput): Promise<IKakaoTalk.IGetEventOutput> {
    try {
      const { secretKey, ...getEventQueryParam } = input;
      const queryParams = Object.entries(getEventQueryParam)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");

      const accessToken = await KakaoTalkProvider.refresh({
        refresh_token: secretKey,
      });

      const res = await axios.get(`https://kapi.kakao.com/v2/api/calendar/events?${queryParams}`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `bearer ${accessToken.access_token}`,
        },
      });

      return res.data;
    } catch (err) {
      console.log("err", err);
      throw err;
    }
  }

  export async function getCalendars(
    input: ICommon.ISecret<"kakao", ["talk_calendar"]>,
  ): Promise<IKakaoTalk.IGetCalendarOutput> {
    try {
      const accessToken = await KakaoTalkProvider.refresh({
        refresh_token: input.secretKey,
      });

      const res = await axios.get("https://kapi.kakao.com/v2/api/calendar/calendars", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `bearer ${accessToken.access_token}`,
        },
      });

      return res.data;
    } catch (err) {
      console.log("err", err);
      throw err;
    }
  }

  export async function refresh(
    input: IKakaoTalk.IRefreshAccessTokenInput,
  ): Promise<IKakaoTalk.IRefreshAccessTokenOutput> {
    try {
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
    } catch (err) {
      console.log("err", err);
      throw err;
    }
  }

  export async function send(
    input: IKakaoTalk.ISendKakaoTalkToFriendsInput,
  ): Promise<IKakaoTalk.ISendKakaoTalkToFriendsOutput> {
    try {
      const accessToken = await KakaoTalkProvider.refresh({
        refresh_token: input.secretKey,
      });

      const template: IKakaoTalk.ITextMemoInput = {
        object_type: "text",
        text: input.message,
        link: {
          mobile_web_url: "https://studio-pro.wrtn.ai",
          web_url: "https://studio-pro.wrtn.ai",
        },
      };

      const res = await axios.post(
        "https://kapi.kakao.com/v1/api/talk/friends/message/default/send",
        {
          receiver_uuids: JSON.stringify(input.receiver_uuids),
          template_object: JSON.stringify(template),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `bearer ${accessToken.access_token}`,
          },
        },
      );

      return res.data;
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function memo(
    input:
      | IKakaoTalk.ISendKakaoTalkCommerceInput
      | IKakaoTalk.ISendKakaoTalkLocationInput
      | IKakaoTalk.ISendKakaoTalkListInput
      | IKakaoTalk.ISendKakaoTalkFeedInput
      | IKakaoTalk.ISendKakaoTalkTextInput,
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
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }
}
