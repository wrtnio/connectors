import axios from "axios";

import { IKakaoNavi } from "@wrtn/connector-api/lib/structures/connector/kakao_navi/IKakaoNavi";

import { ConnectorGlobal } from "../../../ConnectorGlobal";

export namespace KakaoNaviProvider {
  export async function getFutureDirections(
    input: IKakaoNavi.IGetFutureDirectionsInput,
  ) {
    try {
      const queryParams = Object.entries(input)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");

      const url = `https://apis-navi.kakaomobility.com/v1/future/directions?${queryParams}`;

      const res = await axios.get(url, {
        headers: {
          Authorization: `KakaoAK ${ConnectorGlobal.env.KAKAO_TALK_CLIENT_ID}`,
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (err) {
      console.log("err", err);
      throw err;
    }
  }
}
