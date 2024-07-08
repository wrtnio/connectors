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
          "User-Agent": `PostmanRuntime/7.28.4`,
        },
      });

      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      throw err;
    }
  }
}
