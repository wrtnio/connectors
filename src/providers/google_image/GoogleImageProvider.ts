import { Injectable, Logger } from "@nestjs/common";
import { IGoogleImage } from "@wrtn/connector-api/lib/structures/connector/google_image/IGoogleImage";
import { ConnectorGlobal } from "../../ConnectorGlobal";
import { getJson } from "serpapi";

@Injectable()
export class GoogleImageProvider {
  private readonly logger = new Logger("GoogleImageProvider");

  async search(
    input: IGoogleImage.IRequest,
  ): Promise<IGoogleImage.IResponse[]> {
    try {
      const params = {
        engine: "google_images",
        q: input.query,
        api_key: ConnectorGlobal.env.SERP_API_KEY,
        hl: input.lang,
        gl: input.lang === "ko" ? "kr" : input.lang === "en" ? "us" : "jp",
        imgar: input.ratio,
        safe: "active",
      };

      const output: IGoogleImage.IResponse[] = [];
      const res = await getJson(params);
      const results = res["images_results"];

      if (results.length === 0) {
        return [];
      }

      for (const result of results) {
        output.push({
          title: result.title,
          imageUrl: result.link,
          thumbnail: result.thumbnail,
        });
      }
      return output;
    } catch (err) {
      this.logger.error(`Failed to get Google Image search result: ${err}`);
      throw err;
    }
  }
}
