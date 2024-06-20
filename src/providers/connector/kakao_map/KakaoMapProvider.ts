import axios from "axios";

import { IKakaoMap } from "@wrtn/connector-api/lib/structures/connector/kakao_map/IKakaoMap";

import { ConnectorGlobal } from "../../../ConnectorGlobal";

export namespace KakaoMapProvider {
  export async function searchByKeyword(input: IKakaoMap.SearchByKeywordInput) {
    const queryString = Object.entries(input)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    const url = `https://dapi.kakao.com/v2/local/search/keyword.JSON?${queryString}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `KakaoAK ${ConnectorGlobal.env.KAKAO_API_KEY}`,
      },
    });
    return res.data;
  }
}
