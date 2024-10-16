import { Injectable } from "@nestjs/common";
import axios from "axios";
import { ConnectorGlobal } from "../../../ConnectorGlobal";

@Injectable()
export class CrunchbaseProvider {
  async healthCheck() {
    try {
      const url = `https://crunchbase-api.p.rapidapi.com/v1/health-check`;
      const res = await axios.get(url, {
        headers: {
          "x-rapidapi-host": "crunchbase-api.p.rapidapi.com",
          "x-rapidapi-key": ConnectorGlobal.env.RAPIDAPI_KEY,
        },
      });

      return res.data.status === "OK" ? true : false;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }
}
