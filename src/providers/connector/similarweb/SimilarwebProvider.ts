import { Injectable } from "@nestjs/common";
import { ISimilarweb } from "@wrtn/connector-api/lib/structures/connector/similarweb/ISimilarweb";
import axios from "axios";
import { ConnectorGlobal } from "../../../ConnectorGlobal";

@Injectable()
export class SimilarwebProvider {
  async getdDomainInfo(
    input: ISimilarweb.IGetDomainInfoInput,
  ): Promise<ISimilarweb.IGetDomainInfoOutput> {
    const url = `https://similarweb13.p.rapidapi.com/v2/getdomain?domain=${input.domain}`;
    const res = await axios.get(url, {
      headers: {
        "x-rapidapi-host": "crunchbase-api.p.rapidapi.com",
        "x-rapidapi-key": ConnectorGlobal.env.RAPIDAPI_KEY,
      },
    });

    return res.data;
  }
}
