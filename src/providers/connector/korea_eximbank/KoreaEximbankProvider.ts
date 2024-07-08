import axios from "axios";
import { ConnectorGlobal } from "../../../ConnectorGlobal";

export namespace KoreaEximbankProvider {
  export async function getExchange() {
    try {
      const baseUrl = `http://www.koreaexim.go.kr/site/program/financial/exchangeJSON`;
      const authKey = ConnectorGlobal.env.KOREA_EXIM_BANK_API_KEY;

      const url = `${baseUrl}?authkey=${authKey}&data=AP01`;

      const res = await axios.get(url, {
        headers: {
          Accept: `text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7`,
          "Accept-Encoding": `gzip, deflate, br, zstd`,
          "Accept-Language": `ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7`,
          "Cache-Control": `max-age=0`,
          Connection: `keep-alive`,
          Host: `www.koreaexim.go.kr`,
          "Sec-Ch-Ua": `"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"`,
          "Sec-Ch-Ua-Mobile": `?0`,
          "Sec-Ch-Ua-Platform": "macOS",
          "Sec-Fetch-Dest": `document`,
          "Sec-Fetch-Mode": `navigate`,
          "Sec-Fetch-Site": `none`,
          "Sec-Fetch-User": `?1`,
          "Upgrade-Insecure-Requests": `1`,
          "User-Agent": `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36`,
        },
      });

      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      throw err;
    }
  }
}
