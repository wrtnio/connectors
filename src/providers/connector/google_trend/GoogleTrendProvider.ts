import { Injectable } from "@nestjs/common";
import { getJson } from "serpapi";

import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { IGoogleTrend } from "@wrtn/connector-api/lib/structures/connector/google_trend/IGoogleTrend";

@Injectable()
export class GoogleTrendProvider {
  async dailyTrend(
    input: IGoogleTrend.IRequest,
  ): Promise<IGoogleTrend.IResponse[]> {
    try {
      const date = this.parsingDate(input.date ?? this.formatCurrentDate());
      const res = await getJson({
        engine: "google_trends_trending_now",
        api_key: ConnectorGlobal.env.SERP_API_KEY,
        hl: "en",
        geo: "KR",
        frequency: "daily",
        date: date,
      });

      const results = res["daily_searches"][0].searches;
      const output: IGoogleTrend.IResponse[] = [];
      for (const result of results) {
        const data: IGoogleTrend.IResponse = {
          date: date,
          query: result.query,
          related_queries:
            result?.related_queries?.map((i: any) => i.query) ?? [],
          traffic: `${Math.floor(result.traffic / 1000)}K+ 검색됨`,
        };
        output.push(data);
      }
      return output;
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  private formatCurrentDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  private parsingDate(date: string): string {
    const match = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (match) {
      const [_, year, month, day] = match;
      return `${year}${month}${day}`;
    }
    throw new Error("Invalid date format");
  }
}
