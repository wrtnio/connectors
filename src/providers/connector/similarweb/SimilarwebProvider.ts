import { Injectable } from "@nestjs/common";
import { ISimilarweb } from "@wrtn/connector-api/lib/structures/connector/similarweb/ISimilarweb";
import axios from "axios";
import { ConnectorGlobal } from "../../../ConnectorGlobal";

@Injectable()
export class SimilarwebProvider {
  async getDomainInfo(
    input: ISimilarweb.IGetDomainInfoInput,
  ): Promise<ISimilarweb.IGetDomainInfoOutput> {
    const url = `https://similarweb13.p.rapidapi.com/v2/getdomain?exclude-countries=true&domain=${input.domain}`;
    const res = await axios.get(url, {
      headers: {
        "x-rapidapi-host": "similarweb13.p.rapidapi.com",
        "x-rapidapi-key": ConnectorGlobal.env.RAPIDAPI_KEY,
      },
    });

    return res.data;
  }
}
