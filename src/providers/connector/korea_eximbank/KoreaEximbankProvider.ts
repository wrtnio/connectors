import axios from "axios";

import { ConnectorGlobal } from "../../../ConnectorGlobal";

export namespace KoreaEximbankProvider {
  export async function getExchange() {
    const baseUrl = `https://www.koreaexim.go.kr/site/program/financial/exchangeJSON`;
    const authKey = ConnectorGlobal.env.KOREA_EXIM_BANK_API_KEY;

    const url = `${baseUrl}?authkey=${authKey}&data=AP01`;

    const res = await axios.get(url, {
      headers: {
        "User-Agent": "PostmanRuntime/7.39.0",
      },
    });
    return res.data;
  }
}
