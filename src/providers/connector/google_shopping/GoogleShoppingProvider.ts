import { Injectable } from "@nestjs/common";
import { getJson } from "serpapi";

import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { IGoogleShopping } from "@wrtn/connector-api/lib/structures/connector/google_shopping/IGoogleShopping";

const defaultParams = {
  engine: "google_shopping",
  api_key: ConnectorGlobal.env.SERP_API_KEY,
  google_domain: "google.com",
  location_requested: "South Korea",
  location_used: "South Korea",
  device: "desktop",
  hl: "ko",
  gl: "kr",
}

@Injectable()
export class GoogleShoppingProvider {
  async musinsa(
    input: IGoogleShopping.IRequestStandAlone,
  ): Promise<IGoogleShopping.IResponse[]> {
    try {
      const res = await getJson({
        ...defaultParams,
        tbs: "mr:1,merchagg:g316277865|m138871704",
        q: input.keyword,
      });
      const output = res["shopping_results"];

      /**
       * output의 구조가 검색어 별로 다 다르기 때문에 any로 선언
       */
      const results: IGoogleShopping.IResponse[] = output.map((o: any) => {
        return {
          title: o.title,
          link: o.link,
          price: o.price,
          source: o.source,
          deliveryCost: o.delivery,
          thumbnail: o.thumbnail,
        };
      });

      return results;
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }
}
