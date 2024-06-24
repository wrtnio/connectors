import axios from "axios";

import { ConnectorGlobal } from "../../../ConnectorGlobal";

export namespace KoreaEximbankProvider {
  export async function getExchange() {
    try {
      const baseUrl = `https://www.koreaexim.go.kr/site/program/financial/exchangeJSON`;
      const authKey = ConnectorGlobal.env.KOREA_EXIM_BANK_API_KEY;

      const url = `${baseUrl}?authkey=${authKey}&data=AP01`;

      const res = await fetch(url, {
        headers: {
          "User-Agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36`,
          Referer: "https://wrtn.ai",
          Origin: "https://wrtn.ai",
        },
      });

      const data = await res.json();

      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
