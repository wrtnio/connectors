import axios from "axios";

import { IKakaoTalk } from "@wrtn/connector-api/lib/structures/connector/kakao_talk/IKakaoTalk";

import { ConnectorGlobal } from "../../../ConnectorGlobal";

export namespace KakaoTalkProvider {
  export async function refresh(
    input: IKakaoTalk.IRefreshAccessTokenInput,
  ): Promise<IKakaoTalk.IRefreshAccessTokenOutput> {
    const res = await axios.post("https://kauth.kakao.com/oauth/token", {
      grant_type: "refresh_token",
      client_id: ConnectorGlobal.env.KAKAO_TALK_CLIENT_ID,
      refresh_token: input.refresh_token,
    });

    return res.data;
  }
}
