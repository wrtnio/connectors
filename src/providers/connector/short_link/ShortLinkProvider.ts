import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { Injectable } from "@nestjs/common";
import axios from "axios";
import { IShortLink } from "@wrtn/connector-api/lib/structures/connector/short_link/IShortLink";

@Injectable()
export class ShortLinkProvider {
  private readonly GH_DEVS_BE_SERVER_URL =
    ConnectorGlobal.env.GH_DEVS_BE_SERVER_URL;
  private readonly SHORT_LINK_RETURN_URL =
    ConnectorGlobal.env.SHORT_LINK_RETURN_URL;

  async createShortLink(
    input: IShortLink.IRequest,
  ): Promise<IShortLink.IResponse> {
    try {
      const res = await axios.post(
        `${this.GH_DEVS_BE_SERVER_URL}/url/shorten`,
        {
          originalUrl: input.url,
        },
      );
      return { shortUrl: `${this.SHORT_LINK_RETURN_URL}/url/${res.data.code}` };
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }
}
